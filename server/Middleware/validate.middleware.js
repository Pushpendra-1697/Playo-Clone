const validate = (req, res, next) => {
    const { token, eventId } = req.headers;
    if (token) {
        next();
    } else {
        res.send({ "status": "NO", "msg": "Unauthorized Please Login First" });
    }
}

module.exports = { validate };