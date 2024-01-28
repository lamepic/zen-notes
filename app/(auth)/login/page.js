"use client";
import GoogleIcon from "@/components/GoogleIcon";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

function Login() {
  const { signInWithGoogle, authLoading } = useAuth();

  return (
    <div className="flex flex-col items-center h-full">
      <div
        className={cn(
          "flex space-y-6 flex-col justify-center items-center mt-40 max-w-xl lg:w-3/12 rounded-md p-5 border-gray-500/40",
          !authLoading && "border"
        )}
      >
        <p className="text-xl md:text-2xl font-bold">Lets get started</p>
        <hr className="border-gray-600/20 w-full" />
        {authLoading ? (
          <p className="text-4xl font-bold">Loading...</p>
        ) : (
          <Button
            className="w-full p-6 flex items-center gap-2"
            onClick={() => {
              signInWithGoogle();
            }}
          >
            <GoogleIcon className="w-8 h-8" />
            Sign In With Google
          </Button>
        )}
      </div>
    </div>
  );
}

export default Login;
