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

export async function deleteContent(key) {
  var result='';
  const params = {
    Bucket: process.env.MY_BUCKET,
    Delete: {
      Objects: [
        {
          Key: decodeURIComponent("files" + key.split("files")[1]),
        },
      ],
    },
  };
  try {
    result = await s3.deleteObjects(params).promise();  
  } catch (error) {
    console.log("Error in deleting files");
    return error;
  }
  
  if (result.Errors[0]) {
    console.log("Deleting function executed still Some errors encountered");
    return result.Errors;
  } else {
    console.log("No errors in deleting files");
    return 'success';
  }
}


export default async (req, res) => {
  const body = JSON.parse(req.body);
  res.json({result:await deleteContent(body.key)});
};
