const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    date: String,
    title : String,
    details: String,
    filePath: String,
});

var model;
try{
    model = mongoose.model('news');
} catch{
    model = mongoose.model('news',schema);
}



export default model;