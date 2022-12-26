"use strict";

const ImageKit = require("imagekit");

const { IMAGEKIT_PRIVATE_KEY, IMAGEKIT_PUBLIC_KEY, IMAGEKIT_ID } = process.env;

const imagekit = new ImageKit({
    publicKey : IMAGEKIT_PUBLIC_KEY,
    privateKey : IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : `https://ik.imagekit.io/${IMAGEKIT_ID}`
});

module.exports = { imagekit }
