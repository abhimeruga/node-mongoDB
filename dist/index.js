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
exports.express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = exports.express();
app.use(cors());
app.use(bodyParser.json());
const initialConnection_1 = require("./DBConnection/initialConnection");
const port = 4000;
const IC = new initialConnection_1.InitialConnection();
function getDBConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        yield app.listen(port, () => __awaiter(this, void 0, void 0, function* () {
            console.log("Listening to port", port);
            const connectDB = yield IC.connectToMongoDB();
            console.log(connectDB);
        }));
    });
}
function restCallURLS() {
    return __awaiter(this, void 0, void 0, function* () {
        yield app.get("/users", (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("users");
            const data = yield IC.getAllData("users");
            res.send(data);
        }));
        yield app.get("/users/:name", (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("users:name");
            const data = yield IC.searchData("users", req);
            res.send(data);
        }));
        yield app.post("/insertuser", (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("insertuser");
            const data = yield IC.insertData("users", req, "Single");
            res.send(data);
        }));
        yield app.post("/insertusers", (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("insertusers");
            const data = yield IC.insertData("users", req, "Many");
            res.send(data);
        }));
        yield app.delete("/deleteuser", (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("deleteuser");
            const data = yield IC.deleteData("users", req, "Single");
            res.send(data);
        }));
        yield app.delete("/deleteusers", (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("deleteusers");
            const data = yield IC.deleteData("users", req, "Many");
            res.send(data);
        }));
        yield app.put("/updateuser", (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("updateuser");
            const data = yield IC.updateData("users", req, "Many");
            res.send(data);
        }));
    });
}
getDBConnection();
restCallURLS();
//# sourceMappingURL=index.js.map