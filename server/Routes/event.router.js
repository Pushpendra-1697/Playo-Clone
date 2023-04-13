const { Router } = require('express');
const { validate } = require('../Middleware/validate.middleware');
const eventRouter = Router();
const { EventModel } = require('../Models/event.model');


eventRouter.post('/post', validate, async (req, res) => {
    const payload = req.body;
    try {
        const event = new EventModel(payload);
        await event.save();
        res.status(201).send({ msg: 'Successfully Created an Event', event });
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

eventRouter.get('/get', async (req, res) => {
    const query = req.query;
    try {
        const events = await EventModel.find(query);
        res.status(200).send({ msg: 'All Events', events });
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

module.exports = { eventRouter };