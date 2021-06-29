const express = require("express");
const path = require("path");
const app = express();

const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true }, { useUnifiedTopology: true });

const port = 626;

// DEFINE MONGOOSE SCHEMA
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

var Contact = mongoose.model('Contact', contactSchema);

//  EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))        // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug')       // set the template engine as pug
app.set('views', path.join(__dirname, 'views'))         // set the view directory   


// ENDPOINTS
app.get('/', (req, res) => {
    const params = { }
    res.status(200).render('home.pug', params);    
})
app.get('/contact', (req, res) => {
    const params = { }
    res.status(200).render('contact.pug', params);    
})

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database")
        // res.send(alert("This item has been saved to the database"))
    }).catch(() => {
        res.status(400).send("This item was not saved to the database") 
        // res.status(400).send(alert("This item was not saved to the database"))
    });

    // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on ${port}`);
})