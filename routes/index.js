var express = require('express');
var router = express.Router();
var nemapi = require('nem-api');
var nem = require("nem-sdk").default;

router.get('/', function(req, res, next) {
  res.send("working");
});


router.get('/transaction', function(req, res, next) {
  let to = req.query.to;
  let amount = req.query.amount;
  let message = req.query.message;
  let faucetOwnerPassword = 'bichomaster1'; //Your password here
  let faucetOwnerPrivateKey = 'a199236c3b1cecd827e3eb1b33bd24d7dd41e9d8827c9189360cf37f6fa25ffd'; //Your private key here

  let endpoint = nem.model.objects.create('endpoint')(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);
  let common = nem.model.objects.create('common')(faucetOwnerPassword, faucetOwnerPrivateKey);
  let transferTransaction = nem.model.objects.create('transferTransaction')(to, amount, message);
  let preparedTransaction = nem.model.transactions.prepare('transferTransaction')(common, transferTransaction, nem.model.network.data.testnet.id);
  nem.com.requests.chain.time(endpoint).then(function (timeStamp) {
    const ts = Math.floor(timeStamp.receiveTimeStamp / 1000);
    preparedTransaction.timeStamp = ts;
    const due = 60;
    preparedTransaction.deadline = ts + due * 60;
   
    console.log(preparedTransaction);
   
    nem.model.transactions.send(common, preparedTransaction, endpoint).then(function(response){
        res.send(response);
    }, function(err){
       res.send(err);
    });

  }, function (err) {
      res.send(err);
  });
});

// router.get('/ads', function(req, res, next) {
//   const campaigns = req.query.advertiser_campaigns
//   connection.query(`SELECT DISTINCT campaign_id, id, headline, description, url FROM ads JOIN campaign_ads ON ads.id = campaign_ads.ad_id WHERE campaign_ads.campaign_id IN (${campaigns}) GROUP BY find_in_set(campaign_id, '${campaigns}');`, function (error, results, fields) {
//     if (error) throw error;
//     res.status(200).send( results );
//     });
         
// });


module.exports = router;
