import nextConnect from 'next-connect'
import Office from '../../models/office'
import Achievement from '../../models/achievement'
import News from '../../models/news'
import Gallery from '../../models/gallery'
import mongooseConnection from '../../middleware/database'

import fs from 'fs'

const handler = nextConnect();


handler.get(async (req, res) => {
    if (req.query.formType == 'office') {
        await Office.find({}, async function (err, office) {
            res.statusCode = 200;
            await res.json(JSON.stringify(office));
        });
    } else if (req.query.formType == 'achievement') {
        await Achievement.find({},async function (err,achievement) {
            res.statusCode = 200;
            await res.json(JSON.stringify(achievement));
        });
    } else if (req.query.formType == 'news') {
        await News.find({},async function (err,news) {
            res.statusCode = 200;
            await res.json(JSON.stringify(news));
        });
    } else if (req.query.formType == 'gallery') {
        await Gallery.find({},async function (err,gallery) {
            res.statusCode = 200;
            await res.json(JSON.stringify(gallery));
        });
    }

});




export default handler