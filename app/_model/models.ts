import { collection } from "firebase/firestore";

import { db } from "../_lib/firebase";

export const UserRef = collection(db, "user");
export const UserStatusRef = collection(db, "UserStatus");
export const FriendsRef = collection(db, "Friends");
export const MessagesRef = collection(db, "Messages");
