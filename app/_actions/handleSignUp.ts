"use server";

import { db } from "@/app/_lib/firebase"; // Make sure this path is correct
import { signUpSchema } from "@/app/_lib/zod";
import { addDoc, doc } from "firebase/firestore";
import { hashWithSalt } from "../_helper/Hash";
import { FriendsRef, UserRef, UserStatusRef } from "../_model/models";

interface FormData {
  get(key: string): string | null;
}

interface SignUpResponse {
  success: boolean;
  userId?: string;
  error?: string;
}

export default async function handleSignUp(formData: FormData): Promise<string | SignUpResponse> {
    const email = formData.get("email");
    const password = formData.get("password");
    const username = formData.get("username");

    const {
      email: Email,
      password: Password,
      username: Username,
    } = await signUpSchema.parseAsync({
      email,
      password,
      username,
    });

    const hashPass = await hashWithSalt(Password);
    console.log("hashPass: ", hashPass);

    const newUser = await addDoc(UserRef, {
      email: Email,
      password: hashPass,
      username: Username,
    });

    // Crea

    await addDoc(UserStatusRef, {
      userId: doc(db,"users",newUser.id),
        isOnline: false,
      lastSeen: new Date(),
    });

    await addDoc(FriendsRef, {
      userId: doc(db,"users",newUser.id),
      friends: [],
      requests: [],
    });

    return newUser.id;
}
