const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
export class InitialConnection {
    public URL = "mongodb://localhost:27017/";
    public dataBases: any;
    public dbName: string;
    public db: any;
    public async connectToMongoDB() {
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
    }
    public connectToDB(dbName: string) {
        this.db = this.dataBases.db(dbName);
        console.log("Connected to", dbName);
    }

    public async getAllData(collectionName: string) {
        return new Promise(async (resolve) => {
            this.db.collection(collectionName).find({}).toArray(async (err, res) => {
                if (err) {
                    console.log("Error :: Results  from!!", collectionName);
                    throw err;
                }
                console.log("Success :: Results  from!!", collectionName);
                console.log(res);
                await resolve(res);
            });
        });
    }
    public async searchData(collectionName: string, request) {
        return new Promise(async (resolve) => {
            this.db.collection(collectionName).find({ name: request.params.name }).toArray(async (err, res) => {
                if (err) {
                    console.log("Error :: search results !!", err);
                    throw err;
                }
                console.log("Success :: search results!!", res);
                await resolve(res);
            });
        });
    }
    public async insertData(collectionName: string, insData, type) {
        if (type === "Single") {
            return new Promise(async (resolve) => {
                this.db.collection(collectionName).insertOne(insData.body, async (err, res) => {
                    if (err) {
                        console.log("Error :: Single insertion failed !!", err);
                        throw err;
                    }
                    console.log("Success :: 1 record inserted!!", res.insertCount);
                    await resolve(res);
                });
            });
        } else {
            return new Promise(async (resolve) => {
                this.db.collection(collectionName).insertMany(insData.body, async (err, res) => {
                    if (err) {
                        console.log("Error :: Multiple insertion failed !!", err);
                        throw err;
                    }
                    console.log("Success :: Multiple records inserted!!", res.insertedCount);
                    await resolve(res);
                });
            });
        }
    }
    public async deleteData(collectionName: string, deleData, type) {
        if (type === "Single") {
            return new Promise(async (resolve) => {
                this.db.collection(collectionName).deleteOne(deleData.body, async (err, res) => {
                    if (err) {
                        console.log("Error :: delete single results !!", err);
                        throw err;
                    }
                    console.log("Success :: delete single results!!", res);
                    await resolve(res);
                });
            });
        } else {
            return new Promise(async (resolve) => {
                deleData.body = { name: new RegExp(deleData.body.name, "i") };
                console.log(deleData.body);
                this.db.collection(collectionName).deleteMany(deleData.body, async (err, res) => {
                    if (err) {
                        console.log("Error :: delete multiple results !!", err);
                        throw err;
                    }
                    console.log("Success :: delete multiple results!!", res);
                    await resolve(res);
                });
            });
        }
    }
    public async updateData(collectionName: string, request, type = "Single") {
        return new Promise(async (resolve) => {
            this.db.collection(collectionName).updateOne(request.body[0],
                { $set: request.body[1] }, async (err, res) => {
                if (err) {
                    console.log("Error :: update result !!", err);
                    throw err;
                }
                console.log("Success :: update result!!", res);
                await resolve(res);
            });
        });
    }

}
