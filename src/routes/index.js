const express = require('express');
const router = express.Router();


//Import  controllers
let TaskController = require('../controllers/TaskController');
let StateController = require('../controllers/StateController');

//Request defined

//Task
router.get('/task', TaskController.showTasks);
router.post('/task', TaskController.createTask);
router.put('/task/:id', TaskController.editTask);
router.put('/task/delete/:id', TaskController.deleteTask);


//Task
router.get('/state', StateController.showStates);
router.get('/state/array', StateController.createArrayStates);
router.post('/state', StateController.createState);
router.put('/state/:id', StateController.editState);
router.put('/state/delete/:id', StateController.deleteState);





module.exports = router;