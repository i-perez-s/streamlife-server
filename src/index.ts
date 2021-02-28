import { connectDb } from './config/db'
import setUpServer from './config/setUptServer'

const [app, io, nms] = setUpServer()

//stream server
nms.run()

console.log(process.env.URI_MONGO)

connectDb()

app.listen(process.env.EXPRESS_PORT, function () {
  console.log('Express server on port:', process.env.EXPRESS_PORT);
});


module.exports = { io }