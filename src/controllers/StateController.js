'use-strict';
//Model defined
let State = require('../models/state');


//Export requests
exports.showStates = function (req, res) {    
    State.find({ $where: function() { return this.status == true } }).populate('task_ids').exec(function (err, states) {
        if(err)
            return res.send({"error": true})
        else
            res.send({
                status: "ok",
                data: states
            });
    })
}
exports.createState = function (req, res) {
    State.find( { $where: function() { return this.status == true }  }  ).exec(function (err, states) {
        if(err)
            return res.send({"error": true})
        else{
            if(states.length <= 2){
                let state = new State({
                    name: req.body.name,
                    created_at: new Date(),
                    updated_at: new Date(),
                    status: true
                });
                state.save();
                res.send({status: "ok"});
            }else{
                return res.send({"error": "For this moment it is imposible create another state."})
            }
        }           
    })    
}

exports.editState = function (req, res) {
    let state_id = req.params.state_id;
    State.findById(state_id, function (err,state) {
        if(err){
            return res.send({"error": true})
        }
        else if(state){
            state.name = req.body.name;
            state.updated_at = new Date();
            state.save();
            res.send({status: "ok"});
        }
    });
};

exports.deleteState = function (req, res) {
    let state_id = req.params.state_id;
    State.findById(state_id,function (err,state) {
        if(err){
            return res.send({"error": true})
        }
        else if(state){
            state.status = false;
            state.updated_at = new Date();
            state.save();
            state.send({status: "ok"});
        }
    });
};