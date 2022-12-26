"use strict";

require("dotenv").config();
const express = require("express");
const { readFileSync, unlinkSync } = require("fs");
const { imagekit } = require("./util/imagekit");
const { upload } = require("./util/multer");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/", upload.single("media"), async (req, res, next) => {
  /*

  Example req.file
  {
    fieldname: 'media',
    originalname: 'JFvdYo_N0TQ3Vis20IDTbe8lsEFP.webp',
    encoding: '7bit',
    mimetype: 'image/webp',
    destination: '/home/uploads',
    filename: 'b963f18fb79739f0cdfa1156d706fe14',
    path: '/home/uploads/b963f18fb79739f0cdfa1156d706fe14',
    size: 5824
  }
  */
  console.log(req.file);

  const { fieldname, mimetype, filename, path } = req.file;

  // read uploaded file
  const file = readFileSync(path);
  console.log("Uploading to imagekit");
  const ikRes = await imagekit.upload({
    file : file,
    fileName : filename,
  });

  /*

    upload result example
    {
      fileId: '63a9a44de809dd54b0a149b7',
      name: '28073b5a52f3aabfd33d66a71260f3a2_FjVw8ApjW',
      size: 14268520,
      versionInfo: { id: '63a9a44de809dd54b0a149b7', name: 'Version 1' },
      filePath: '/28073b5a52f3aabfd33d66a71260f3a2_FjVw8ApjW',
      url: 'https://ik.imagekit.io/imagekitid/28073b5a52f3aabfd33d66a71260f3a2_FjVw8ApjW',
      fileType: 'non-image',
      AITags: null
    }
  */
  console.log(ikRes);

  // save to database
  // ikRes.name  ikRes.url   mimetype     fieldname
  // name:string,url:string,format:string,type:string

  console.log("Deleting uploaded file from server");
  unlinkSync(path);
  console.log("Done!");
});

module.exports = app;
