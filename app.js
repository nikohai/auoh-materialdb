// npm install express
// npm install init
// npm istall nodemon
// npm install mongoose
// npm run start-dev

const express = require('express');
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const app = express();

const body_parser = require('body-parser');

const material_controller = require('./material_controller');
app.use(body_parser.json());  //req.body.name

app.use(body_parser.urlencoded({
    extended:true
})); //material/id

app.use(  (req, res, next)=>{
    console.log(req.method, ' ', req.path);
    next();
}); // GET /api/materials

// RESTful
// CRUD OPERATIONS

//CREATE
app.post("/api/material", material_controller.api_post_material);


//READ
app.get("/api/materials", material_controller.api_get_materials);

//UPDATE

//DELETE
app.delete("/api/material/:id", material_controller.api_delete_material);

const database_uri = "mongodb+srv://server:QHRvDRhu4jK318zz@cluster0-tuqpv.mongodb.net/materialdb?retryWrites=true&w=majority";

mongoose.connect(database_uri, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(()=>{
    console.log('database connected');
    app.listen(port);
}).catch((err => {
    console.log(err);
}));
// QHRvDRhu4jK318zz

