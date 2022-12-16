const express = require('express');
const router = express.Router();

router.get('/test/hello/world', function (req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

module.exports = router;
