'use-strict';
//Model defined
let Task = require('../models/task');
let State = require('../models/state');


//Export requests
exports.showTasks = function (req, res) {    
    Task.find({ $where: function() { return this.status == true } }).exec(function (err, tasks) {
        if(err)
            return res.send({"error": true})
        else
            res.send({
                status: "ok",
                data: tasks
            });
    })
}

exports.createTask = function (req, res) {
    let state_id = req.params.state_id; 
    State.findById(state_id, function (err,state) {
        if(err){
            return res.send({"error": true})
        }
        else if(state){
            if(req.body.name != ''){
                let task = new Task({                    
                    name: req.body.name,
                    description: req.body.description,
                    estimate: req.body.estimate,
                    created_at: new Date(),
                    updated_at: new Date(),
                    status: true
                });
                
                task.save(function(err, task){
                    console.log(task)
                    if(err){
                        res.send({"error": true})
                    }
                    else{
                        state.task_ids.push(task._id);
                        state.update_date = new Date();
                        state.save();
                        res.send({status: "ok"});
                    }
                });
            }else{
                return res.send({"Invalid request": true})
            }
        }
    });    
}

exports.editTask = function (req, res) {
    let task_id = req.params.task_id;
    let old_state_id = req.body.old_state_id;   
    let new_state_id = req.body.new_state_id;
    State.findById(old_state_id, function (err, superState) {
        if(err){
            return res.send({"error": true})
        }
        else{
            if(superState){
               Task.findById(task_id,function (err, task) {
                    if(err){
                        return res.send({"error": true})
                    }
                    else if(task){
                        if(req.body.name != ''){
                            task.name = req.body.name;
                            task.description = req.body.description;
                            task.estimate= req.body.estimate;
                            task.updated_at = new Date();
                            if(old_state_id == new_state_id){
                                task.save();
                                res.send({status: "ok"});
                            }else{
                                index = superState.task_ids.indexOf(task._id);
                                superState.task_ids.splice(index,1);
                                superState.update_date = new Date();
                                superState.save();
    
                                State.findById(new_state_id, function (err, childState) {
                                    if(err){
                                        return res.send({"error": true})
                                    }
                                    else if(superState){
                                        childState.task_ids.push(task._id);
                                        childState.update_date = new Date();
                                        childState.save();
                                        res.send({
                                            status: "ok",
                                            data: task
                                        });
                                    }
                                })
                            }
                        }
                    }
                });            
            }else{
                return res.send({"message": "Invalid request"})
            }
        }
    })
}

exports.deleteTask = function (req, res) {
    let task_id = req.params.task_id;
    let state_id = req.body.state_id;
    State.findById(state_id, function (err, state) {
        if(err){
            return res.send({"error": true})
        }
        else{
            Task.findById(task_id,function (err,task) {
                if(err){
                    return res.send({"error": true})
                }
                else if(task){
                    index = state.task_ids.indexOf(task._id);

                    task.status = false;
                    task.updated_at = new Date();
                    task.save();

                    state.task_ids.splice(index,1);
                    state.update_date = new Date();
                    state.save();

                    res.send({status: "ok"});
                }
            });
        }
    })
};


/*

                         if(req.body.name != ''){
                        task.name = req.body.name;
                        task.description = req.body.description;
                        task.estimate= req.body.estimate;
                        task.updated_at = new Date();
                        if(state_id == new_state_id){
                            task.save();
                            res.send({status: "ok"});
                        }else{
                            index = superState.task_ids.indexOf(task._id);
                            superState.task_ids.splice(index,1);
                            superState.update_date = new Date();
                            superState.save();

                            State.findById(new_state_id, function (err, childState) {
                                if(err){
                                    return res.send({"error": true})
                                }
                                else if(superState){
                                    childState.task_ids.push(task._id);
                                    childState.update_date = new Date();
                                    childState.save();
                                    res.send({status: "ok"});
                                }
                            })
                        }
*/