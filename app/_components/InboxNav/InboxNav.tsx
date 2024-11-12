"use client";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import InboxNavHeader from "./InboxNavHeader";
import LeftSection from "./LeftSection";
import MiddleSection from "./MiddleSection";
import RightSection from "./RightSection";

function InboxNav() {
  const session = useSession();
  const [isLoading, setIsLoading]: [boolean, (value: boolean) => void] = useState(true);
  const [userData, setUserData]: [User | null, (value: User | null) => void] = useState(null);
  const [showOverlay, setShowOverlay]: [boolean, (value: boolean) => void] = useState(false);
  const searchContainerRef = useRef(null);
  const [showMobileMenu, setShowMobileMenu]: [
    boolean,
    (value: boolean) => void
  ] = useState(false);

  // Updated mock user list with avatar URLs

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowOverlay(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (session.status === "authenticated") {
      setUserData(session.data.user);
      setIsLoading(false);
    }
  }, [session]);

  return (
    <div className='flex flex-col gap-2'>
      <nav className='flex items-center gap-2 py-2'>
        {!showOverlay && !inputValue && (
          <LeftSection isLoading={isLoading} userData={userData} />
        )}

        <MiddleSection
          showOverlay={showOverlay}
          setShowOverlay={setShowOverlay}
          setShowMobileMenu={setShowMobileMenu}
        />
        {!showOverlay && !inputValue && (
          <RightSection
            showMobileMenu={showMobileMenu}
            setShowMobileMenu={setShowMobileMenu}
          />
        )}
      </nav>
      <InboxNavHeader />
    </div>
  );
}

export default InboxNav;
