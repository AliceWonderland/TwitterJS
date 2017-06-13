const chalk=require('chalk');
const express=require('express');
const nunjucks=require('nunjucks');
const app=express();

app.listen(3000,function () {
    console.log("Listening on port 3000...");
});

app.use(function (request,response,next) {
    // console.log("response",response);
    console.log(request.baseUrl);
    console.log(request.body);
    console.log(request.hostname);
    console.log(request.ip);
    console.log("ORIGURL==>",request.originalUrl);
    console.log("DIR==> ",request.path);
    console.log("URL==> ",request.url);
    console.log("PARAMS==> ",request.params);
    console.log("PROTOCOL==> ",request.protocol);
    console.log("QUERY==> ",request.query);
    console.log("ROUTE==>",request.route);
    console.log("METHOD==> ",request.method);
    console.log("STATUSCODE==> ",response.statusCode);
    
    console.log(chalk.magenta(request.method)," ",chalk.cyan(request.path)," ",response.statusCode);
    next();
});

app.use("/special",function (request,response,next) {
    response.send("I'm in SPECIAL, Hi!");
    next();
});

// app.get("/",function (request,response,next) {
//     response.send("My Response, Hi!");
// });
//
// app.get("/news",function (request,response,next) {
//     response.send("I'm in NEWS, Hi!");
// });



//NUNJUCKS
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
// nunjucks.configure('views'); // point nunjucks to the proper directory for templates
nunjucks.configure("views",{noCache:true});

var locals={
    title:"My Title",
    desc:"My Desc",
    people:[
        {name:"Gandalf"},
        {name:"Frodo"},
        {name:"Hermione"}
    ]
};
const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];

app.get("/",function (request,response,next) {
    response.render("index.html",locals,function(err,output){
        response.send(output);
    });
    // response.render( 'index', {title: 'Hall of Fame', people: people} );
});



