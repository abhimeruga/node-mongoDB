const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
import { InitialConnection } from "../DBConnection/initialConnection";

const app = express();
app.use(cors());
app.use(bodyParser.json());
export class Rest {
    public IC = new InitialConnection();
    public GET(value: string) {
        console.log("GET");
        return new Promise((resolve) => {
            app.get(value, async (req, res) => {
                console.log("GET call");
                const data = await this.IC.getAllData("users");
                res.send(data);
            });
            resolve();
        });
    }
}
