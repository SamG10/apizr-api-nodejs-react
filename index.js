const express = require('express');
var cors = require('cors');
const app = express();
const eaux = require('./data.json');
const mysql = require('mysql');
const port = 8080;

// MIDDLEWARE
app.use(express.json());
app.use(cors());

//ROUTES
app.get('/eaux', (req,res) => {
    res.status(200).json(eaux)
});

app.get('/eaux/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const eau = eaux.find(eau => eau.id === id)
    res.status(200).json(eau)
});

    // Database
app.get('/database', (req, res) => {
    const db = mysql.createConnection({
        host: "localhost",
        port: 3308,
        user: "root",
        password: "root",
        database : "pollution",
        insecureAuth : true
    });

    db.connect(function(err) {
        if (err) throw err
        console.log("Connecté à la base de données MySQL!")
    
        db.query("SELECT * FROM ville", function (err, result) {
            if (err) throw err
            console.log(result)
            res.send(result);
        });
    });
});

    // Create 
app.post('/eaux', (req,res) => {
    eaux.push(req.body)
    res.status(200).json(eaux)
});

    // Update
app.put('/eaux/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let eau = eaux.find(eau => eau.id === id)
    eau.beach =req.body.beach,
    eau.water =req.body.water,
    eau.city =req.body.city,
    res.status(200).json(eau)
});

// Delete
app.delete('/eaux/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let eau = eaux.find(eau => eau.id === id) 
    eaux.splice(eaux.indexOf(eau),1)
    res.status(200).json(eaux)
}); 

// server
app.listen(port, () => {
    console.log("Serveur à l'écoute")
});



    
