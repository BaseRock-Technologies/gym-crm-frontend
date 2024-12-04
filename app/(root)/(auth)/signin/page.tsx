"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

import bannerImage from "@/public/assets/images/login-banner.jpg";
import { useRouter } from "next/navigation";
import { post } from "@/lib/helper/steroid";
import { backendApiPath } from "@/env";

export default function SignInForm() {
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [rememberMe, setRememberMe] = useState(false);

  const userNameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  // Reset error states
  const resetErrorStates = () => {
    userNameRef.current!.value = "";
    passwordRef.current!.value = "";
    setUsernameError(null);
    setPasswordError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      return;
    }

    // If no errors, proceed with form submission
    if (!usernameError && !passwordError) {
      const data = { userName, password };
      console.log("Form submitted with:", data);
      const res = await post(data, "auth/signin");
      console.log(res);
      if (res && res.status === "success") {
        resetErrorStates();
        router.push("/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
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
            <div className="space-y-4">
              <Input
                name="username"
                type="text"
                placeholder="Username"
                className="h-12"
                errorMessage={usernameError}
                ref={userNameRef}
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                className="h-12"
                ref={passwordRef}
                errorMessage={passwordError}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember for 30 days
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-helper-primary"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full h-12">
              Log In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
