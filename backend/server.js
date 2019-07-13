const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const LaptopRoutes = express.Router();
const EquipmentRoutes = express.Router();

const PORT = 4000;
let Laptop = require('./laptops.model');
let Equipment = require('./equipment.model');


app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://eddy:1234@cluster0-shard-00-00-9gkvd.gcp.mongodb.net:27017,cluster0-shard-00-01-9gkvd.gcp.mongodb.net:27017,cluster0-shard-00-02-9gkvd.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})


//Retrieve all laptops in laptops collection. Used in LoadLaptopData.js.
LaptopRoutes.route('/').get(function(req, res) {
    Laptop.find(function(err, laptops) {
        if (err) {
            console.log(err);
        } else {
            res.json(laptops);
        }
    });
});

//Retrieve laptop by id in laptops collection.
LaptopRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Laptop.findById(id, function(err, laptop) {
        res.json(laptop);
    });
});

//Add laptop with parameters outlined in laptops.models.js.
LaptopRoutes.route('/add').post(function(req, res) {
    let laptop = new Laptop(req.body);
    laptop.lendInfo = null;
    laptop.save()
        .then(laptop => {
            res.status(200).json({'laptop': 'laptop added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new laptop failed');
        });
});

//Remove laptops by id
LaptopRoutes.route('/remove/:id').post(function(req, res) {
    Laptop.deleteOne({ "_id" : req.params.id })
        .then(laptop => {
            res.status(200).json({'laptop': 'laptop removed successfully'});
        })
        .catch(err => {
            res.status(400).send('removing laptop failed');
        });
});

//Update laptop by id,used when someone reserves a laptop. Used in ReserveLaptopForm.js.
LaptopRoutes.route('/update/:id').post(function(req, res) {
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
LaptopRoutes.route('/return/:id').post(function(req, res) {
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




//Retrieve all equipment in equipment collection. Used in LoadEquipmentData.js.
EquipmentRoutes.route('/').get(function(req, res) {
    Equipment.find(function(err, equipment) {
        if (err) {
            console.log(err);
        } else {
            res.json(equipment);
        }
    });
});

//Retrieve equipment by id in equipment collection.
EquipmentRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Equipment.findById(id, function(err, equipment) {
        res.json(equipment);
    });
});

//Add equipment with parameters outlined in equipment.models.js.
EquipmentRoutes.route('/add').post(function(req, res) {
    let equipment = new Equipment(req.body);
    equipment.lendInfo = null;
    equipment.save()
        .then(equipment => {
            res.status(200).json({'equipment': 'equipment added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new equipment failed');
        });
});

//Remove equipment by id
EquipmentRoutes.route('/remove/:id').post(function(req, res) {
    Equipment.deleteOne({ "_id" : req.params.id })
        .then(equipment => {
            res.status(200).json({'equipment': 'equipment removed successfully'});
        })
        .catch(err => {
            res.status(400).send('removing equipment failed');
        });
});

//Update equipment by id,used when someone reserves a equipment. Used in ReserveEquipmentForm.js.
EquipmentRoutes.route('/update/:id').post(function(req, res) {
    Equipment.findById(req.params.id, function(err, equipment) {
        if (!equipment)
            res.status(404).send("data is not found");
        else
        equipment.lendInfo.staffMemberName = req.body.staffMemberName;
        equipment.lendInfo.lendDate = req.body.lendDate;
        equipment.lendInfo.expectedReturnDate = req.body.expectedReturnDate;
        equipment.lendInfo.tssEmployeeName = req.body.tssEmployeeName;
        equipment.available = false;

            equipment.save().then(equipment => {
                res.json('Equipment updated!');
                console.log(equipment.lendInfo.staffMemberName);
                console.log(equipment.lendInfo.lendDate);
                console.log(equipment.lendInfo.expectedReturnDate);
                console.log(equipment.lendInfo.tssEmployeeName);
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

//Updates equipment by id, used when someone returns a checked out equipment. Used in CheckedOutEquipment.js.
EquipmentRoutes.route('/return/:id').post(function(req, res) {
    Equipment.findById(req.params.id, function(err, equipment) {
        if (!equipment)
            res.status(404).send("data is not found");
        else
        equipment.available = true;
        equipment.lendInfo = null;
            equipment.save().then(equipment => {
                res.json('Equipment returned!');

            })
            .catch(err => {
                res.status(400).send("Return not possible");
            });
    });
});


app.use('/laptops', LaptopRoutes);
app.use('/equipment', EquipmentRoutes);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});