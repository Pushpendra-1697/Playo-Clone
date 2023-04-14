const { Router } = require('express');
const { EventModel } = require('../Models/event.model');
const acceptRouter = Router();
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/users.model');


acceptRouter.post('/accept', async (req, res) => {
    let { token, event_id } = req.headers;
    token = jwt.decode(token, process.env.secret_key);
    let user_id = token.id;
    let event = await EventModel.findOne({ _id: event_id });
    let date = new Date();

    try {
        if (event.admin_id !== user_id && event.maxPlayer > event.users.length && date <= event.start) {
            let userName = await UserModel.findOne({ _id: user_id });
            userName = userName.name;
            event.users.push(userName);
            await event.save();
            let adminName = await UserModel.findOne({ _id: event.admin_id });
            adminName = adminName.name;
            res.send({ msg: "Accepted", event, adminName });
        } else if (event.admin_id === user_id) {
            let adminName = await UserModel.findOne({ _id: event.admin_id });
            adminName = adminName.name;
            res.send({ msg: "You are organizer so You can't Join this event", adminName });
        } else if (event.admin_id !== user_id && event.maxPlayer > event.users.length && date > event.start) {
            res.send({ msg: `Sorry😒 Deadline Over! You Can't join Now` });
        } else {
            res.send({ msg: 'Rejected' });
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = { acceptRouter };
