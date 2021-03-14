import { Message } from "./classMessage";
import { checkJwt } from "./../helpers/checkJwt";

export const socketController = async (socket: any) => {
  const user = await checkJwt(socket.handshake.headers["token"]);
  if (!user) {
    return socket.disconnect();
  }

  console.log(user.username, "se unio");
  socket.on("disconnect", () => console.log(user.username, "se desconecto"));

  socket.join(socket.handshake.headers["idstream"]);

  socket.on("send-message", (message: any) => {
    const messageCreated = new Message(message.text, user._id);
    socket.to(message.chat).emit("send-message", messageCreated);
  });
};
