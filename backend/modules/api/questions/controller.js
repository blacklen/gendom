const questionSchema = require("./model");

let create = (data,callback)=>{
    let newQuestion = {
        question: data.question,
        tip: data.tip
    }
    questionSchema.create(newQuestion,(err,data)=>{
        callback(err,data);
    });
};


let findById = (id,callback) =>{
    questionSchema.findById(id,(err,data)=>{
        callback(err,data);
    })
}

let findRandom = (callback) =>{
    try{
        questionSchema.count().exec((err,length)=>{
            if(err) callback(err);
            else{
                questionSchema.findOne().skip(Math.floor(Math.random()*length)).exec((err,data)=>{
                    callback(null,data);
                })
            }
        })
    }catch(ex){
        console.log("Exeption: "+ ex);
    }
}

let vote = (data,callback)=>{
    if(data.bool === 'yes'){
        findById(data.id,(err,data)=>{
            if(err) callback(err);
            questionSchema.findByIdAndUpdate(data.id,{yes:data.yes+1},(err) =>{
                if (err) callback(err);
                else callback(null,"Success");
            })
        })
    }

    else{
        findById(data.id,(err,data)=>{
            if(err) callback(err);
            questionSchema.findByIdAndUpdate(data.id,{no:data.no+1},(err) =>{
                if (err) callback(err);
                else callback(null,"Success");
            })
        })
    }

}


module.exports = {
    create,
    findById,
    vote,
    findRandom
}