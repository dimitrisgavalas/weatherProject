
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

//catch request when user inputs and send city Name + message send to server
app.post("/",function(req, res){

  const query = req.body.cityName;
  const apiKey = "f294bbd0869ce937d860b5097e9ae490";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&apiid=" + apiKey + "&units=" + unit;

  https.get(url, function(response){
      console.log(response.statusCode);

      response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

        res.write("<p>The weather is currently " + weatherDescription + "</p>");
        res.write("<h1>The temprature in " + query +" is " + temp + "degrees Celsius</h1>")
        res.write("<img src="+ imageURL + ">");
        res.send();
      });
  });
  // //we send at the server the value that was inputed
  // console.log(req.body.cityName);
  //console.log("Post request received.");
});



app.listen(port, function(){
  console.log("Server is running on port 3000");
});
