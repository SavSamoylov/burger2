const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const exphbs  = require('express-handlebars');

let routes = require("./controllers/burger-controllers.js")
var db = require("./models");

let app = express();
const PORT = process.env.PORT || 3000;

console.log("Server Connected")

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))

app.use(methodOverride('_method'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use("/", routes);

db.sequelize.sync({force:true})
            .then(function(){
              app.listen(PORT, ()=>{
                console.log("Server started on PORT: %s", PORT)
              })
            })
