import __dirname from "./index.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder;

        if (file.fieldname === 'image') {
            folder = `${__dirname}/../public/uploads/pets`;
        } else if (file.fieldname === 'documents') {
            folder = `${__dirname}/../public/uploads/documents`;
        } else {
            folder = `${__dirname}/../public/img`;
        }

        console.log(`Saving file to folder: ${folder}`);

        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }

        cb(null, folder);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const uploader = multer({ storage });

export default uploader;