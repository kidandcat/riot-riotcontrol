const express = require('express');
const router = express.Router();
const md5 = require('md5');
const security = require('./auth');
const db = require('./db.js');
const ObjectID = require("mongodb").ObjectID;


////////////
// ROUTES //
////////////
router.get('/api/checkcredentials', apiCheckCredentials);

router.get('/api/users', apiUsers);

router.get('/api/message', apiMessage);
router.get('/api/message/:ticket', apiMessageTicket);
router.post('/api/message', apiMessageNew);
router.put('/api/message/:id', apiMessageModify);
router.delete('/api/message/:id', apiMessageDelete);

router.get('/api/contact', apiContact);
router.get('/api/contact/:param', apiContactParam);
router.post('/api/contact', apiContactNew);


//////////////
// HANDLERS //
//////////////
function apiCheckCredentials(req, res, next) {
    security.auth(req, (r) => {
        if (!r) {
            res.status(401).json({
                status: 'ko'
            });
        } else {
            res.status(200).json({
                status: 'ok'
            });
        }
    })
}

function apiUsers(req, res, next) {
    security.auth(req, (r) => {
        if (!r) {
            res.status(401).send();
            return false;
        }
        db.postgre.query("SELECT * FROM admin_users", [], (err, result) => {
            res.json(result.rows);
        });
    })
}

function apiMessageNew(req, res, next) {
    security.auth(req, (r) => {
        if (!r) {
            res.status(401).send();
            return false;
        }
        let tickets = db.mongo.collection('tickets');
        let message = {};
        message.date = new Date();
        message.ticketId = req.body.ticketId;
        message.adminId = req.body.adminId;
        message.userId = req.body.userId;
        message.language = req.body.language || 'es';
        message.visible = req.body.visible || true;
        message.type = req.body.type || 'user';
        message.category = req.body.category;
        message.message = req.body.message;
        message.status = req.body.status || 'open';

        tickets.insertMany([message], function(err, result) {
            console.log(result);
            res.json(result.result);
        });
    })
}

function apiMessageModify(req, res, next) {
    security.auth(req, (r) => {
        if (!r) {
            res.status(401).send();
            return false;
        }
        let tickets = db.mongo.collection('tickets');

        tickets.update({
            _id: ObjectID(req.params.id)
        }, {
            $set: {
                date: new Date(),
                ticketId: req.body.ticketId,
                adminId: req.body.adminId,
                userId: req.body.userId,
                language: req.body.language,
                visible: req.body.visible,
                type: req.body.type,
                category: req.body.category,
                message: req.body.message,
                status: req.body.status
            }
        }, function(err, result) {
            console.log(result.result);
            res.json(result.result);
        });
    })
}

function apiMessage(req, res, next) {
    security.auth(req, (r) => {
        if (!r) {
            res.status(401).send();
            return false;
        }
        let tickets = db.mongo.collection('tickets');

        tickets.find({}).toArray(function(err, docs) {
            res.json(docs);
        });

    })
}

function apiMessageDelete(req, res, next) {
    security.auth(req, (r) => {
        if (!r) {
            res.status(401).send();
            return false;
        }
        let tickets = db.mongo.collection('tickets');

        console.log('delete ', req.params.id);

        tickets.remove({
            _id: ObjectID(req.params.id)
        }, function(err, docs) {
            console.log('err', err);
            res.json(docs);
        });

    })
}

function apiMessageTicket(req, res, next) {
    security.auth(req, (r) => {
        if (!r) {
            res.status(401).send();
            return false;
        }
        let tickets = db.mongo.collection('tickets');

        tickets.find({
            ticketId: req.params.ticket
        }).toArray(function(err, docs) {
            res.json(docs);
        });

    })
}

function apiContactNew(req, res, next) {
    security.auth(req, (r) => {
        if (!r) {
            res.status(401).send();
            return false;
        }
        let collection = db.mongo.collection('contacts');

        let contact = {};
        contact.date = new Date();
        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.language = req.body.language || 'es';
        contact.category = req.body.category;
        contact.v4id = req.body.v4id;

        collection.insertMany([contact], function(err, result) {
            console.log(result);
            res.json(result.result);
        });

    })
}

function apiContact(req, res, next) {
    security.auth(req, (r) => {
        if (!r) {
            res.status(401).send();
            return false;
        }
        let contacts = db.mongo.collection('contacts');

        contacts.find({}).toArray(function(err, docs) {
            res.json(docs);
        });

    })
}

function apiContactParam(req, res, next) {
    security.auth(req, (r) => {
        if (!r) {
            res.status(401).send();
            return false;
        }
        let contacts = db.mongo.collection('contacts');

        contacts.find({
            $or: [{
                name: req.params.param
            }, {
                email: req.params.param
            }, {
                phone: req.params.param
            }, {
                v4id: req.params.param
            }]
        }).toArray(function(err, docs) {
            res.json(docs);
        });

    })
}


module.exports = router;
