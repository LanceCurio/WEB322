/********************************************************************************

* WEB322 – Assignment 04

* 

* I declare that this assignment is my own work in accordance with Seneca's

* Academic Integrity Policy:

* 

* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html

* 

* Name: Lance Curio Student ID: 104319223 Date: 2023-11-10

*

* Published URL: 

*

********************************************************************************/
const legoData = require("./modules/legoSets");
const express = require('express');
const app = express();
const path = require("path");
app.set('view engine', 'ejs');  
const HTTP_PORT = process.env.PORT || 3000; // assign a port

app.use(express.static(path.join(__dirname,"public")));

app.use((req,res,next) =>{
  app.locals.route = req.path;
  next();
});

app.get("/", (req, res) => {
    res.render("home");
  });

app.get("/about", (req, res) => {
    res.render("about");
  });

app.get('/lego/sets', async (req, res) =>{
 if(req.query.theme){
    legoData.getSetsByTheme(req.query.theme).then((data =>{res.render("sets", {sets: data});
    })) .catch((err) => {
    res.status(404).render("404", {message: "I'm sorry, theme does not exist"});
    });
  }
 else{
  legoData.getAllSets()
  .then((data) => {
    res.render("sets", {sets: data});
  })
  .catch((err) => {
    res.status(404).render("404", {message: "I'm sorry, theme does not exist"});
  });
 }
});

app.get("/lego/sets/:setNum", (req, res) =>{
  legoData.getSetByNum(req.params.setNum).then((data=>{
    res.render("set", {set:data});
})).catch(err=>{
    res.status(404).render("404", { message: "I'm sorry, product does not exist"});
});
});

app.use((req, res, next) => {
  res.status(404).render("404", { message: "I'm sorry, we're unable to find what you're looking for"});
});

legoData.initialize()
.then(() => app.listen(HTTP_PORT, () => console.log(`Server listening on ${HTTP_PORT}`)))
.catch((error) => console.error(`Failed to connect on ${HTTP_PORT}`));
  