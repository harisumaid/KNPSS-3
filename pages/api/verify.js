import nextConnect from 'next-connect';
import mongoose from 'mongoose';
import Hash from '../../models/Hash';
import User from '../../models/User';
import next from 'next';
import url from 'url';
const handler = nextConnect();



handler.get(async (req, res) => {
    const {id, token} = req.query;
    // Token and id has been extracted check it again the hash collection in the database.
    // If they both match then the user is verified
    // Remove the has document update the active field in the user document to true (initially false for unverified)
    if(!id || !token) {
        // Parameters were extracted
        res.json({error : true, message : "Parameters missing. Request admin to send verification email again."})
    } else {
        // All parameters set
        try {
            // Check the id and token against Hash Collection
            const savedHash = await Hash.findOneAndDelete({userId : id, hashString : token});
            if(savedHash) {
                // Hash deleted successfully
                // Change the active field of the saved user to true
                const savedUser = await User.findOne({_id : savedHash.userId});
                if(savedUser) {
                    savedUser.active = true;
                    await savedUser.save();
                    res.json({error : false, message : 'User verified'})
                } else {
                    // Error finding user with that id
                    res.json({error : true, message : 'Error finding user to verify'})
                }
            } else {
                // No user with that id
                res.json({error : true, message : 'Error finding user to verify'})
            }
        } catch(err) {
            // Error verifying
            res.json({error : true, message : "Error verifying the email"})
        }
    }
})


export default handler;