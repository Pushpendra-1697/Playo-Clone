const { Router } = require('express');
const { EventModel } = require('../Models/event.model');
const acceptRouter = Router();
const jwt = require('jsonwebtoken');


acceptRouter.post('/accept', async (req, res) => {
    let { token, event_id } = req.headers;
    token = jwt.decode(token, process.env.secret_key);
    let user_id = token.id;
    let event = await EventModel.findOne({ _id: event_id });
    try {
        if (event.admin_id !== user_id && event.maxPlayer > event.users.length) {
            event.users.push(user_id);
            await event.save();
            res.send({ msg: "Accepted", event });
        }else if(event.admin_id === user_id){
            res.send({ msg: "You are organizer so You can't Join this event", event });
        }else {
            res.send({ msg: 'Rejected' });
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = { acceptRouter };
