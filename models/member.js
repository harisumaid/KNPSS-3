const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: String, required: true },
  occupation: { type: String, required: true },
  qualification: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  sonOf: { type: String, required: true },
});

var model;
try {
  model = mongoose.model("member");
} catch {
  model = mongoose.model("member", schema);
}

export default model;
