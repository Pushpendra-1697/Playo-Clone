const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        password: { type: String, required: true }
    },
    { versionKey: false, timestamps: true }
);

const UserModel = model("user", userSchema);

module.exports = UserModel;