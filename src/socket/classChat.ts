import { Message } from "./classMessage";

export class Chat {
  messages: [Message];
  streamerId: string;

  constructor(streamerId: string) {
    this.messages = [new Message("", "")];
    this.streamerId = streamerId;
  }

  get lastMessage() {
    return this.messages[this.messages.length - 1];
  }

  sendMessage(text: string, id: string) {
    this.messages.push(new Message(text, id));
  }
}
