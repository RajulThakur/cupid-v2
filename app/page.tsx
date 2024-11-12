import { auth } from "@/app/_lib/auth";
import { redirect } from "next/navigation";
export default async function Home() {
  const  session  = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }else{
    redirect("/direct/menu/inbox");
  }
}
