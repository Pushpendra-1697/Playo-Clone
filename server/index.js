const http = require("http");
const express = require("express");
const app = express();
const httpServer = http.createServer(app);
const { connection } = require("./Configs/Config");
const { userRouter } = require("./Routes/users.route");

require("dotenv").config();
const PORT = process.env.PORT || 8080;
const cors = require("cors");

app.use(express.text());
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    res.send("yahoo!!!");
});


app.use('/users', userRouter);

httpServer.listen(PORT, async () => {
    try {
        await connection;
        console.log("connected to DB");
    } catch (e) {
        console.log({ message: e.message });
    }
    console.log(`Server is running at port ${PORT}`);
});