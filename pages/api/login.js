import mongoose from 'mongoose';
import nextConnect from 'next-connect'
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import db from '../../middleware/database';
import User from '../../models/User';
import Hash from '../../models/Hash';
import jwt from 'jsonwebtoken';

const handler = nextConnect();

handler.use(bodyParser.urlencoded({ extended: false }));
handler.post(async (req, res) => {
    // Get the email and hashed password from the body
    const { email, password } = req.body;

    // Check if all the fields are provided properly
    if (!email || !password) {
        res.json({ error: true, message: "Some of the fields are missing." });
    } else {
        // All fields are present
        // Check for a valid user from the database from the email field
        try {
            const savedUser = await User.findOne({ email });
            // See if the user is saved or not
            if (savedUser) {
                // See if the user has verified the account or not
                if (!savedUser.active) res.json({ error: true, message: "Account not verified. Please verify and then login again." })
                else {
                    // Check if the passwords match or not
                    const isSame = await bcrypt.compare(password, savedUser.password);

                    if (isSame) {
                        // Passwords are same
                        // Generate jwt token
                        const token = jwt.sign({
                            username: savedUser.username,
                            email: savedUser.email
                        }, process.env.TOKEN_SECRET)
                        // Check if the token was generated successfully or not
                        if (!token) res.json({ error: true, message: "Error generating token." })
                        else {
                            // All parameters were provided and token generation successful
                            res.setHeader("Authorization", "Bearer " + token);
                            res.json({
                                error: false, token, message: "Success", user: {
                                    _id: savedUser._id,
                                    username: savedUser.username,
                                    email: savedUser.email
                                }
                            })
                            
                        }

                    } else {
                        res.json({ error: true, message: "Invalid password." });
                    }
                }

            } else {
                // No user with that email is found
                res.json({ error: true, message: 'No user with that email is found.' })
            }
        } catch (err) {
            res.json({ error: true, message: "Internal server error" + err });
        }
    }
})


export default handler;