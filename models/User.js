import mongoose from 'mongoose';


const userSchema = mongoose.Schema({
    username : {type : String, required : true},
    email : {type : String, required : true},
    phone : {type : Number, required : true},
    password : {type : String, required : true},
    created_on : {type : Date, default : Date.now},
    active : {type : Boolean, default : false}
})

let User;
try {
    User = mongoose.model('User');
} catch {
    User = mongoose.model('User', userSchema)
}


export default User;