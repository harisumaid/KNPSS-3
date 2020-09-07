import nextConnect from 'next-connect'
import Office from '../../models/office'
import mongooseConnection from '../../middleware/database'

import fs from 'fs'

const handler = nextConnect();


handler.get(async (req, res) => {
    await Office.find({}, async function (err, office) {
        res.statusCode = 200;
        await res.json(JSON.stringify(office));
    });
});


// export default async (req, res) => {
//     Office.find({}, function (err, office) {
//         res.statusCode = 200;
//         res.json(JSON.stringify(office));
//     });
// }


export default handler