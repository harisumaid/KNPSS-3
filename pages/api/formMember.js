import Member from "../../models/member";
import mongooseCollection from "../../middleware/database";

export default async (req, res) => {
  const body = JSON.parse(req.body);
  const member = new Member({
    name: body.name,
    dob: body.dob,
    occupation: body.occupation,
    qualification: body.qualification,
    address: body.address,
    phone: body.phone,
    email: body.email,
    sonOf: body.sonOf,
  });
  await member.save(function (err) {
    if(err){
        console.log(err.message);
        return;
  }});
  res.json({ success: true });
// console.log(req.body);
// res.json(req.body);
};
