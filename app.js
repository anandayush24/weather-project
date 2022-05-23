const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/temp", function(req,res){
    const city = req.body.cityName;
    const appKey = "e370f6e9d319d9bf90df38c0240b28f1";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+units+"&appid="+appKey;
    https.get(url, function(response){
        console.log(response);
        response.on("data", function(data){
            var weatherdata = JSON.parse(data);
            console.log(weatherdata);

            const temp = weatherdata.main.temp;
            const description = weatherdata.weather[0].description;
            console.log(temp);
            console.log(description);
            res.write("Weather Description: " + description+". ");
            res.write("The temprature in "+city+" is "+ temp +" degree Celcius");
            // res.send("<h1>Weather Description: " + description + ". </h1><br><h2>The temprature in " + city + " is " + temp + " degree Celcius</h2");

        });      
     });
});

app.listen(3000, function(){
    console.log("Server is running on port-3000");
});