import nextConnect from 'next-connect'
import Office from '../../models/office'
import Achievement from '../../models/achievement'
import Gallery from '../../models/gallery'
import News from '../../models/news'
import mongooseConnection from '../../middleware/database'
import { off } from 'gulp';

const multer = require('multer');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});




// dont forget to create a destination folder 

// Currently using multer.memoryStorage() because diskStorage in not providing us with buffer data

// const storage = multer.diskStorage({
//     filename: (req, file, cb) => {

//         if (req.body.formType != 'office') {
//             // cb(null, req.body.date + "****" + file.originalname);
//         } else {
//             const filename = file.originalname.split('.');
//             cb(null, req.body.name + "." + filename[filename.length - 1]);
//         }

//     },
//     destination: (req, file, cb) => {
//         const destAppend = req.body.formType;
//         cb(null, 'files/' + destAppend);
//     }
// })

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (req.body.formType == 'office') {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    } else {
        cb(null, true);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

const handler = nextConnect();

handler.use(upload.single('file'));

handler.post(async (req, res) => {
    if (req.file == undefined) {
        // work needed on supplying acceptable responses on invalid inputs for file
        res.json({
            reason: "File type not supported"
        })
    } else {
        const filenameArray = req.file.originalname.split('.');
        let fileName;
        if (req.body.formType == 'office') {
            fileName = req.body.name + "." + filenameArray[filenameArray.length - 1];
        } else {
            fileName = req.body.date+"**"+req.body.title+"." + filenameArray[filenameArray.length - 1];
        }
        const param = {
            Bucket: process.env.AWS_BUCKET,
            Key: 'files/' + req.body.formType + '/' + fileName,
            Body: req.file.buffer
        }

        const aws_file = await s3.upload(param).promise();


        if (req.body.formType == 'achievement') {
            const achievement = new Achievement({
                date: req.body.date,
                title: req.body.title,
                details: req.body.details,
                filePath: aws_file.Location,
            })
            achievement.save();
        } else if (req.body.formType == 'office') {
            const office = new Office({
                name: req.body.name,
                designation: req.body.designation,
                imagePath: aws_file.Location
            })
            office.save();
        } else if (req.body.formType == 'gallery') {
            const gallery = new Gallery({
                date: req.body.date,
                title: req.body.title,
                details: req.body.details,
                filePath: aws_file.Location,
            })
            gallery.save();
        } else if (req.body.formType == 'news') {
            const news = new News({
                date: req.body.date,
                title: req.body.title,
                details: req.body.details,
                filePath: aws_file.Location,
            })
            news.save();
        }

        console.log("File stored in Storage System");
        res.statusCode = 200;
        res.json({ status: 'File recieved and Stored' });
    }



})

export const config = {
    api: {
        bodyParser: false,
    }
}

export default handler;