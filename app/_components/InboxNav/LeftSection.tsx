import { User } from "next-auth";
import StyledAvatar from "../StyledAvatar";

export default function LeftSection({
  isLoading,
  userData,
}: {
  isLoading: boolean;
  userData: User | null;
}) {
  return (
    <div className='flex flex-row items-center gap-2'>
      <StyledAvatar
        alt={userData?.name}
        src={userData?.image}
      />
      <div className='flex flex-col justify-center'>
        {userData?.name.split(" ").map((name) => {
          return (
            <div
              key={name}
              className={`hidden text-sm font-semibold md:block ${
                isLoading &&
                "block h-4 w-32 animate-pulse rounded bg-accent-tint-200"
              }`}>
              {name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
