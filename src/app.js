const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
var cors = require('cors')
let bodyParser = require('body-parser');
let app = express();






//Conecct to DB
mongoose.connect('mongodb://localhost/task-manager-DB')
.then(db => console.log('DB Connected'))
.catch(err => console.log(err));

//Import routes
const indexRoutes = require('./routes/index');

//Settings
app.set('port', process.env.PORT || 8080);


//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use('/', indexRoutes);


//Start server
app.listen(app.get('port'), ()=>{
  console.log('Server on port ' + app.get('port'));
})