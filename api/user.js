const express = require('express');
const router = express.Router();
const md5 = require('md5');

const pg = require('pg');
const conString = "postgres://admin:cameltelcom@185.8.244.111:5432/netelip_prod_dev";
const client = new pg.Client(conString);
client.connect();

router.get('/api/users', (req, res, next) => {
    client.query("SELECT * FROM admin_users",[],(err, result)=>{
      result.rows.map(function(item){
        item.pasw = md5(item.pasw);
      });
      res.json(result.rows);
    });
});


module.exports = router;
