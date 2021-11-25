var express = require('express');
var app = express();

const annagrams = ['ate', 'map', 'eat', 'pat', 'tea' , 'tap']
const ea = []
const ap = []
const at = []
const all = []
for(i=0; i<annagrams.length; i++){
    if(annagrams[i].match(/ea/g)){
        ea.push(annagrams[i])
    }else if(annagrams[i].match(/ap/g)){
       ap.push(annagrams[i])
    }else if(annagrams[i].match(/ate/g)){
        at.push(annagrams[i])
     }
}
all.push(ea,ap,at)
//console.log(all.toString())

app.get("/result", (res)=>{
    res.send(all.toString())
})