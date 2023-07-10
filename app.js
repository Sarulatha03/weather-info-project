const express = require("express");
const https = require("https");
const date = require(__dirname + "/date.js");

const app = express();
const temp="";
const todaydate = date.getDate();
const weatherDesc = "Search for Temperature";
const query = "";
const imgurl = "https://cdn.iconscout.com/icon/free/png-256/sunny-weather-1-458138.png";

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req,res){



    res.render("index",{temp1 : temp, date1 : todaydate, des :weatherDesc, place: query, img: imgurl});
    //console.log(url);
    //res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){

    const query = req.body.cityName
    const apikey = "3b56d1a58ba0538c848cea777217cbb0"
    const unit = "metric"
    let url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units=" +unit;
   // console.log(url);
    https.get(url , (response) =>{
        console.log(response.statusCode);

        response.on("data", (data) =>{
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const temperature1 = temp + "° C"
            const weatherDesc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imgurl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
            
            res.render("index",{temp1 : temperature1, date1 : todaydate, des :weatherDesc , place: query, img: imgurl});
        
            //  res.write("<h1>The temperature in " +query+ " is " + temp +"</h1>");
            //  res.write("<p>The Weather is currently " + weatherDesc +"</p>");
            
            //  res.write("<img src="+imgurl+">"); 
            // res.send();
            
        })
    }) 

})

app.get("/ok", function(req, res){

             res.write("<h1>The temperature in " +query+ " is " + temp +"</h1>");
             res.write("<p>The Weather is currently " + weatherDesc +"</p>");
            
             res.write("<img src="+imgurl+">"); 
             res.send();
})
app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})
