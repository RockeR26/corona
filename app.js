// Importing the  package 
const express=require("express");
const app=express();
const body=require("body-parser");
const request = require("request");

//using the packages 
app.use(body.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));
var items ={
    Name:["(Demo-Name)"],
    City:["(Demo-city)"]
};
// corona count
var data = [];
const data2=[];
   // API endpoint to which the http 
    // request will be made 
    const url = "x"; 

    // HTTP request 
    request(url,function (error, response, body)  { 

        // Error - Any possible error when 
        // request is made. 

        // Eesponse - HTTP response status codes 
        // indicate whether a specific HTTP 
        // request has been successfully completed 

        // body - response data 

        // 200 - successful response 
        if (!error && response.statusCode == 200) { 

            // The response data will be in string 
            // Convert it to Object. 
            body = JSON.parse(body); 

            // The data have lot of extra properties 
            // We will filter it 
            for (let i = 0; i < body.statewise.length; i++) { 
                data.push({ 
                    State: body.statewise[i].state, 

                    Confirmed: body.statewise[i].confirmed, 

                    Active: body.statewise[i].active, 

                    Recovered: body.statewise[i].recovered, 

                    Death: body.statewise[i].deaths 
                }); 
            } 
            for(let j=body.cases_time_series.length-30;j<body.cases_time_series.length;j++){
                data2.push({
                    date:body.cases_time_series[j].date,

                    totalconfirmed:body.cases_time_series[j].totalconfirmed,

                    totalrecovered:body.cases_time_series[j].totalrecovered,

                    totaldeceased:body.cases_time_series[j].totaldeceased,
                });
            }
        } 
    });

//Get main page 
app.get("/",function(req,res){ 
    res.render("index",{data:data,date:date});

});

// get add page
app.get("/add",function(req,res){
    console.log("inside get")
    res.render("list",{item:items,date:date});
});

// post add page
app.post("/add",function(req,res){
        items.Name.push(req.body.name);
        items.City.push(req.body.city);
        res.render("list",{item:items,date:date});
});

app.get("/api",function(req,res){
    res.json({
        d:data2
    }); 
});
    

//getting the date
let date = new Date()
let options={
    day:"numeric",
    month:"short",
    year:"numeric",
    weekday:"short"
};
date=date.toLocaleDateString("hi-IN",options);

app.listen(process.env.PORT||8000,function(){
    console.log("app is running");
});
