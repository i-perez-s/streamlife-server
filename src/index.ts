import { connectDb } from './config/db'
import setUpServer from './config/setUptServer'

const [app, io, nms] = setUpServer()

nms.run()

/* connectDb()
.then(() => console.log('>>>>>>>>>> Db connected'))
.catch(err => console.log(err)) */


app.listen(process.env.EXPRESS_PORT, function () {
  console.log('Express server on port:', process.env.EXPRESS_PORT);
});

module.exports = { io }