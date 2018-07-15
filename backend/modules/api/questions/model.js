const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionModel = new Schema({
    question: {type: String, require: true},
    tip: {type: String},
    no: {type: Number,default: 0},
    yes : {type: Number,default: 0}
},{
    timestamps: true
});

module.exports = mongoose.model("question", questionModel);