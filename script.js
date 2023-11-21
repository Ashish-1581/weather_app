

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

var name = "Default";
var temp = "14";
var weatherDescription = " cloudy";
var humidity = "60";
var speed = "6.2";
var ic = "04d"




const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    var icon = "http://openweathermap.org/img/wn/" + ic + "@2x.png";

    res.render("list", { city: name, temp: temp, description: weatherDescription, humidity: humidity, wind: speed, icon: icon });
});


app.post("/", function (req, res) {

    const query = (req.body.cityName);

    
    
    const url = ("https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=154f93888149a078f5d42ea0484d35ba&units=metric")
    

    https.get(url, function (response) {
    

        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            name = weatherData.name;
            temp = weatherData.main.temp;
            weatherDescription = weatherData.weather[0].description;
            humidity = weatherData.main.humidity;
            speed = weatherData.wind.speed;
            ic = weatherData.weather[0].icon;
            console.log(name, temp, weatherDescription, humidity, speed);
        

            res.redirect("/");


        
       



        })
    })



})







app.listen(3000, function () {
    console.log("Server is running on port 3000.");
})