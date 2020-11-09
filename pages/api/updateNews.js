import News from "../../models/news";
import Gallery from "../../models/gallery";
import nextConnect from "next-connect";
import { fetchForId, deleteForId } from "../../lib/fetchForNews";
import { deleteContent } from "./deleteContent";

const multer = require("multer");
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (
    file.fieldname === "imageFile" &&
    !(
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    )
  ) {
    cb(new Error("File format not matched"));
  } else if (
    file.fieldname === "pdfFile" &&
    !(
      file.mimetype === "application/pdf" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
  ) {
    cb(new Error("file format not matched"));
  } else {
    cb(null, true);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  params: {
    Bucket: process.env.MY_BUCKET,
  },
  apiVersion: "2006-03-01",
  region: "ap-south-1",
  accessKeyId: process.env.MY_ACCESS_KEY,
  secretAccessKey: process.env.MY_SECRET_ACCESS_KEY,
});

const onError = (err, req, res) => {
  if (err.message === "File format not matched") {
    res.status(415).json({
      error: "File format not matched",
    });
  } else {
    res.status(500).json({ error: console.trace(err) });
  }
};

const handler = nextConnect({ onError });

handler.use(upload.fields([{ name: "imageFile" }, { name: "pdfFile" }]));

handler.post(async (req, res) => {
  // get into this route with updated post info and new files
  // find the original post with the _id
  const newsOld = JSON.parse(await fetchForId(req.body._id));

  // then search in original post if any files key is not present in new updated post
  // if not present then send to deleteContent
  newsOld[0].imagesPath.forEach(async (element) => {
    if (Array.isArray(req.body.images)) {
      if (req.body.images.indexOf(element) == -1) {
        //   remove element
        await deleteContent(element);
      }
    } else {
      element === req.body.images ? null : await deleteContent(element);
    }
  });

  newsOld[0].pdfsPath.forEach(async (element) => {
    if (Array.isArray(req.body.pdfs)) {
      if (req.body.pdfs.indexOf(element) == -1) {
        // remove element
        await deleteContent(element);
      }
    } else {
      element === req.body.pdfs ? null : await deleteContent(element);
    }
  });

  // save the new files in aws

  let imgPath = [];
  const promise1 = !req.files.imageFile
    ? null
    : req.files.imageFile.map(async (file) => {
        console.log("Uploading images....");
        const param = {
          Key:
            "files/news/images/" +
            new Date().toISOString() +
            "_" +
            file.originalname,
          Body: file.buffer,
        };
        const aws_file = await s3.upload(param).promise();
        return aws_file.Location;
      });
  imgPath = req.files.imageFile ? await Promise.all(promise1) : [];
  console.log(imgPath);
  let pdfPath = [];
  const promise2 = !req.files.pdfFile
    ? null
    : req.files.pdfFile.map(async (file) => {
        console.log("Uploading pdfs....");
        const param = {
          Key:
            "files/news/pdfs/" +
            new Date().toISOString() +
            "_" +
            file.originalname,
          Body: file.buffer,
        };
        const aws_file = await s3.upload(param).promise();

        return aws_file.Location;
      });
  pdfPath = promise2 ? await Promise.all(promise2) : [];
  console.log(pdfPath);

  // update post by appending new files key in updated post

  req.body.images
    ? Array.isArray(req.body.images)
      ? imgPath.push(...req.body.images)
      : imgPath.push(req.body.images)
    : null;
  req.body.pdfs
    ? Array.isArray(req.body.pdfs)
      ? pdfPath.push(...req.body.pdfs)
      : pdfPath.push(req.body.pdfs)
    : null;

  // then update the document with updated post
  // deleted the newsOld (News) it was not a Mongoose Document anymore are playing with
  // that would not had been easy so created a new document with same _id after deleting newsOld

  await deleteForId(req.body._id);

  const news = new News({
    _id: req.body._id,
    date: req.body.date,
    heading: req.body.heading,
    content: req.body.content,
    imagesPath: imgPath,
    pdfsPath: pdfPath,
  });

  await news.save();

  // then update the gallery document with the updated files

  const gallery = await Gallery.findOne({ _id: news._id });
  gallery.date = news.date;
  gallery.image0Path = news.imagesPath[0];
  gallery.heading = news.heading;

  await gallery.save();
  //   sending the response as success
  res.json({ result: "success" });
});

export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};
