const http = require("http");
const express = require("express");
const app = express();
const httpServer = http.createServer(app);
const { connection } = require("./Configs/Config");
const { userRouter } = require("./Routes/users.route");
const { eventRouter } = require("./Routes/event.router");

require("dotenv").config();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const { acceptRouter } = require("./Routes/accept.route");
const { overviewRouter } = require("./Routes/overview.route");

app.use(express.text());
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    res.send("yahoo!!!");
});


app.use('/users', userRouter);
app.use('/events', eventRouter);
app.use('/', acceptRouter);
app.use('/overview', overviewRouter);

httpServer.listen(PORT, async () => {
    try {
        await connection;
        console.log("connected to DB");
    } catch (e) {
        console.log({ message: e.message });
    }
    console.log(`Server is running at port ${PORT}`);
});