"use client";
import handleSignUp from "@/app/_actions/handleSignUp";
import { Checkbox } from "@mui/material";
import { FormEvent } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import InputField from "../InputField";
import Logo from "../Logo";
import PasswordField from "../PasswordField";
import Username from "./Username";

export default function SignupForm() {
  const router = useRouter();
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    try {
      const userid = await handleSignUp(formData);
      router.push(`/info?id=${userid}`);
    } catch (error) {
      console.log(error);
    }
  };
  const { pending } = useFormStatus();
  return (
    <form
      className='flex flex-col items-center gap-8 px-7'
      onSubmit={onSubmit}>
      <div className='flex flex-col items-center'>
        <Logo variant='bold' />
        <span className='select-none font-semibold text-accent-shade-700'>
          Continue with the Email
        </span>
      </div>
      <div className='flex flex-col items-center gap-[2px]'>
        <input
          type='text'
          hidden
          aria-hidden
          defaultValue='signup'
          name='formType'
        />
        <InputField
          label='Email'
          name='email'
          isError={false}
          ErrMessage=''
          disabled={pending}
        />
        <Username
          label='Username'
          name='username'
        />
        <PasswordField
          name='password'
          isError={false}
          ErrMessage=''
          disabled={pending}
        />
        <div className='self-start'>
          <Checkbox
            aria-label='Checkbox'
            name='checkbox'
          />
          <span>
            I agree to <a>terms & conditions</a>
          </span>
        </div>
      </div>
      <button
        type='submit'
        className='w-full rounded-xl bg-accent-tint-700 py-3 text-xl font-semibold tracking-wider text-accent-shade-700'
        disabled={pending}>
        {pending ? <span className='spinner'></span> : "Next"}
      </button>
    </form>
  );
}
