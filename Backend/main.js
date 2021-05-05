const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');
const app = express();
const API_Router = require('./routers/ApiRouter');
const DB = require('./Database/DBConnection');

//Server Configurations 

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
const port = 3000;

//DB Connection 
db = new DB();
db.connect().then(() => { if (db.connected) return }).then(() => {
    app.listen(port, () => {
        console.log(`Server is up on port ${port} `)
    })
});


//middleware
app.use(cors(corsOptions));
//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//routers 
app.use('/api', API_Router);

//static file configurations 
const imagesPath = path.join(__dirname, './uploads/');
app.use(express.static(path.join(__dirname, './uploads/')));