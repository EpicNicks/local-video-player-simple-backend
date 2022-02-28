const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get("/", function(req, res, next){
    const metaPath = path.resolve(__dirname, "../public/meta-files/meta/");
    const files = fs.readdirSync(metaPath);
    const result = [];
    for (const file of files){
        const obj = JSON.parse(fs.readFileSync(path.resolve(metaPath, file)).toString());
        result.push( (({title, type}) => ({title, type}))(obj) );
    }
    res.send(result);
});

module.exports = router;
