import nextConnect from 'next-connect';
import News from "../../models/news";
import Gallery from '../../models/gallery';
import mongooseConnection from '../../middleware/database'

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const AWS = require('aws-sdk')
const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    region: 'ap-south-1',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


const handler = nextConnect();

handler.use(upload.fields(
    [
        {name:'images'},
        {name:'pdfs'},
    ]
));

handler.post( async(req,res)=>{

     let imgPath = [];
     const promise1 =  req.files.images.map(async(file)=>{
        const param = {
            Bucket: process.env.AWS_BUCKET,
            Key: 'files/news/images/' + file.originalname,
            Body: file.buffer
        }
        const aws_file = await s3.upload(param).promise();
        console.log('images');
        console.log(aws_file);
        console.log('images');
        return (aws_file.Location);
    })
    imgPath = await Promise.all(promise1);
    let pdfPath= [];
    const promise2 = req.files.pdfs.map(async(file)=>{
        const param = {
            Bucket: process.env.AWS_BUCKET,
            Key: 'files/news/pdfs/' + file.originalname,
            Body: file.buffer
        }
        const aws_file = await s3.upload(param).promise();

        return (aws_file.Location);
    })
    pdfPath = await Promise.all(promise2);
    const news = new News({
        date: req.body.date,
        heading:req.body.heading,
        content:req.body.content,
        imagesPath: imgPath,
        pdfsPath: pdfPath,
    }
    );

    await news.save();

    await News.findById(news._id, async function (err,news) {
      const gallery = new Gallery({
          type: 'news',
          _id: news._id,
          date: news.date,
          image0Path: news.imagesPath[0]
      });

      await gallery.save();

    } )
    
    res.json({ name: 'John Doe' })
});

handler.get(async(req,res)=>{
    res.json({ name: 'John Doe' });
})

export const config = {
    api : {
        bodyParser : false,
    },
}

export default handler;