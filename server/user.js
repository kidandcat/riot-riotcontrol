const express = require('express');
const router = express.Router();
const md5 = require('md5');
const security = require('./auth');
const pg = require('pg');
const conString = "postgres://admin:cameltelcom@185.8.244.111:5432/netelip_prod_dev";
const client = new pg.Client(conString);
client.connect();

router.get('/api/users', (req, res, next) => {
    security.auth(req, client, (r) => {
        if (r) {
            client.query("SELECT * FROM admin_users", [], (err, result) => {
                res.json(result.rows);
            });
        }else{
          res.status(401).send();
        }
    })
});


module.exports = router;
