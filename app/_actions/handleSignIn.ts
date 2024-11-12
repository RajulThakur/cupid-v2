"use server";
import { signIn } from "@/app/_lib/auth";
import { CredentialsSignin } from "next-auth";

export default async function handleSignIn(formData: FormData) {
  const email: string = formData.get("email") as string;
  const password: string = formData.get("password") as string;
  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { response };
   
  } catch (error) {
    const errorMessage =
      error instanceof CredentialsSignin ? error.message : "An error occurred";
    return { error: errorMessage };
  }
}
