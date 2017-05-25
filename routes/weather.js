const express = require('express');
const querystring = require("querystring");
const http = require("http");
const router = express.Router();

router.post('/value',(req,res1,next)=>{
    let vars;
    let jsonres;
    console.log(req.body.lat);
    console.log(req.body.long);    

    var q=req.body.lat+","+req.body.long;

    var baseurl = " http://api.worldweatheronline.com/premium/v1/weather.ashx";

    var options = {
        q: q,
        num_of_days: '1',
        format: 'json',
        key: 'c94b8fcd9a0c443989a155145172405'
    };

    var query = querystring.stringify(options);
    var url = baseurl + "?" + query;

    http.get(url, function(res) {
        if(res.statusCode == 200) {
            console.log("Got response: " + res.statusCode);
            res.setEncoding('utf8');

            var output = '';
            res.on('data', function (chunk) {
                output += chunk;
            });

            res.on('end', function () {
                var jsonres = JSON.parse(output)
                if(jsonres.data.hasOwnProperty('error'))
                    console.log(err); 
                else {
                    var vars = 
                    {
                        location: jsonres.data.request[0].query,
                        date: jsonres.data.weather[0].date,
                        temp: jsonres.data.current_condition[0].temp_C,
                        weatherDesc: jsonres.data.current_condition[0].weatherDesc[0].value,
                        tempMaxC: jsonres.data.weather[0].tempMaxC,
                        tempMinC: jsonres.data.weather[0].tempMinC,
                        cloudcover: jsonres.data.current_condition[0].cloudcover,
                        humidity: jsonres.data.current_condition[0].humidity,
                        observation_time: jsonres.data.current_condition[0].observation_time,
                        precipMM: jsonres.data.current_condition[0].precipMM,
                        pressure: jsonres.data.current_condition[0].pressure,
                        visibility: jsonres.data.current_condition[0].visibility,
                        winddir16Point: jsonres.data.weather[0].winddir16Point,
                        winddirDegree: jsonres.data.weather[0].winddirDegree,
                        windspeed: jsonres.data.weather[0].windspeedKmph,
                        icon: jsonres.data.current_condition[0].weatherIconUrl[0].value
                    }; 
                    console.log(vars);  
                    res1.json(vars);                   
                }
            });
        } else
            console.log(res.statusCode);
    }) 

});

module.exports = router;