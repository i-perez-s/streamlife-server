import express from 'express'
import mongoose from 'mongoose'
import { json } from 'body-parser'

<<<<<<< HEAD

import { port, uriMongo as url } from './config'
import { app as authRouter } from './routes/index'
import './auth/auth'


=======
import { port, uriMongo as url } from './config'
>>>>>>> 8da1e00c184100c323a5da06b9292648eec042f3
// Create a new express application instance
const app: express.Application = express();
app.use(json())


<<<<<<< HEAD
app.use(authRouter);



=======
>>>>>>> 8da1e00c184100c323a5da06b9292648eec042f3
app.get('/', function (req, res) {
  res.send('Hello World!');
});

<<<<<<< HEAD
/* mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err
    console.log('>>>> Db conected')
}) */
=======
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err
    console.log('>>>> Db conected')
})
>>>>>>> 8da1e00c184100c323a5da06b9292648eec042f3

app.listen(port, function () {
  console.log('Server on port:', port);
});
