const validate = (req, res, next) => {
    const { name } = req.headers;
    if (name === "admin") {
        next();
    } else {
        res.send({ "status": "NO", "msg": "You are not Admin" });
    }
}

module.exports = { validate };