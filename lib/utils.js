import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const extractUserInfo = (user) => {
  return {
    id: user.uid,
    name: user.displayName,
    email: user.email,
    avatar: user.photoURL,
    provider: user.providerId,
  };
};
