const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    task_ids: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],
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