const express = require('express');
const router = express.Router();


//Import  controllers
let TaskController = require('../controllers/TaskController');
let StateController = require('../controllers/StateController');

//Request defined

//Task
router.get('/task', TaskController.showTasks);
router.post('/task/:state_id', TaskController.createTask);
router.put('/task/:task_id', TaskController.editTask);
router.put('/task/delete/:task_id', TaskController.deleteTask);


//Task
router.get('/state', StateController.showStates);
router.post('/state', StateController.createState);
router.put('/state/:state_id', StateController.editState);





module.exports = router;