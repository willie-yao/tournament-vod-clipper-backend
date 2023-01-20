import express from 'express';
import cors from 'cors';
import youtubeDl from 'youtube-dl-exec';
import bodyParser from 'body-parser';

const app = express()
const port = 3000

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

app.get('/downloadVideo', (req, res) => {
  youtubeDl(
    req.body.url,
    {
      "externalDownloader": "wget",
      "downloadSections": "*"+ req.body.startTime + "-" + req.body.endTime
    }
  ).then(output => {
    console.log(output)
    res.send("Success!")
  })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
