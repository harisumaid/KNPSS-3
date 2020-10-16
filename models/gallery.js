const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    type: String,
    date: String,
    heading : String,
    image0Path : String,
});

var model;
try{
    model = mongoose.model('gallery');
} catch{
    model = mongoose.model('gallery',schema);
}



export default model;