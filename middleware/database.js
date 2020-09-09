const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

export default mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology : true});
