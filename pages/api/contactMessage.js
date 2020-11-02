import nextConnect from 'next-connect';
import Message from '../../models/Message';


const handler = nextConnect();



handler.post(async (req, res) => {
    const {name, email, phone, message} = req.body;

    // All fields are there as they are validated
    try {

        const newMessage = new Message({
            name, email, phone, message
        });


        const saved = await newMessage.save();
        if(saved) {
            res.json({error : false, message : "Message saved successfully"});
        } else {
            res.json({error : true, message : "Error saving the message"})
        }
    } catch(err) {
        res.json({error : true, message : "Internal server error."})
    }
})



export default handler;