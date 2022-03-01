const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get("/", function(req, res, next){
    const metaPath = path.resolve(__dirname, "../public/meta-files/meta/");
    const files = fs.readdirSync(metaPath);
    const title = req.query.title;
    const season = req.query.season;
    const episode = req.query.episode;

    let filepath = null;
    for (const file of files.filter(f => [".seriesn", ".movien"].includes(path.extname(f)))){
        let object = JSON.parse(fs.readFileSync(path.resolve(metaPath, file)).toString());
        if (object.title === title){
            filepath = object.seasons[parseInt(season) - 1].episodes[parseInt(episode) - 1].path
            break;
        }
    }
    if (filepath !== null){
        const stat = fs.statSync(filepath);
        const fileSize = stat.size;
        const range = req.headers.range;
        if (range){
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1]
                ? parseInt(parts[1], 10)
                : fileSize - 1;
            const chunkSize = (end - start) + 1;
            const file = fs.createReadStream(filepath, {start, end});
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'video/mp4'
            };
            res.writeHead(206, head);
            file.pipe(res);
        }
        else{
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4'
            };
            res.writeHead(200, head);
            fs.createReadStream(filepath).pipe(res);
        }
    }
    else{
        res.status(404).send(`The file with requested title: ${title} does not exist`);
    }
});

module.exports = router;