const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let equipment = new Schema({
    type: {
        type: String
    },
    id: {
        type: Number
    },
    available: {
        type: Boolean
    },
    lendInfo: {
       staffMemberName: {type:String},
       lendDate: {type: Object},
       expectedReturnDate: {type: Object},
       tssEmployeeName: {type: String}
    }
    
}, {versionKey: false});

module.exports = mongoose.model('equipment', equipment);