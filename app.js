"use strict";

require("dotenv").config();
const express = require("express");
const { readFileSync, unlinkSync } = require("fs");
const { imagekit } = require("./util/imagekit");
const { upload } = require("./util/multer");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

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

app.post("/", upload.single("media"), async (req, res, next) => {
  console.log(req.file);

  const { fieldname, mimetype, filename, path } = req.file;

  // read uploaded file
  const file = readFileSync(path);
  console.log("Uploading to imagekit");
  const ikRes = await imagekit.upload({
    file : file,
    fileName : filename,
  });

  console.log(ikRes);

  // save to database
  // filename, 	  ikRes.url  		mimetype,  fieldname
  // name:string,url:string,format:string,type:string

  console.log("Deleting uploaded file from server");
  unlinkSync(path);
  console.log("Done!");
});

module.exports = app;
