import { Message } from "./classMessage";
import { checkJwt } from "../helpers/checkJwt";
import Emote from "../models/Emote";
import User from "../models/User";

export const socketController = async (socket: any) => {
  const user = await checkJwt(socket.handshake.headers["token"]);
  if (!user) {
    return socket.disconnect();
  }
  console.log(user.username, "se conecto");
  socket.on("disconnect", () => console.log(user.username, "se desconecto"));
  // console.log(socket.handshake.headers["idstream"]);
  socket.join(socket.handshake.headers["idstream"]);
  // socket.join("a");

  // socket.on("send-message", (message: any) => {
  //   const messageCreated = new Message(message.text, user._id);
  //   socket.emit("send-message", messageCreated);
  // });
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

  socket.on("sendChatMessage", async (message: any) => {
    const userResult = await User.find({ username: user.username });
    const { _id, photo } = userResult[0];
    console.log(userResult);
    socket.in(message.chat).emit("chatMessage", {
      content: message.content,
      user: { _id, photo, name: user.username },
    });
  });
};
