import { signOut } from "next-auth/react";
import { LogoutOutlined, MoreVert } from "@mui/icons-material";
import AdditonalInfo from "../AdditionalInfo";
export default function RightSection({ showMobileMenu, setShowMobileMenu }: Readonly<{ showMobileMenu: boolean; setShowMobileMenu: (value: boolean) => void }>) {
  function handleSignOut() {
    signOut({
      callbackUrl: "/login",
      redirect: true,
    });
  }
  return (
    <>
      {/* Desktop menu */}
      <div className='hidden md:flex'>
        <button
          onClick={handleSignOut}
          className='group relative rounded-full p-2 text-base font-light transition-all duration-200 ease-in-out hover:bg-accent-tint-400'>
          <LogoutOutlined />
          <AdditonalInfo>Sign out</AdditonalInfo>
        </button>
      </div>

      {/* Mobile menu */}
      <div className='relative md:hidden'>
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className='rounded-full p-2 text-base font-light transition-all duration-200 ease-in-out hover:bg-accent-tint-400'>
          <MoreVert />
        </button>

        {/* Mobile menu overlay */}
        {showMobileMenu && (
          <div className='absolute right-0 top-full z-20 mt-1 w-48 rounded-lg bg-white shadow-lg'>
            <div className='flex flex-col py-2'>
              <button
                className='flex items-center gap-2 px-4 py-2 hover:bg-accent-tint-400'
                onClick={handleSignOut}>
                <LogoutOutlined />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
