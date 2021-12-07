/* 
* WEB322 – Project (Fall 2021) 
* I declare that this assignment is my own work in accordance with Seneca Academic 
* Policy. No part of this assignment has been copied manually or electronically from 
* any other source (including web sites) or distributed to other students. 
* 
* Name: Smit Shah
* Student ID: 116605205
* Course/Section: WEB322 ZAA
* 
* ## Project URLs
* GitHub Repository: https://github.com/Smit681/Assignment-5
* Heroku URL: https://web-322-assignment-5.herokuapp.com/
************************************************************************************/

const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const path = require("path");

// Set up dotenv environment variables.
dotenv.config({path: "./config.env"});

// Set up express
const app = express();

// Set up a static folder
app.use(express.static("public"));

// Set up body-parser
app.use(express.urlencoded({extended:false}));

//Set up file-uploads
app.use(fileUpload());

// Set up handlebars
app.engine('.hbs', exphbs({ 
    extname: '.hbs',
    defaultLayout: "main"
}));

app.set('view engine', '.hbs');

// Set up express-session
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    // res.locals.user is a global handlebars variable.
    // This means that every single handlebars file can access this variable.
    res.locals.user = req.session.user;
    if(req.session.dashbord == "Data Entry Clerk")
        res.locals.dashbord = true;
    else
        res.locals.dashbord = false;
    next();
});

// Set up routes/controllers
const generalController = require("./controllers/general");
const userController = require("./controllers/user");
const kitController = require("./controllers/kit");
const loadDataController = require("./controllers/load-data");

app.use("/", generalController);
app.use("/user/", userController);
app.use("/kit/",kitController);
app.use("/load-data/", loadDataController);

// Set up and connect to MongoDB
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to the MongoDB database.");
})
.catch((err) => {
    console.log(`There was a problem connecting to MongoDB ... ${err}`);
});

// Start up express web server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Web server started on port ${PORT}.`);
})