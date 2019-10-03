var express = require('express');
var router = express.Router();
let mysql = require('mysql');

let connection = mysql.createConnection({
  // host     : 'goku.cwzshpcfjbsy.us-east-1.rds.amazonaws.com',
  // password : 'Isabelgoku', //'AdminCloud',
  host     : 'cloudrds.cvvtkb9yuaiz.us-east-2.rds.amazonaws.com',
  password : 'AdminCloud',
  user     : 'admin',
  database : 'configuration'
});

connection.connect(function(err) {
  if (err) throw err
  console.log('connection successful')
})


router.get('/', function(req, res, next) {
  res.status(200).send("working")
});

router.get('/ads', function(req, res, next) {
  const campaigns = req.query.advertiser_campaigns
  connection.query(`SELECT DISTINCT campaign_id, id, headline, description, url FROM ads JOIN campaign_ads ON ads.id = campaign_ads.ad_id WHERE campaign_ads.campaign_id IN (${campaigns}) GROUP BY find_in_set(campaign_id, '${campaigns}');`, function (error, results, fields) {
    if (error) throw error;
    res.status(200).send( results );
    });
         
});


module.exports = router;
