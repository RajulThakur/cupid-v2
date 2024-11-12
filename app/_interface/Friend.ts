import { User } from "./User";

export default interface Friends {
  id?: string;
  friends: string[];
  requests: string[];
  userId: string;
  user: User;
}