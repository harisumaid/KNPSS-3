import Office from "../../models/office";
import mongooseConnection from "../../middleware/database";
import nextConnect from "next-connect";

const multer = require("multer");
const upload = multer();

const handler = nextConnect();

handler.use(upload.none());

handler.post(async (req, res) => {
  const office = new Office({
    name: req.body.name,
    designation: req.body.designation,
    imagePath: req.body.imagePath,
  });

  await office.save();

  console.log("Office member saved");
  res.json({success: 'success'});
});

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
