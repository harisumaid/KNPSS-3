import Gallery from "../models/gallery";

export async function fetchAllGallery() {
  const galleryList = await Gallery.find({});
  return galleryList;
}
