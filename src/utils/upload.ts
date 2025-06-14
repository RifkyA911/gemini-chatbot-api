import multer from "multer";

const storage = multer.memoryStorage(); // disimpan di RAM, bukan harddisk
export const upload = multer({ storage });

export default upload;
