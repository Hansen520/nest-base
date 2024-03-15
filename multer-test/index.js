/*
 * @Date: 2024-03-14 16:12:34
 * @Description: description
 */
const express = require('express');
const multer = require('multer');
const cors = require('cors')


const app = express();
app.use(cors());

const upload = multer({ dest: 'uploads/' });

app.post('/aaa', upload.single('aaa'), function (req, res, next) {
    console.log('req.file', req.file);
    console.log('req.body', req.body);
})

app.post('/bbb', upload.array('bbb', 2), function(req) {
    console.log('req.file', req.files);
    console.log('req.body', req.body);
}, function(err) {
    console.log('err', err);
})

app.listen(1314);