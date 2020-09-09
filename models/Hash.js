import mongoose from 'mongoose';

const hashSchema = mongoose.Schema({
    userId : {type :String, required : true},
    hashString : {type : String, required : true}
})

let Hash;

try {
    Hash = mongoose.model('Hash');
} catch {
    Hash = mongoose.model('Hash', hashSchema);
}



export default Hash;