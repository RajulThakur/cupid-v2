"use client";
import { uploadToBucket } from "@/app/_lib/uploadToBucket";
import { CreateRounded } from "@mui/icons-material";
import { Avatar, CircularProgress } from "@mui/material";
import { ChangeEvent, RefObject, useRef, useState } from "react";

function ProfileEdit({ id }: { id: string }) {
  const [url, setUrl] = useState<string | null>(null);
  const fileInputRef: RefObject<HTMLInputElement> = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  async function handleUpload() {
    // Access the selected files from the input
    fileInputRef.current?.click();
  }

  async function handleClick(e: ChangeEvent<HTMLInputElement>) {
    setIsUploading(true);
    const res = await uploadToBucket(e.target.files?.[0], id);
    setIsUploading(false);
    return res;
  }
  return (
    <div>
      <div className='relative h-32 w-32'>
        {url ? (
          <Avatar
            sx={{ width: "8rem", height: "8rem" }}
            src={url}
          />
        ) : (
          <Avatar sx={{ width: "8rem", height: "8rem" }} />
        )}
        {isUploading && (
          <div className='absolute inset-0 flex items-center justify-center backdrop-blur-sm opacity-90  rounded-full bg-accent-tint-500'>
            <CircularProgress
              variant='determinate'
              value={uploadProgress}
              sx={{ color: "#3a4a32" }}
            />
            <div className='absolute text-xs'>
              {Math.round(uploadProgress)}%
            </div>
          </div>
        )}
        <span
          className='absolute bottom-0 right-0 rounded-2xl bg-accent-tint-500 p-2 opacity-90 '
          onClick={handleUpload}>
          <CreateRounded sx={{ fill: "#3a4a32" }} />
          <input
            ref={fileInputRef}
            className='absolute hidden h-0 w-0 overflow-hidden'
            type='file'
            onChange={handleClick}
            accept='images/*'
          />
        </span>
      </div>
    </div>
  );
}

export default ProfileEdit;
