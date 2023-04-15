const { Router } = require('express');
const { EventModel } = require('../Models/event.model');
const UserModel = require('../Models/users.model');
const overviewRouter = Router();


overviewRouter.get('/accepted/:id/:index', async (req, res) => {
    const { id, index } = req.params;
    try {
        let users = await EventModel.aggregate([
            {
                $project: {
                    _id: 0,
                    trueUsers: {
                        $filter: {
                            input: "$users",
                            as: "user",
                            cond: { $eq: ["$$user.status", true] }
                        }
                    }
                }
            }
        ]);
        users = users[index].trueUsers;
        let event = await EventModel.findOne({ _id: id });
        var { name, desc, start, end, maxPlayer, admin_id } = event;
        let admin = await UserModel.findOne({ _id: admin_id });
        let payload = { name, desc, start, end, maxPlayer, adminName: admin.name }
        res.status(200).send({ "msg": `Successfully get Accepted Users`, users, payload });
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

overviewRouter.get('/rejected/:id/:index', async (req, res) => {
    const { id, index } = req.params;

    try {
        let users = await EventModel.aggregate([
            {
                $project: {
                    _id: 0,
                    trueUsers: {
                        $filter: {
                            input: "$users",
                            as: "user",
                            cond: { $eq: ["$$user.status", false] }
                        }
                    }
                }
            }
        ]);
        users = users[index].trueUsers;
        let event = await EventModel.findOne({ _id: id });
        var { name, desc, start, end, maxPlayer, admin_id } = event;
        let admin = await UserModel.findOne({ _id: admin_id });
        let payload = { name, desc, start, end, maxPlayer, adminName: admin.name }
        res.status(200).send({ "msg": `Successfully get Rejected Users`, users, payload });
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

module.exports = { overviewRouter };
