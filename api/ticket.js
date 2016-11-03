const express = require('express');
const router = express.Router();


router.get('/buy/lib', (req, res, next) => {
    res.sendFile('filename', {root: __dirname});
});


module.exports = router;
