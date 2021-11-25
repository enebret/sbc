var express = require('express');
var app = express();

function duplicates (x,y){
    const index
    for(i=0; i<x.length; i++){
        if(x[y]){
             
            return index = x.indexOf(y)
        }else if (x[y]==-1){
           const div = y/2;
           if(!Number.isInteger(div)){
               return index = 1
           }else{
               return index = 2
           }
        }
    }
}

app.get("/duplicates", (res)=>{
    res.send(duplicates())
})