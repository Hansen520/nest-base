/*
 * @Date: 2024-08-07 17:04:28
 * @Description: description
 */
import * as multer from 'multer';
import * as fs from 'fs';

// 存储的设计
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      fs.mkdirSync('uploads'); // 创建文件夹
    } catch (e) {}

    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      '-' +
      file.originalname; // 创建文件夹名字
    cb(null, uniqueSuffix);
  },
});

export { storage };
