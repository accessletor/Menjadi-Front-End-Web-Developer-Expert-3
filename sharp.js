/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-extraneous-dependencies */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const existsSync = fs.existsSync;
const mkdirSync = fs.mkdirSync;
const readdirSync = fs.readdirSync;
const resolve = path.resolve;

const target = resolve(__dirname, 'src/public/images');
const destination = resolve(__dirname, 'src/public/images-responsive');

if (!existsSync(destination)) {
  mkdirSync(destination);
}

readdirSync(target)
  .forEach((image) => {
    // mengubah ukuran gambar dengan lebar 960px, dengan prefix -large.jpg
    sharp(`${target}/${image}`)
      .resize(960)
      .toFile(resolve(
        __dirname,
        `${destination}/${image.split('.').slice(0, -1).join('.')}-large.jpg`,
      ));

    // mengubah ukuran gambar dengan lebar 768px, dengan prefix -large.jpg
    sharp(`${target}/${image}`)
      .resize(768)
      .toFile(resolve(
        __dirname,
        `${destination}/${image.split('.').slice(0, -1).join('.')}-medium.jpg`,
      ));

    // mengubah ukuran gambar dengan lebar 480px, dengan prefix -small.jpg
    sharp(`${target}/${image}`)
      .resize(480)
      .toFile(resolve(
        __dirname,
        `${destination}/${image.split('.').slice(0, -1).join('.')}-small.jpg`,
      ));
  });
