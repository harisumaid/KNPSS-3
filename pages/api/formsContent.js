import nextConnect from 'next-connect';
import News from "../../models/news";
import mongooseConnection from '../../middleware/database'

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

// const AWS = require('aws-sdk')
// const s3 = new AWS.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY,

// })


const handler = nextConnect();

handler.use(upload.fields(
    [
        {name:'images'},
        {name:'pdfs'},
    ]
));

handler.post( async(req,res)=>{

     let imgPath = [];
     req.files.images.map(file=>{
        imgPath.push(file.originalname)
    })
    let pdfPath= [];
    req.files.pdfs.map(file=>{
        pdfPath.push(file.originalname)
    })

    console.log(imgPath);
    console.log(pdfPath);

    const news = new News({
        date: req.body.date,
        heading:req.body.heading,
        content:req.body.content,
        imagesPath: imgPath,
        pdfsPath: pdfPath,
    }
    );

    console.log(news.imagesPath);

    await news.save();
    
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