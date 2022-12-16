const router = require('express').Router();
const api = require('./api');

router.use('/api', api);

router.get('/test/hello/world', function (req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

module.exports = router;
