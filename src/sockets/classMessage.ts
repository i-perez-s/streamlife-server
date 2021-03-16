export class Message {
  text: string;
  emiter: string;

  constructor(text: string, emiter: string) {
    (this.text = text), (this.emiter = emiter);
  }
}
