export default interface MessagesMessages {
  id?: string;
  createdAt: Date;
  from: string; // ObjectId in MongoDB, represented as a string here
  message: string;
  msgType: string;
}