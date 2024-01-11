"use client";
import GoogleIcon from "@/components/GoogleIcon";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

function Login() {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="flex flex-col items-center h-full">
      <div className="flex space-y-6 flex-col justify-center items-center mt-40 max-w-xl lg:w-3/12 rounded-md p-5 border border-gray-500/40 h-1/6">
        <div className="w-full">
          <Button
            className="w-full p-6 flex items-center gap-2"
            onClick={() => {
              signInWithGoogle();
            }}
          >
            <GoogleIcon className="w-8 h-8" />
            Sign In With Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
