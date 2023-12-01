const express = require('express');
const router = express.Router();
const Q3RCon = require('quake3-rcon');
const mongodb = require('../../utils/mongodb.js');

var rcon = new Q3RCon({
  address: "5.183.171.168",
  port: "30120",
  password: 'kAvzSbLJKp4vnF38',
});

router.post('/rcon', express.urlencoded({ extended: false }), async (req, res) => {
    const command = req.body.command;
    if (req.session.user) {
        let user_id = req.session.user['id']
        let collectionData = await mongodb.LoadCollection('users')
        let userData = await collectionData.findOne({id: parseInt(user_id)})
        if (userData['adminLvl'] >= 1) {
            if (command) {
            rcon.send(command, (response) => {
                return;
              });
            res.status(200).send({message: "Command sent!"});
            }
        } else  {
            res.status(201).send({message: "You are not authorized to use this command!"});
        }
    }
});

module.exports = router;