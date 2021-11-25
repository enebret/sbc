var express = require('express');
var app = express();

const states = ["Abia",
"Adamawa",
"Akwa Ibom",
"Anambra",
"Bauchi",
"Bayelsa",
"Benue",
"Borno",
"Cross River",
"Delta",
"Ebonyi",
"Edo",
"Ekiti",
"Enugu",
"FCT - Abuja",
"Gombe",
"Imo",
"Jigawa",
"Kaduna",
"Kano",
"Katsina",
"Kebbi",
"Kogi",
"Kwara",
"Lagos",
"Nasarawa",
"Niger",
"Ogun",
"Ondo",
"Osun",
"Oyo",
"Plateau",
"Rivers",
"Sokoto",
"Taraba",
"Yobe",
"Zamfara"]

const filt = states.sort((a,b)=>{
    return b.length - a.length
})

app.get("/sort", (res)=>{
    res.send(filt)
})