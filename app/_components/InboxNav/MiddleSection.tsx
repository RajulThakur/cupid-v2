import { BASE_URL } from "@/app/_helper/config";
import useDebounce from "@/app/_hooks/useDebounce";
import { CloseRounded, SearchRounded } from "@mui/icons-material";
import { ChangeEvent, RefObject, useEffect, useRef, useState } from "react";
import RequestUser from "./RequestUser";

export default function MiddleSection({
  showOverlay,
  setShowOverlay,
  setShowMobileMenu,
}: {
  showOverlay: boolean;
  setShowOverlay: (value: boolean) => void;
  setShowMobileMenu: (value: boolean) => void;
}) {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [inputValue, setInputValue]: [string, (value: string) => void] = useState("");
  const debouncedSearch = useDebounce(inputValue);
  const inputRef: RefObject<HTMLInputElement> = useRef(null);
  const searchContainerRef: RefObject<HTMLDivElement> = useRef(null);
  const clearInput = (): void => {
    setInputValue("");
    setShowOverlay(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    async function fetchUsers() {
      if (!debouncedSearch) return;
      const response = await fetch(`${BASE_URL}/search_username`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: debouncedSearch }),
      });
      const { users } = await response.json();

      setFilteredUsers(users);
    }
    fetchUsers();
  }, [debouncedSearch]);

  const handleFocus = () => {
    setShowOverlay(true);
    setShowMobileMenu(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);
    setShowOverlay(true);
  };

  return (
    <div
      ref={searchContainerRef}
      className={`relative mx-auto flex-grow transition-all duration-200 ease-in-out ${
        showOverlay || inputValue ? "w-full" : "max-w-screen-md"
      }`}>
      <input
        ref={inputRef}
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        placeholder='Search'
        className={`w-full rounded-lg border border-gray-300 py-2 ${
          !showOverlay && !inputValue ? "px-10" : "px-3"
        } placeholder:font-extralight placeholder:tracking-wide focus:outline-none`}
      />
      {!showOverlay && !inputValue && (
        <SearchRounded
          sx={{ fill: "black", fontSize: "1.5rem" }}
          className='absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-400'
        />
      )}

      {(showOverlay || inputValue) && (
        <button
          onClick={clearInput}
          className='absolute right-2 top-1/2 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-gray-200 p-1'>
          <CloseRounded
            className='text-gray-500'
            style={{ fontSize: "0.85rem" }}
          />
        </button>
      )}

      {/* Overlay search results */}
      {showOverlay && inputValue && (
        <div className='absolute left-0 right-0 top-full z-10 mt-1 max-h-80 origin-top transform animate-slideDown overflow-y-auto rounded-b-lg bg-white shadow-lg transition-all duration-500 ease-out'>
          {filteredUsers.length > 0 ? (
            <ul className='py-2'>
              {filteredUsers.map((user) => (
                <RequestUser
                  key={user.id}
                  user={user}
                />
              ))}
            </ul>
          ) : (
            <p className='px-4 py-2 text-gray-500'>No users found</p>
          )}
        </div>
      )}
    </div>
  );
}
