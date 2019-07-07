const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    estimate: {
        type: Number
    },
    state: {
        type: Schema.Types.ObjectId,
        ref: 'State'
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

module.exports = mongoose.model('Task', TaskSchema)