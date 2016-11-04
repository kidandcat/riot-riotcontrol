const express = require('express');
const router = express.Router();
const pg = require('pg');
const conString = "postgres://admin:cameltelcom@185.8.244.111:5432/netelip_prod_dev";
const client = new pg.Client(conString);
client.connect();

router.get('/api/users', (req, res, next) => {
    if (req.session && req.session.auth) {
        users((u) => {
            res.json(u);
        })
    } else {
        res.json('No authorized');
    }
});

router.post('/api/login', (req, res, next) => {
    users((us) => {
        us.forEach((u) => {
            if (req.body.username == u.username)
                if (req.body.password == u.pasw)
                    req.session.auth = true;
        });
    });
});

function users(cb) {
    client.query("SELECT * FROM admin_users", [], (err, result) => {
        cb(result.rows);
    });
}


module.exports = router;
