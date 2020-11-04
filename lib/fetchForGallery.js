import Gallery from "../models/gallery";
import mongooseConnection from "../middleware/database";

export const fetchAllGallery = async () => {
  const galleryList = JSON.stringify(await Gallery.find({}));
  return galleryList;
};

export const deleteGalleryForId = async (id) => {
  const result = JSON.stringify(
    await Gallery.deleteOne({ _id: id }, function (err) {
      if (err) {
        console.log("Error in deleting document in gallery");
        return err;
      }
    })
  );
  return result;
};
