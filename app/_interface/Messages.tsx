import MessagesMessages from "./Message";

export default interface Messages {
  id?: string;
  createdAt: Date;
  messages: MessagesMessages[];
  userA: string;
  userB: string;
}
