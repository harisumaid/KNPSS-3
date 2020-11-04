// remove element from imageList or pdfList
// get into this route with updated post info and new files
// find the original post with the _id
// then search in original post if any files key is not present in new updated post
// if not present then send to deleteContent
// save the new files in aws 
// update post by appending new files key in updated post
// then update the document with updated post
// then update the gallery document with the updated files