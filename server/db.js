const obj = {};

const pg = require('pg');
const PGconString = "postgres://admin:cameltelcom@185.8.244.111:5432/netelip_prod_dev";
const client = new pg.Client(PGconString);
client.connect();
console.log("Connected correctly to Postgre DB");
obj.postgre = client;




const MongoClient = require('mongodb').MongoClient;
const MGconString = 'mongodb://localhost:27017';


(function(){
  MongoClient.connect(MGconString, function(err, db) {
    console.log("Connected correctly to Mongo DB");
    obj.mongo = db
  });
})()


module.exports = obj;
