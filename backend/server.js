const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const laptopRoutes = express.Router();
const PORT = 4000;
let Laptop = require('./laptops.model');


app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://eddy:1234@cluster0-shard-00-00-9gkvd.gcp.mongodb.net:27017,cluster0-shard-00-01-9gkvd.gcp.mongodb.net:27017,cluster0-shard-00-02-9gkvd.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})


//Retrieve all laptops in laptops collection. Used in LoadLaptop.js.
laptopRoutes.route('/').get(function(req, res) {
    Laptop.find(function(err, laptops) {
        if (err) {
            console.log(err);
        } else {
            res.json(laptops);
        }
    });
});

//Retrieve laptop by id in laptops collection.
laptopRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Laptop.findById(id, function(err, laptop) {
        res.json(laptop);
    });
});

//Add laptop with parameters outlined in laptops.models.js.
laptopRoutes.route('/add').post(function(req, res) {
    let laptop = new Laptop(req.body);
    laptop.save()
        .then(laptop => {
            res.status(200).json({'laptop': 'laptop added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new laptop failed');
        });
});

//Remove laptops by id
laptopRoutes.route('/remove/:id').post(function(req, res) {
    Laptop.deleteOne({ "_id" : req.params.id })
        .then(laptop => {
            res.status(200).json({'laptop': 'laptop removed successfully'});
        })
        .catch(err => {
            res.status(400).send('removing laptop failed');
        });
});

//Update laptop by id,used when someone reserves a laptop. Used in ReserveLaptopForm.js.
laptopRoutes.route('/update/:id').post(function(req, res) {
    Laptop.findById(req.params.id, function(err, laptop) {
        if (!laptop)
            res.status(404).send("data is not found");
        else
        laptop.lendInfo.staffMemberName = req.body.staffMemberName;
        laptop.lendInfo.lendDate = req.body.lendDate;
        laptop.lendInfo.expectedReturnDate = req.body.expectedReturnDate;
        laptop.lendInfo.tssEmployeeName = req.body.tssEmployeeName;
        laptop.available = false;

            laptop.save().then(laptop => {
                res.json('Laptop updated!');
                console.log(laptop.lendInfo.staffMemberName);
                console.log(laptop.lendInfo.lendDate);
                console.log(laptop.lendInfo.expectedReturnDate);
                console.log(laptop.lendInfo.tssEmployeeName);
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

//Updates laptop by id, used when someone returns a checked out laptop. Used in CheckedOutLaptop.js.
laptopRoutes.route('/return/:id').post(function(req, res) {
    Laptop.findById(req.params.id, function(err, laptop) {
        if (!laptop)
            res.status(404).send("data is not found");
        else
        laptop.available = true;
        laptop.lendInfo = null;
            laptop.save().then(laptop => {
                res.json('Laptop returned!');

            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


app.use('/laptops', laptopRoutes);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});