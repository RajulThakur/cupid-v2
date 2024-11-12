import { signOut } from "@/app/_lib/auth";
import { Logout } from "@mui/icons-material";

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirect: true, redirectTo: "/" });
      }}>
      <button>
        <Logout
          sx={{
            ":hover": {
              fill: "red",
            },
          }}
        />
      </button>
    </form>
  );
}

export default SignOut;
