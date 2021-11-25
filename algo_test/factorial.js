var express = require('express');
var app = express();

const number = 13
let fact = 1;
    for (i = 1; i <= number; i++) {
        fact *= i;
    }

app.get("/factorial", (res)=>{
        res.send(fact)
})
