// ROUTE SIMPLY ACKNOWLEDGES THAT A CONNECTION WAS ESTABLISHED
// YEAR DEPENDENT?: NO

// GLOBAL IMPORTS
const express = require('express');
const router = express();
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

router.post('/', (req,res,next)=>{
    console.log("[STATUS] Connection established")
    res.json("Connected")
})

module.exports = router;