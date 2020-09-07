const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
const option = {useNewUrlParser: true};


export default mongoose.connect(uri,option);
