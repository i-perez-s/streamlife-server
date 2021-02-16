import express from 'express'
import bodyParser from 'body-parser'
import NodeMediaServer from 'node-media-server'
import dotenv from 'dotenv'
import { app as routes } from '../routes/index'

const setUpServer = () => {
    // Create a new express application instance
    const app: express.Application = express();
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    //use routes
    app.use(routes);

    //config the dotenv file
    dotenv.config()

    const nms = new NodeMediaServer({
        rtmp: {
          port: 1935,
          chunk_size: 60000,
          gop_cache: true,
          ping: 30,
          ping_timeout: 60
        },
        http: {
          port: 8000,
          allow_origin: '*'
        }
    })

    //prepare the socket server
    const ioServer = require('http').createServer(app);
    const io = require('socket.io')(ioServer);

    try {
        ioServer.listen(process.env.IO_SERVER_PORT)
        console.log("Socket server on port: ", process.env.IO_SERVER_PORT)
    } catch (error) {
        console.log(error)
    }
    return [app, io, nms]
}

export default setUpServer