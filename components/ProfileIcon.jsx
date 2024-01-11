import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

function ProfileIcon() {
  const { signout, user } = useAuth();
  const router = useRouter();

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center text-left gap-3 p-0 border-0 px-2">
            <Avatar className="border shadow-sm h-10 w-10" size={5}>
              <AvatarImage src={user?.avatar} alt="user-profile" />
              <AvatarFallback>RA</AvatarFallback>
            </Avatar>
            <p>Profile</p>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-40">
          <div className="flex flex-col space-y-2">
            <Button variant="ghost" className="text-left">
              Info
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                signout();
                router.push("/");
              }}
              className="text-left"
            >
              Log out
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default ProfileIcon;
