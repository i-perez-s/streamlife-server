import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import NodeMediaServer from 'node-media-server'


import { port, uriMongo as url, mediaServerConfig, ioServerPort } from './config'
import { app as routes } from './routes/index'


//prepare the servers
// Create a new express application instance
const app: express.Application = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//prepare node media server
const  nms = new NodeMediaServer(mediaServerConfig)

//prepare the socket server
const ioServer = require('http').createServer(app);
export const io = require('socket.io')(ioServer);

//use routes
app.use(routes);

//conect to the db
/* mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err
    console.log('>>>> Db conected')
}) */

//init the servers
nms.run()

app.listen(port, function () {
  console.log('Express server on port:', port);
});

try {
  ioServer.listen(ioServerPort)
  console.log("Io server on port: ", ioServerPort)
} catch (error) {
  console.log(error)
}