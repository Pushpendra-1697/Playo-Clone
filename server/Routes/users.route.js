const { Router } = require('express');
const UserModel = require('../Models/users.model');
const userRouter = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


userRouter.post('/register', async (req, res) => {
    const { name, password } = req.body;
    try {
        bcrypt.hash(password, +(process.env.Salt_rounds), async (err, secure_password) => {
            if (err) {
                console.log(err);
            } else {
                const user = new UserModel({ name, password: secure_password });
                await user.save();
                res.status(201).send({ msg: 'Registered Successfully' });
            }
        })
    } catch (err) {
        res.status(404).send({ msg: "Registation failed" });
    }
});

userRouter.post('/login', async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await UserModel.find({ name });
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, results) => {
                if (results) {
                    const token = jwt.sign({ course: 'backend' }, process.env.secret_key, { expiresIn: "365d" });
                    res.send({ msg: "Login Successful", token });
                } else {
                    res.status(201).send({ msg: "Wrong Password" });
                }
            })
        } else {
            res.status(201).send({ msg: "Wrong Username" });
        }
    } catch (err) {
        res.status(404).send({ msg: "Login failed" });
    }
});

module.exports = { userRouter };