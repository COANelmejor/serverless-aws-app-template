var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({
    message: 'Bienvenido a DTE API. v2'
  });
});

module.exports = router;
