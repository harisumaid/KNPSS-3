const mongoose = require('mongoose')

var officeSchema = new mongoose.Schema({
    name: String,
    designation : String,
    imagePath: String,
});

var OfficeModel;
try{
    OfficeModel = mongoose.model('office');
} catch{
    OfficeModel = mongoose.model('office',officeSchema);
}



export default OfficeModel;