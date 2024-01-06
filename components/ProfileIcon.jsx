import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function ProfileIcon() {
  return (
    <button className="flex items-center gap-3">
      <Avatar className="border shadow-sm h-10 w-10" size={5}>
        <AvatarImage src="" alt="@shadcn" />
        <AvatarFallback>RA</AvatarFallback>
      </Avatar>
      <p>Profile</p>
    </button>
  );
}

export default ProfileIcon;
