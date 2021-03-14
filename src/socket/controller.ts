import { Message } from "./classMessage";
import { checkJwt } from "./../helpers/checkJwt";
import Emote from "../models/Emote";

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
  socket.on("send-emote", async (message: any) => {
    //check if it's an emote

    const emoteId = message.text;
    const emote = await Emote.findById(emoteId);
    if (!emote) {
      message.text = "";
    } else {
      message.text = emote.urlEmote;
    }
    const messageCreated = new Message(message.text, user._id);
    console.log(messageCreated);
    socket.to(message.chat).emit("send-message", messageCreated);
  });
  socket.on("send-message", async (message: any) => {
    const messageCreated = new Message(message.text, user._id);
    console.log(messageCreated);
    socket.to(message.chat).emit("send-message", messageCreated);
  });
};
