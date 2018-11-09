const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();


//Body parser is used to grab data from input forms

app.use(bodyParser.urlencoded({extended: false}));

//This will only return a single file//
    // app.get('/', (req, res) => {
        
    //     res.sendFile(path.join(__dirname, '../public/index.html'));

    // });

    //This will return any files in the public folder



app.post('/submit', (req, res, next) => {

    //This will grab the JSON file and load it into a variable.  Then it will push the input from the submit form and write out the file to disk
    let data = fs.readFileSync(path.join(__dirname, '../data.json'))
    let json = JSON.parse(data);
    console.log(data)

    let email = req.body.email;
    let pw = req.body.password;
    let obj1 = {
        Email: email,
        Password: pw
    }
    json.users.push(obj1)

    fs.writeFile(path.join(__dirname, '../data.json'), JSON.stringify(json), 'utf-8')

    res.send('Form Submitted!')
    
})

app.use('/formsubmissions', (req, res) => {

    let data = fs.readFileSync(path.join(__dirname, '../data.json'))
    let json = JSON.parse(data);
    console.log(json)
    res.send(json)
    

})
    


//THis makes all files in the public folder available for the browser
app.use(express.static(path.join(__dirname, '../public')));




app.listen(3000);