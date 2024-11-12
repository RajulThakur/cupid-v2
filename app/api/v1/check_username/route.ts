import { UserRef } from "@/app/_model/models";
import { getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username } = body;
    console.log("username", username);
    const q = query(UserRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    const exists = !querySnapshot.empty;
    return NextResponse.json({ available: !exists }, { status: 200 });
  } catch (error) {
    console.error("Error checking username:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
