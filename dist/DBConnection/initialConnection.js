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
const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());
class InitialConnection {
    constructor() {
        this.URL = "mongodb://localhost:27017/";
    }
    connectToMongoDB() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                console.log("connectToMongoDB");
                MongoClient.connect(this.URL, { useUnifiedTopology: true }, (err, db) => {
                    if (err) {
                        console.log("Error :: Connection failed !!");
                        throw err;
                    }
                    this.dataBases = db;
                    console.log("Success :: connection successfull !!");
                    this.connectToDB("users");
                    resolve("Connected!!");
                });
            });
        });
    }
    connectToDB(dbName) {
        this.db = this.dataBases.db(dbName);
        console.log("Connected to", dbName);
    }
    getAllData(collectionName) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                this.db.collection(collectionName).find({}).toArray((err, res) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log("Error :: Results  from!!", collectionName);
                        throw err;
                    }
                    console.log("Success :: Results  from!!", collectionName);
                    console.log(res);
                    yield resolve(res);
                }));
            }));
        });
    }
    searchData(collectionName, request) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                this.db.collection(collectionName).find({ name: request.params.name }).toArray((err, res) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log("Error :: search results !!", err);
                        throw err;
                    }
                    console.log("Success :: search results!!", res);
                    yield resolve(res);
                }));
            }));
        });
    }
    insertData(collectionName, insData, type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type === "Single") {
                return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                    this.db.collection(collectionName).insertOne(insData.body, (err, res) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.log("Error :: Single insertion failed !!", err);
                            throw err;
                        }
                        console.log("Success :: 1 record inserted!!", res.insertCount);
                        yield resolve(res);
                    }));
                }));
            }
            else {
                return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                    this.db.collection(collectionName).insertMany(insData.body, (err, res) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.log("Error :: Multiple insertion failed !!", err);
                            throw err;
                        }
                        console.log("Success :: Multiple records inserted!!", res.insertedCount);
                        yield resolve(res);
                    }));
                }));
            }
        });
    }
    deleteData(collectionName, deleData, type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type === "Single") {
                return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                    this.db.collection(collectionName).deleteOne(deleData.body, (err, res) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.log("Error :: delete single results !!", err);
                            throw err;
                        }
                        console.log("Success :: delete single results!!", res);
                        yield resolve(res);
                    }));
                }));
            }
            else {
                return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                    deleData.body = { name: new RegExp(deleData.body.name, "i") };
                    console.log(deleData.body);
                    this.db.collection(collectionName).deleteMany(deleData.body, (err, res) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.log("Error :: delete multiple results !!", err);
                            throw err;
                        }
                        console.log("Success :: delete multiple results!!", res);
                        yield resolve(res);
                    }));
                }));
            }
        });
    }
    updateData(collectionName, request, type = "Single") {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                this.db.collection(collectionName).updateOne(request.body[0], { $set: request.body[1] }, (err, res) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log("Error :: update result !!", err);
                        throw err;
                    }
                    console.log("Success :: update result!!", res);
                    yield resolve(res);
                }));
            }));
        });
    }
}
exports.InitialConnection = InitialConnection;
//# sourceMappingURL=initialConnection.js.map