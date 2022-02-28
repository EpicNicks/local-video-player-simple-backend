

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get("/", function(req, res, next){
    const metaPath = path.resolve(__dirname, "../public/meta-files/meta/");
    const title = req.query.title;
    const file = (files => {
        for (const file of files){
            const obj = JSON.parse(fs.readFileSync(path.resolve(metaPath, file)).toString());
            if (obj.title === title){
                return obj;
            }
        }
    })(fs.readdirSync(metaPath));
    if (file === null || file === undefined){
        res.status(404).send(`The file with requested title: ${title} does not exist`);
    }
    res.send(file);
});

module.exports = router;
