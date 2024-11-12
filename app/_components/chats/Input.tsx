"use client";
import handleSubmit from "@/app/_actions/handleSubmit";
import { MicNoneOutlined, PhotoOutlined, SendRounded } from "@mui/icons-material";
import { KeyboardEvent, useRef, useState } from "react";

export default function Input() {
  const inputFile = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // Prevent default Enter behavior
      e.preventDefault();
      // Shift+Enter for a new line, Enter to submit
      handleSubmit();
    }
  };
  <div className='flex items-center justify-between gap-4 rounded-full bg-white px-4 py-2 shadow-sm'>
  <textarea
    onChange={(e) => setValue(e.target.value)}
    onKeyDown={handleKeyDown}
    value={value}
    className='h-auto flex-1 resize-none overflow-y-auto px-8 py-2 focus:outline-none'
    placeholder='Type your message...'
    rows={1}
    maxLength={1000}
  />
  {!value && (
    <div className='flex items-center gap-2'>
      <MicNoneOutlined
        className='stroke-1'
        sx={{
          fontSize: "2rem",
          "&path": { strokeWidth: "0.5px" },
          "&:hover": { color: "rgb(154, 198, 133)" },
        }}
      />
      <input
        type='file'
        ref={inputFile}
        accept='image/*,video/*,audio/*'
        className='hidden'
      />
      <button
        onClick={(e) => {
          inputFile.current.click();
        }}>
        <PhotoOutlined
          sx={{
            fontSize: "2rem",
            "&path": { strokeWidth: "0.5px" },
            "&:hover": { color: "rgb(154, 198, 133)" },
          }}
        />
      </button>
    </div>
  )}
  {value && (
    <button
      onClick={handleSubmit}
      className='flex items-center gap-2 rounded-lg bg-accent-shade-900 px-4 py-2 text-background'>
      <span>Send </span>
      <SendRounded />
    </button>
  )}
</div>
}
