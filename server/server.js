const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
const port = 3000;


 
app.post('/login', (req, res) => {
    //console.log(req.body.email, req.body.password);
    
    if(req.body.email === 'bartwood@gmail.com' && req.body.password === 'supersecret'){
        // Create a JWT
        const jwtExpiration = Date.now() + (1000 * 60 * 60 * 24); // x minute(s)
 
        var token = jwt.sign({ 
            email: req.body.email,
            exp: Math.floor(jwtExpiration / 1000)
        }, 'shhhhh');

        res.cookie('Auth', token, {expires: new Date(jwtExpiration)});

        res.send('Success ' + token);
    }
    else {
        res.status(401).send('Authentication failed');
    }
});

// This is the security middleware layer
app.use((req, res, next) => {
    if(!req.cookies.Auth){
        res.status(403).send('Redirect to login - no Auth cookie');
    }
    else {
        try {
            jwt.verify(req.cookies.Auth, 'shhhhh');
            next();
        }
        catch(err){
            res.status(403).send('Redirect to login - Auth cookie not verified');
        }
    }
});

//app.get('/', (req, res) => res.send('Hello World!'));

app.get('/test', (req, res) => {
    res.send('Test ran succesfully');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));