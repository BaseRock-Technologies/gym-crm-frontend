"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import bannerImage from "@/public/assets/images/forgot-banner.jpg";

export default function ForgotPassword() {
  const [emailError, setEmailError] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement | null>(null);

  // Reset error states
  const resetErrorStates = () => {
    emailRef.current!.value = "";
    setEmailError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = emailRef.current?.value.trim();

    resetErrorStates();

    let hasError = false;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    }

    if (hasError) {
      setTimeout(() => {
        resetErrorStates();
      }, 3000);
      return;
    }

    // If no errors, proceed with form submission
    if (!emailError) {
      console.log("Form submitted with:", { email });
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
            <div className=" text-center space-y-2">
              <h1 className="text-3xl font-extrabold text-primary">
                Forgot Password?
              </h1>
              <p className="text-sm font-medium text-secondary">
                No worries, we'll send you reset instructions
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input
                name="email"
                type="text"
                placeholder="Email"
                className="h-12"
                errorMessage={emailError}
                ref={emailRef}
              />
            </div>

            <div className="relative w-full flex justify-end items-center">
              <Link href="signin" className="text-sm text-helper-primary">
                Remember password, login?
              </Link>
            </div>

            <Button type="submit" className="w-full h-12">
              Continue
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
