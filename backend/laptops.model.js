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
    lendInfo: {
        staffMemberName: { type: String },
        lendDate: { type: Object },
        expectedReturnDate: { type: Object },
        tssEmployeeName: { type: String }
    },
    history: [{
        staffMemberName: { type: String },
        lendDate: { type: Object },
        expectedReturnDate: { type: Object },
        actualReturnDate: { type: Date },
        tssEmployeeName: { type: String }
    }]

}, { versionKey: false });

module.exports = mongoose.model('laptops', laptops);