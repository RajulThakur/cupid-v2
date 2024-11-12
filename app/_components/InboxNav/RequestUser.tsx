"use client ";
import { PersonAddRounded, PersonRemoveRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useState } from "react";
import { BASE_URL } from "@/app/_helper/config";

export default function RequestUser({ user }: { user: any }) {
  const [isSent, setIsSent] = useState(user.isSent);
  const [isLoading, setIsLoading]: [boolean, (bol: boolean) => void] = useState(false);
  async function handleRequest() {
    setIsLoading(true);
    if (isSent) {
      setIsSent(false);
      await fetch(`${BASE_URL}/requests/remove_request`, {
        method: "DELETE",
        body: JSON.stringify({ receiver: user.id }),
      });
    } else {
      setIsSent(true);
      await fetch(`${BASE_URL}/requests/create_request`, {
        method: "POST",
        body: JSON.stringify({ receiver: user.id }),
      });
    }
    setIsLoading(false);
  }
  return (
    <li className='flex items-center justify-between px-4 py-2 hover:bg-gray-100'>
      <div className='flex items-center justify-start gap-4'>
        <Avatar
          alt={user.firstName}
          src={user.profileImage}
        />
        <div className='flex flex-col'>
          <span className='font-medium'>
            {user.firstName} {user.lastName}
          </span>
          <span className='text-accent-shade-500'>{user.username}</span>
        </div>
      </div>
      <button
        className={`rounded-full p-2 text-accent-shade-700 transition-colors hover:bg-accent-tint-500 ${
          isLoading ? "cursor-wait disabled:opacity-50" : ""
        }`}
        onClick={handleRequest}
        disabled={isLoading}>
        {isSent ? <PersonRemoveRounded /> : <PersonAddRounded />}
      </button>
    </li>
  );
}
