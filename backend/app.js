const { MongoClient } = require("mongodb");
const express = require("express");
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require("body-parser");


function getMongoClient() {
  return MongoClient.connect(process.env.MONGO_URI || 'mongodb://localhost:27017');
}

const createUser = async (req, res) => {
  try {
    // username, email, phone number, skillsets, hobby
    const client = await getMongoClient();
    const { username, email, phone_no, skillsets, hobby } = req.body;
    const user = { 
        username, 
        email, 
        phone_no, 
        skillsets, 
        hobby,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        deletedAt: null,
     };
    await client.db().collection("users").insertOne(user);
    res.status(200).json(user);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

const retrieveUser = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await getMongoClient();
    const user = await client.db().collection("users").findOne({ _id :  ObjectId(id), deletedAt: null });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(200).json({ error: "User not found" });
    }
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

const listUsers = async (req, res) => {
  try {
    const client = await getMongoClient();
    const users = await client.db().collection("users").find({ deletedAt: null }).sort({_id:-1}).toArray();
    res.status(200).json(users);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const input = req. body;
  input.updatedAt = Date.now();
  try {
    const client = await getMongoClient();
    const user = await client
    .db()
    .collection("users")
    .findOneAndUpdate(
      { _id :  ObjectId(id) },
      { $set: input },
      { returnOriginal: false }
    );
    res.status(200).json(user);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const client = await getMongoClient();
      const user = await client
      .db()
      .collection("users")
      .findOneAndUpdate(
        { _id :  ObjectId(id), deletedAt: null },
        { $set: { deletedAt: Date.now() } },
        { returnOriginal: false }
      );
      if (user.value) {
        res.status(200).json({ message: "User has been deleted!" });
      } else {
        res.status(200).json({ error: "User not found" });
      }
      
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  };

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.get("/users", listUsers);
app.post("/users", createUser);
app.get("/users/:id", retrieveUser);
app.patch("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);

module.exports = app;
