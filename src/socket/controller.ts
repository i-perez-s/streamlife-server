export const socketController = (socket: any) => {
    console.log(socket.id, 'se unio')

    socket.on('disconnect', () => console.log(socket.id))
    socket.emit('lol', {nombre: 'asd'})
}