import nextConnect from 'next-connect'

const multer = require('multer');


// dont forget to create a destination folder 
const storage = multer.diskStorage({
    filename: (req, file, cb) => {

        console.log(file.mimetype);
        if (req.body.formType!='office') {
            cb(null, req.body.date +"****" +file.originalname);    
        } else {
            const filename = file.originalname.split('.');
            cb(null,req.body.name+"."+filename[filename.length-1] );
        }
        
    },
    destination: (req, file, cb) => {
        const destAppend = req.body.formType;
        cb(null, 'files/'+destAppend);
    }
})

const upload = multer({ storage: storage });

const handler = nextConnect();

handler.use(upload.single('file'));

handler.post((req, res) => {
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