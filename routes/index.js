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
  let faucetOwnerPassword = ''; //Your password here
  let faucetOwnerPrivateKey = ''; //Your private key here

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



module.exports = router;
