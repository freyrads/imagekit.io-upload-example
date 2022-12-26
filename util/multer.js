"use strict";

const multer  = require('multer')
const { join } = require("path");

const upload = multer({ dest: join(__dirname, "..", "uploads") });

module.exports = { upload }
