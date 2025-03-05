const express = require('express')
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')
const comment = require('./routes/comment.js')
const article = require('./routes/article.js')
const finderror = require('./helpers/finderror.js')
const cookieParser = require("cookie-parser");
const db = require('./prisma/queries.js')
const cors = require('cors')
const jwt = require("jsonwebtoken");
require('dotenv').config({ path: './prisma/.env' });

const app = express()
const PORT = process.env.PORT
const SECRET_KEY = process.env.SECRET_KEY

app.use(cors({
        origin: "http://localhost:5173", // React frontend URL
        credentials: true,
      })
);
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}));

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
        const user = await db.getUser(username)

        if (!user) {
            return done(null, false, { usernameErr: "Invalid username", passwordErr: "" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
        // passwords do not match!
            return done(null, false, { passwordErr: "Invalid password", usernameErr: "" })
        }
            return done(null, user);
        } catch(err) {
            return done(err);
        }
    })
);

//signup
const validateSignup = [
    body("fullname").trim()
        .not().isEmpty()
        .withMessage("Please input your fullname"),
    body("username").trim()
        .not().isEmpty()
        .withMessage("Please input a valid username"),
    body("password")
        .not().isEmpty()
        .withMessage("Please pass in a strong password")
]

app.post("/signup", 
    validateSignup,
    async (req, res, next) => {
        try {
            const errors = validationResult(req).array()
            if (errors.length !== 0) {
                const fullnameErr = await finderror(errors, "fullname")
                const usernameErr = await finderror(errors, "username")
                const passwordErr = await finderror(errors, "password")
                return res.json({
                    fullnameErr: fullnameErr.msg,
                    usernameErr: usernameErr.msg,
                    passwordErr: passwordErr.msg
                })
            } 
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const fullname = req.body.fullname
            const username = req.body.username
            await db.createUser(fullname, username, hashedPassword)
            res.json({
                message: "You have been signedup successfully"
            })
        } catch (error) {
            console.error(error);
            next(error);
        }
});

app.post("/login", (req, res, next) => {

    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({
            usernameErr: info.usernameErr,
            passwordErr: info.passwordErr
        });
    
        // Generate a JWT (expires in 1 hour)
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
          expiresIn: "24h",
        });
    
        res.json({ token, user, message: "Logged in successfully" }); // Send token to frontend
      })(req, res, next);
});

app.post("/logout", (req, res) => {
    res.clearCookie("token"); // Clear the cookie
    res.json({ message: "Logged out successfully" });
});

app.get("/api/user", (req, res) => {
    const user = req.user ? req.user : null;
    res.json(user);
  });

app.use('/', article)
app.use('/', comment)

app.listen(PORT, () => console.log(`app running on port: ${PORT}`))