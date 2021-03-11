import { io } from '../index'
import {Socket} from 'socket.io'

io.on('connection', (socket = new Socket()) => {
    console.log(socket.id)

})