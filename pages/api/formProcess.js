import nextConnect from 'next-connect'
import Office from '../../models/office'
import Achievement from '../../models/achievement'
import Gallery from '../../models/gallery'
import News from '../../models/news'
import mongooseConnection from '../../middleware/database'
import { off } from 'gulp';

const multer = require('multer');


// dont forget to create a destination folder 
const storage = multer.diskStorage({
    filename: (req, file, cb) => {

        console.log(file.mimetype);
        if (req.body.formType != 'office') {
            cb(null, req.body.date + "****" + file.originalname);
        } else {
            const filename = file.originalname.split('.');
            cb(null, req.body.name + "." + filename[filename.length - 1]);
        }

    },
    destination: (req, file, cb) => {
        const destAppend = req.body.formType;
        cb(null, 'files/' + destAppend);
    }
})

const upload = multer({ storage: storage });

const handler = nextConnect();

handler.use(upload.single('file'));

handler.post((req, res) => {

   if (req.body.formType == 'achievement') {
        const achievement = new Achievement({
            date: req.body.date,
            title: req.body.title,
            details: req.body.details,
            filePath: req.file.filename,
        })
        achievement.save();
    } else if (req.body.formType == 'office') {
        const office = new Office({
            name: req.body.name,
            designation: req.body.designation,
            imagePath: req.file.filename
        })
        office.save();
    } else if (req.body.formType == 'gallery') {
        const gallery = new Gallery({
            date: req.body.date,
            title: req.body.title,
            details: req.body.details,
            filePath: req.file.filename,
        })
        gallery.save();
    } else if (req.body.formType == 'news') {
        const news = new News({
            date: req.body.date,
            title: req.body.title,
            details: req.body.details,
            filePath: req.file.filename,
        })
        news.save();
    }

    
    console.log(req.body);
    res.statusCode = 200;
    res.json({ name: 'John Doe' })
})

export const config = {
    api: {
        bodyParser: false,
    }
}

export default handler;