const models = require('../models/index');
const express = require('express');
const router  = express.Router();

router.get('/', function(req, res) {
  models.App.findAll()
    .then(function(apps) {
      res.send(apps);
    });
});

router.get('/:id', function(req, res) {
  const appId = req.params.id;
  //TODO: fix this
  const testData = [{
    id:   1,
    title: 'hey',
    img: null,
    appName: 'ABC News'
  }];

});




module.exports = router;