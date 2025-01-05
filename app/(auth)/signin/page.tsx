"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import bannerImage from "@/public/assets/images/login-banner.jpg";
import { useRouter } from "next/navigation";
import { post } from "@/lib/helper/steroid";
import { SigninResponse } from "@/types/query";
import { useAuth } from "@/lib/context/authContext";
import Cookies from "js-cookie";
import { showToast } from "@/lib/helper/toast";
import { InputWithError } from "@/components/ui/inputWithError";
import SpinnerTick from "@/components/Images/SpinnerTick";

export default function SignInForm() {
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [authenticating, setAuthenticating] = useState<boolean>(false);

  const userNameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const { setUser, loading, user } = useAuth();

  // Reset error states
  const resetErrorStates = () => {
    userNameRef.current!.value = "";
    passwordRef.current!.value = "";
    setUsernameError(null);
    setPasswordError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (authenticating) return;
    e.preventDefault();
    setAuthenticating(true);
    const userName = userNameRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();

    let hasError = false;

    // Validate userName
    if (!userName) {
      setUsernameError("Username is required");
      hasError = true;
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    }

    if (hasError) {
      setAuthenticating(false);
      return;
    }

    // If no errors, proceed with form submission
    if (!usernameError && !passwordError) {
      const data = { userName, password };
      const res: SigninResponse = await post(data, "auth/signin");

      if (res) {
        if (res.status === "success") {
          const userData = { userName, authToken: res.authToken };
          setUser(userData);
          Cookies.set("user", JSON.stringify(userData), {
            expires: 1,
          });
          router.push("/dashboard");
          return;
        }

        if (res.status === "error") {
          showToast("error", res.message);
        }
      } else {
        showToast("error", "Error Occured");
      }
      setAuthenticating(false);
      resetErrorStates();
    }
  };

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading]);

  return (
    <div className="relative">
      {loading && (
        <div className="absolute  top-0 left-0 w-full min-h-screen z-50 bg-backgroudOverlay flex justify-center items-center">
          <SpinnerTick />
        </div>
      )}
      <div className="relative w-full min-h-screen flex bg-gray-50">
        {/* overlay */}
        {/* Left side - Image placeholder */}
        <div className="relative hidden md:flex md:w-3/5 bg-black">
          <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
          <Image
            loading="eager"
            src={bannerImage}
            alt="banner"
            width={0}
            height={0}
            sizes="100vw"
            className="object-cover bg-no-repeat bg-center"
          />
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-2/5 flex items-center justify-center p-8 sm:p-12 bg-white">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-4 text-center">
              <Dumbbell className="w-10 h-10 mx-auto text-helper-primary" />
              <div className="text-center space-y-2">
                <h1 className="text-primary text-3xl font-extrabold">
                  Welcome back!
                </h1>
                <p className="text-sm font-medium  text-secondary">
                  Effortless gym management starts here
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-6">
                <InputWithError
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="h-12"
                  errorMessage={usernameError}
                  ref={userNameRef}
                />
                <InputWithError
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="h-12"
                  ref={passwordRef}
                  errorMessage={passwordError}
                />
              </div>

              <div className="flex items-center justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-helper-primary"
                >
                  Forgot password?
                </Link>
              </div>

              {authenticating ? (
                <div className="inline-flex items-center justify-center rounded-md w-full h-12 bg-primary text-white shadow hover:bg-primary/90 px-4 py-2">
                  <SpinnerTick />
                </div>
              ) : (
                <Button size="lg" type="submit" className="w-full h-12">
                  Log In
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
