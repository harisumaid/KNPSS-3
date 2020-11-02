import mongoose from 'mongoose';


const messageSchema = mongoose.Schema({
    name : {type : String, requried : true},
    email : {type : String, requried : true},
    phone : {type : Number, required : true},
    message : {type : String, required : true}
}, {versionKey : false});

let Message;
try {
    Message = mongoose.model('Message');
} catch {
    Message = mongoose.model('Message', messageSchema)
}


export default Message;