import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function ProfileDialog({ children }) {
  const { user } = useAuth();

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-5">
          <DialogTitle className="text-3xl text-center">Profile</DialogTitle>
          <DialogDescription className="flex flex-col items-center py-5 space-y-2 font-bold">
            <Avatar className="flex items-center justify-center">
              <AvatarImage src={user.avatar} alt="profile-img" />
              <AvatarFallback className="border shadow-sm">
                {user?.name.split(" ")[0][0]}
                {user?.name.split(" ")[1][0]}
              </AvatarFallback>
            </Avatar>
            <p className="text-xl">{user.name}</p>
            <p>{user.email}</p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileDialog;
