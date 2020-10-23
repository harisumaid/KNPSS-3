const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    date: {type:String, required:true},
    heading: {type:String, required:true},
    content: {type:String, required:true},
    imagesPath: [{type:String}],
    pdfsPath:[{type:String}],
});

var model;
try{
    model = mongoose.model('news');
} catch{
    model = mongoose.model('news',schema);
}



export default model;