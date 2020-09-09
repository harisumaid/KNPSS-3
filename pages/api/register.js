import mongoose from 'mongoose';
import nextConnect from 'next-connect'
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import db from '../../middleware/database';
import User from '../../models/User';
import Hash from '../../models/Hash';


const handler = nextConnect();
handler.use(bodyParser.urlencoded({extended : false}));
handler.post(async (req, res) => {
    // Get the reg fileds from the body of the request
    const {username, phone, email, password} = req.body;

    // Check if any field is missing or not
    if(!username || !phone || !email || !password) {
        res.json({error : true, message : "Some of the fields are missing."});
    } else {
        // All the fields were provided
        // Find if a person with that email is present in the database or not
        try {
            const user = await User.findOne({username, email});
            // Check if there is a valid user or not
            if(user) {
                // User is already present in the database
                
                res.json({error : true, message : `User already present`});
            } else {
                // New user register the user now.
                const newUser = new User({
                    username,
                    password : await bcrypt.hash(password, 10),
                    phone,
                    email
                })

                const savedUser = await newUser.save();
                if(savedUser) {
                    // Create a hash for verification of the email address
                    const newHash = new Hash({
                        userId : savedUser._id,
                        hashString : crypto.randomBytes(20).toString('hex')
                    })

                    const savedHash = await newHash.save();
                    if(savedHash) {
                        // See if the hash was generated successfully or not
                        res.json({error : false, message : "User registered."})
                    } else {
                        res.json({error : true, message : "Error generating hash"})
                    }
                } else {
                    // User was not saved
                    res.json({error : true, message : "Error saving user to the database."})
                }
            }

        } catch(err) {
            res.json({error : true, message : err});
        }
    }

    
})


export default handler;