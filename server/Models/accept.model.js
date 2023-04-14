const { Schema, model } = require("mongoose");

const acceptSchema = new Schema(
    {
        event_id: {
            type: Schema.Types.ObjectId,
            ref: 'event',
            required: true
        },
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
                required: true
            }
        ]
    },
    { versionKey: false, timestamps: true }
);

const AcceptModel = model("accept", acceptSchema);

module.exports = { AcceptModel };