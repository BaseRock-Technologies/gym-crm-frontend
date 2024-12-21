"use client";

import { useState } from "react";
import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import bannerImage from "@/public/assets/images/forgot-banner.jpg";
import { post } from "@/lib/helper/steroid";
import SpinnerTick from "@/components/Images/SpinnerTick";
import { showToast } from "@/lib/helper/toast";
import { StatusResponse } from "@/types/response";

// Define the form schema
const formSchema = z.object({
  input: z.string().refine((val) => {
    // Check if it's a valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Check if it's a valid mobile number (assuming 10 digits)
    const mobileRegex = /^[0-9]{10}$/;
    return emailRegex.test(val) || mobileRegex.test(val);
  }, "Please enter a valid email address or mobile number"),
});

type FormData = z.infer<typeof formSchema>;

export default function ForgotPassword() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const isEmail = data.input.includes("@");
      const payload = isEmail ? { email: data.input } : { mobile: data.input };
      const res: StatusResponse = await post(payload, "auth/forgot-password");
      const { status, message } = res;
      if (status === "success") {
        showToast("success", "Reset instructions send to mail");
        reset();
        return;
      }
      showToast("error", message);
    } catch (error) {
      showToast("error", "Error Occured");
    } finally {
      setLoading(false);
      setSubmitError(null);
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
              <h1 className="text-3xl font-extrabold text-primary">
                Forgot Password?
              </h1>
              <p className="text-sm font-medium text-secondary">
                No worries, we'll send you reset instructions
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <Input
                {...register("input")}
                name="input"
                type="text"
                placeholder="Email or Mobile Number"
                className="h-12"
              />
              {errors.input && (
                <p className="text-red-500 text-sm">{errors.input.message}</p>
              )}
            </div>

            <div className="relative w-full flex justify-end items-center">
              <Link href="signin" className="text-sm text-helper-primary">
                Remember password, login?
              </Link>
            </div>

            <Button type="submit" className="w-full h-12" disabled={loading}>
              {loading ? <SpinnerTick /> : "Continue"}
            </Button>

            {submitError && (
              <p className="text-red-500 text-sm text-center">{submitError}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
