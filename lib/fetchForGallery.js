import Gallery from "../models/gallery";
import mongooseConnection from '../middleware/database'

export const fetchAllGallery = async ()=> {
  const galleryList = JSON.stringify(await Gallery.find({}));
  return galleryList;
}
