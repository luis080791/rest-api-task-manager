const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StateSchema = new Schema({
    code:{
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('State', StateSchema)