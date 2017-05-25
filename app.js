const express = require('express');
const http = require("http");
const querystring = require("querystring");
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const weather= require('./routes/weather');

const app = express();

const port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());

app.use('/getweather', weather);

app.get('/', (req,res)=>{
    res.send("Hukazzz v1.002");
});

app.listen(port, () => {
    console.log("Server started on port "+port);
});