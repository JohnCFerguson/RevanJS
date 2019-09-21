const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");

// Load input validation
const validateRegisterInput = require("../../src/authentication/register");
const validateLoginInput = require("../../src/authentication/login");

// Load User model
const User = require("../../src/models/user");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req,res) => {
    // Validate Form

    const { errors, isValid } = validateRegisterInput(req.body);

    // Validation check
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists"});
        }
        else {
            User.findOne({ obiwan_id: req.body.obiwan_id }).then(user => {
                if (user) {
                    return res.status(400).json({ obiwan_id: "Someone already has this Obiwan ID"});
                }
                else {
                    const newUser = new User({
                        obiwan_id: req.body.obiwan_id,
                        email: req.body.email,
                        name: req.body.name,
                        manager_id: req.body.manager_id,
                        password: req.body.password
                    });
                }
            });
        }
        // Hash password before storing in DB
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then( user => res.json(user))
                    .catch( err => console.log(err));
            });
        });
    });
});
// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    //Validate form

    const { errors, isValid } = validateLoginInput(res.body);

    // Check if valid login
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = res.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {
        //Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found"});
        }

        // Verify password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User passwords match
                // Create JWT payload
                const payload = {
                    id: user.obiwan_id,
                    name: user.name,
                    email: user.email
                };

                // Sign token
                jwt.sign(
                    payload,
                    config.secretOrKey,
                    {
                        expiresIn: 2592000 // 30 days in seconds
                    },
                    ( err, token ) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            }
            else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect, please try again"});
            }
        });
    });
});

module.exports = router;
