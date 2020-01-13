"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const initialConnection_1 = require("../DBConnection/initialConnection");
const app = express();
app.use(cors());
app.use(bodyParser.json());
class Rest {
    constructor() {
        this.IC = new initialConnection_1.InitialConnection();
    }
    GET(value) {
        console.log("GET");
        return new Promise((resolve) => {
            app.get(value, (req, res) => __awaiter(this, void 0, void 0, function* () {
                console.log("GET call");
                const data = yield this.IC.getAllData("users");
                res.send(data);
            }));
            resolve();
        });
    }
}
exports.Rest = Rest;
//# sourceMappingURL=rest.js.map