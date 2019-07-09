const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let laptops = new Schema({
    brand: {
        type: String
    },
    model: {
        type: String
    },
    year: {
        type: String
    },
    available: {
        type: Boolean
    },
    
}, {versionKey: false});

module.exports = mongoose.model('laptops', laptops);