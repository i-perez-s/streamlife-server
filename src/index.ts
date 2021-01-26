import express from 'express'
import mongoose from 'mongoose'
import { json } from 'body-parser'

import { port, uriMongo as url } from './config'
// Create a new express application instance
const app: express.Application = express();
app.use(json())


app.get('/', function (req, res) {
  res.send('Hello World!');
});

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err
    console.log('>>>> Db conected')
})

app.listen(port, function () {
  console.log('Server on port:', port);
});
