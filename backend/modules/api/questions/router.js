const express = require("express");
const router = express.Router();

const questionController = require("./controller");

router.get("/",(req,res)=>{
    questionController.findRandom((err,doc)=>{
        if(err) console.log(err);
        else res.send(doc);
    })
})

router.post('/',(req,res)=>{
    questionController.create(req.body, (err,doc)=>{
        if(err) console.log(err);
        else res.send(doc);
    })
})

router.put("/vote",(req,res) =>{
    questionController.vote(req.body,(err)=>{
        console.log(err);
    })
})

module.exports = router;