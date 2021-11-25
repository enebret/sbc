const express = require('express');
const app = express();
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));