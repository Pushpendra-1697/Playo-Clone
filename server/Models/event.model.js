const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
    {
        desc: { type: String, required: true },
        start: { type: Date, required: true },
        end: { type: Date, required: true },
        maxPlayer: { type: Number, required: true }
    },
    { versionKey: false, timestamps: true }
);

const EventModel = model("event", eventSchema);

module.exports = { EventModel };