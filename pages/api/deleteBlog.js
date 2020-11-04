import * as fetchNews from "../../lib/fetchForNews";
import * as fetchAchievement from "../../lib/fetchForAchievement";
import { deleteGalleryForId } from "../../lib/fetchForGallery";
import { deleteContent } from "./deleteContent";
// get _id from body
// delete document from that from mongoose
// delete all files from aws
// delete that _id's document from gallery
export default async (req, res) => {
  // get _id and type of document
  const _id = JSON.parse(req.body)._id;
  const type = JSON.parse(req.body).type;
  switch (type) {
    case "news":
      // retrieve the original document from _id
      const document = JSON.parse(await fetchNews.fetchForId(_id));
      //   deleting each files from aws
      // deleting all images
      document[0].imagesPath.forEach(async (element) => {
        //   resusing deleteContent api by supplying key of each element to it
        console.log("deleting images");
        console.log(await deleteContent(element));
      });
      // deleting all pdfs
      document[0].pdfsPath.forEach(async (element) => {
        console.log(await deleteContent(element));
      });
      // delete document from news
      console.log(await fetchNews.deleteForId(_id));
      // delete document from gallery
      console.log(await deleteGalleryForId(_id));
      res.json({ message: "deleted" });

      break;
    case "achievement":
      break;
    default:
      break;
  }
};
