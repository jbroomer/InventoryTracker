const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const laptopRoutes = express.Router();
const PORT = 4000;
let Laptops = require('./laptops.model');


app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://eddy:1234@cluster0-shard-00-00-9gkvd.gcp.mongodb.net:27017,cluster0-shard-00-01-9gkvd.gcp.mongodb.net:27017,cluster0-shard-00-02-9gkvd.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})








app.use('/laptops', laptopRoutes);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});