const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const app = express();
const questionRouter = require('./modules/api/questions/router');

app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(__dirname + "/public"));

app.use("/api/questions",questionRouter);

app.get('/', (req,res) => {
    res.sendFile('./public/index.html');
})
mongoose.connect("mongodb://admin:admin123@ds237641.mlab.com:37641/question", err => {
  if (err) console.error(err);
  else console.log("Database connect successful");
});

const port = process.env.port || 6969;

app.listen(port, err => {
  if (err) console.log(err);
  console.log("Server started at port " + port);
});