"use client";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import handleSubmit from "@/app/_actions/handleSubmit";
import Logo from "@/app/_components/Logo";
import InputField from "@/app/_components/InputField";
import PasswordField from "@/app/_components/PasswordField";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="w-full rounded-xl bg-accent-tint-700 py-3 text-base font-light tracking-wide text-accent-shade-700 disabled:opacity-70"
    >
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}

export default function LoginForm() {
  const { pending } = useFormStatus();

  return (
    <form
      className="flex flex-col items-center gap-5 px-7"
      action={handleSubmit}
    >
      <Logo variant="bold" />
      <span className="select-none font-semibold text-accent-shade-700">
        Login with the Email
      </span>
      <InputField label="Email" name="email" isError={false} ErrMessage="" disabled={pending} />
      <PasswordField name="password" isError={false} ErrMessage="" disabled={pending} />
      <Link
        className="text-base transition-all hover:text-accent-shade-600 hover:underline"
        href="/signup"
      >
        New Account
      </Link>
      <SubmitButton />
    </form>
  );
}
