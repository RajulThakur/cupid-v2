'use client'
import { CheckRounded, CloseRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { BASE_URL } from "../_helper/Config";

function FriendRequests({ requests,setRequests }) {
  return (
    <>
      {requests.map((request) => (
        <FriendRequest key={request.id} request={request} setRequests={setRequests} requests={requests}/>
      ))}
    </>
  );
}

export default FriendRequests;
