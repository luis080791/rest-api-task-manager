'use-strict';
//Model defined
let State = require('../models/state');


//Export requests
exports.showStates = function (req, res) {    
    State.find(  { $where: function() { return this.status == true } } ).exec(function (err, states) {
        if(err)
            return res.send({"error": true})
        else
            res.send({
                status: "ok",
                data: states
            });
    })
}

exports.createArrayStates = function (req, res) {

    let state;
    State.find( { $where: function() { return this.status == true } } ).exec(function (err, states) {
        
        if(err)
            return res.send({"error": true})
        else{
            if(states.length == 0){
                state =  new State({
                    code: 1,
                    name: 'Planned',
                    created_at: new Date(),
                    updated_at: new Date(),
                    status: true
                });
                state.save();
                
                state =  new State({
                    code: 2,
                    name: 'In progress',
                    created_at: new Date(),
                    updated_at: new Date(),
                    status: true
                });
                state.save();
                
                state =  new State({
                    code: 3,
                    name: 'Completed',
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


exports.createState = function (req, res) {

    State.find( { $where: function() { return this.status == true }  }  ).exec(function (err, states) {
        if(err)
            return res.send({"error": true})
        else{
            if(states.length <= 2){
                let state = new State({
                    code: req.body.code,
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
    let state_id = req.params.id;
    console.log(state_id)
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
    let state_id = req.params.id;
    State.findById(state_id,function (err,state) {
        if(err){
            return res.send({"error": true})
        }
        else if(state){
            state.status = false;
            state.updated_at = new Date();
            state.save();
            res.send({status: "ok"});
        }
    });

};
