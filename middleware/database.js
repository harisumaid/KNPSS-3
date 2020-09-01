const mongoose = require('mongoose');

const uri = 'mongodb://localhost/knpss';
const option = {useNewUrlParser: true};


export default mongoose.connect(uri,option);
