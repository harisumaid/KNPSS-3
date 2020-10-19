import nextConnect from "next-connect";
import News from "../../models/news";
import Gallery from "../../models/gallery";
import mongooseConnection from "../../middleware/database";

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  region: "ap-south-1",
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const handler = nextConnect();

handler.use(upload.fields([{ name: "images" }, { name: "pdfs" }]));

handler.post(async (req, res) => {
  console.log("Upload sequence initiating....");

  let imgPath = [];
  console.log(req.files.images);
  console.log(req.files.pdfs);
  const promise1 = req.files.images.map(async (file) => {
    console.log("Uploading images....");
    const param = {
      Bucket: process.env.AWS_BUCKET,
      Key: "files/news/images/" + file.originalname,
      Body: file.buffer,
    };
    const aws_file = await s3.upload(param).promise();
    return aws_file.Location;
  });
  imgPath = await Promise.all(promise1);
  console.log(imgPath);
  let pdfPath = [];
  const promise2 = req.files.pdfs.map(async (file) => {
    console.log("Uploading pdfs....");
    const param = {
      Bucket: process.env.AWS_BUCKET,
      Key: "files/news/pdfs/" + file.originalname,
      Body: file.buffer,
    };
    const aws_file = await s3.upload(param).promise();

    return aws_file.Location;
  });
  pdfPath = await Promise.all(promise2);
  console.log(pdfPath);
  const news = new News({
    date: req.body.date,
    heading: req.body.heading,
    content: req.body.content,
    imagesPath: imgPath,
    pdfsPath: pdfPath,
  });

  await news.save();

  const gallery = new Gallery({
    type: "news",
    _id: news._id,
    date: news.date,
    image0Path: news.imagesPath[0],
  });

  await gallery.save();

  console.log("Bye from backend");
  res.json({ result: "success" });
});

handler.get(async (req, res) => {
  res.json({ name: "John Doe" });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
