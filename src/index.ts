import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'


import { port, uriMongo as url } from './config'
import { app as authRouter } from './routes/index'


// Create a new express application instance
const app: express.Application = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(authRouter);


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
