import multer, { diskStorage, memoryStorage } from "multer";
const paths = {
  images: "./src/assets/productImages",
};

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image") || file.mimetype.startsWith("video")) {
    cb(null, true);
  } else if (
    // file.originalname.match(/\.(pdf|docx|doc|xlsx|ppt|pptx|jpg|jpeg|csv)$/)
    file.originalname.match(/\.(pdf|docx|doc|xlsx|ppt|pptx|jpg|jpeg|csv|mp4|mov|avi|wmv|flv|mkv)$/)
 
  ) {
    cb(null, true);
  } else {
    cb("Please upload only file.", false);
  }
};

let storage = diskStorage({
  destination: (req, file, cb) => {
 console.log(req.body)
    
    // cb(null, paths[req.body.key]);
    cb(null, paths['images']);

  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
  },
});

let uploadFile = multer({ storage: memoryStorage(), fileFilter: imageFilter });


export default uploadFile;
