"use server";
import { redirect } from "next/navigation";
import handleSignIn from "./handleSignIn";

async function handleSubmit(formData:FormData) {
    
  const res = await handleSignIn(formData);
  if (res?.response) {
    redirect("/direct/menu/inbox");
  }
}

export default handleSubmit;
