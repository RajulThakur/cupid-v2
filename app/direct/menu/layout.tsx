import InboxNav from "@/app/_components/InboxNav/InboxNav";
import { SessionProvider } from "next-auth/react";
export const metadata = {
  title: "Inbox",
  description: "Inbox",
};
export default async function InboxLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionProvider>
      <div className='relative flex h-svh flex-col gap-4 px-4'>
        <InboxNav />
        <div className='flex-grow overflow-auto'>{children}</div>
      </div>
    </SessionProvider>
  );
}
