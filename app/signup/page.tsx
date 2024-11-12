import SignUpNav from "@/app/_components/signup/SignUpNav";
import SignupForm from "@/app/_components/signup/SignupForm";

export const metadata = {
  title: "Signup",
  description: "Create an account",
};

function SignupPage() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center px-3 py-3">
      <SignUpNav heading="Signup" />
      <SignupForm />
    </div>
  );
}

export default SignupPage;
