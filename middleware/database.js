const mongoose = require('mongoose');

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

export default mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology : true});
