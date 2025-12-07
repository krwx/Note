var express = require('express');
var router = express.Router();

const formidable = require("formidable");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/portrait', function(req, res, next) {
  res.render('portrait');
});

router.post('/portrait', function(req, res, next) {
  const form = formidable({
    uploadDir: __dirname + "/../public/images",
    keepExtensions: true
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    console.log(fields);
    console.log(files);
    console.log(files.portrait.newFilename);
    res.send("upload success");
  });
});

module.exports = router;
