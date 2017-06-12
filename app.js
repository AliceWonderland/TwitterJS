const express=require('express');
const app=express();

app.listen(3000,function () {
    console.log("Listening on port 3000...");
});

app.get("/",function (request,response,next) {
    response.send("My Response, Hi!");
});

app.get("/news",function (request,response,next) {
    response.send("I'm in NEWS, Hi!");
});

