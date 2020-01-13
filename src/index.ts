
export const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());
import { InitialConnection } from "./DBConnection/initialConnection";

const port = 4000;

const IC = new InitialConnection();
async function getDBConnection() {
    await app.listen(port, async () => {
        console.log("Listening to port", port);
        const connectDB = await IC.connectToMongoDB();
        console.log(connectDB);
    });
}

async function restCallURLS() {
    await app.get("/users", async (req, res) => {
        console.log("users");
        const data = await IC.getAllData("users");
        res.send(data);
    });
    await app.get("/users/:name", async (req, res) => {
        console.log("users:name");
        const data = await IC.searchData("users", req);
        res.send(data);
    });
    await app.post("/insertuser", async (req, res) => {
        console.log("insertuser");
        const data = await IC.insertData("users", req, "Single");
        res.send(data);
    });
    await app.post("/insertusers", async (req, res) => {
        console.log("insertusers");
        const data = await IC.insertData("users", req, "Many");
        res.send(data);
    });
    await app.delete("/deleteuser", async (req, res) => {
        console.log("deleteuser");
        const data = await IC.deleteData("users", req, "Single");
        res.send(data);
    });
    await app.delete("/deleteusers", async (req, res) => {
        console.log("deleteusers");
        const data = await IC.deleteData("users", req, "Many");
        res.send(data);
    });
    await app.put("/updateuser", async (req, res) => {
        console.log("updateuser");
        const data = await IC.updateData("users", req, "Many");
        res.send(data);
    });
}
getDBConnection();
restCallURLS();
