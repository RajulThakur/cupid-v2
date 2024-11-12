export interface User {
  id?: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  profileImage: string;
  password: string;
  relationshipStatus: string;
  createdAt?: Date;
  updatedAt?: Date;
  pin: string;
}
