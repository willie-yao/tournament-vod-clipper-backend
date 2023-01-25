import express from 'express';
import cors from 'cors';
import youtubeDl from 'youtube-dl-exec';
import fs from 'fs';
import bodyParser from 'body-parser';

const app = express()
const port = 5000

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/getUrl', (req, res) => {
  youtubeDl(req.body.url, {
    getUrl: true,
  }).then((url) => {
    console.log(url);
    res.send(url);
  })
})

app.get('/downloadTest', (req, res) => {
  youtubeDl(
    "https://www.twitch.tv/videos/1714445111",
    {
      "downloadSections": "*"+ "20:00" + "-" + "20:10",
      output: "video.mp4",
    }
  ).then(output => {
    res.download("./"+ "video" + ".mp4")
    var stats = fs.statSync("./video.mp4")
    console.log(stats.size)
    console.log("hello")
  })
})

app.get('/downloadVideo', (req, res) => {
  youtubeDl(
    req.query.url,
    {
      "downloadSections": "*"+ req.query.startTime + "-" + req.query.endTime,
      output: "video.mp4",
    }
  ).then(output => {
    res.download("./"+ "video" + ".mp4")
    var stats = fs.statSync("./video.mp4")
    console.log(stats.size)
    console.log("hello")
  })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
