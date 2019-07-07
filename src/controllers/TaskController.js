'use-strict';
//Model defined
let Task = require('../models/task');


//Export requests
exports.showTasks = function (req, res) {    
    Task.find({ $where: function() { return this.status == true } }).populate('state').exec(function (err, tasks) {
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
    if(req.body.name != ''){
        let task = new Task({
            name: req.body.name,
            description: req.body.description,
            estimate: req.body.estimate,
            state: req.body.state,
            created_at: new Date(),
            updated_at: new Date(),
            status: true
        });
        task.save();
        res.send({status: "ok"});
    }else{
        return res.send({"error": true})
    }
    
}

exports.editTask = function (req, res) {
    let task_id = req.params.id;
    if(req.body.name != ''){
        Task.findById(task_id,function (err,task) {
            if(err){
                return res.send({"error": true})
            }
            else if(task){
                task.name = req.body.name;
                task.description = req.body.description;
                task.estimate= req.body.estimate;
                task.state= req.body.state;
                task.updated_at = new Date();
                task.save();
                res.send({status: "ok"});
            }
        });
    }else{
        return res.send({"error": true})
    }
    
};

exports.deleteTask = function (req, res) {
    let task_id = req.params.id;
    Task.findById(task_id,function (err,task) {
        if(err){
            return res.send({"error": true})
        }
        else if(task){
            task.status = false;
            task.updated_at = new Date();
            task.save();
            res.send({status: "ok"});
        }
    });
};
