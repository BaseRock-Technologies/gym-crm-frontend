"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { post } from "@/lib/helper/steroid";
import { showToast } from "@/lib/helper/toast";
import SpinnerTick from "@/components/Images/SpinnerTick";
import { useRouter } from "next/navigation";
import { Dumbbell } from "lucide-react";
import Image from "next/image";
import bannerImage from "@/public/assets/images/login-banner.jpg";
import Link from "next/link";
import { useAuth } from "@/lib/context/authContext";

const formSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

interface ResetPasswordProps {
  params: Promise<{ token: string }>;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ params }) => {
  const [apiLoading, setApiLoading] = useState(false);
  const router = useRouter();
  const { token } = React.use(params);

  const { loading, user } = useAuth();
  console.log(loading);

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
      setApiLoading(true);
      const payload = {
        token,
        password: data.newPassword,
      };
      const res = await post(payload, "auth/reset-password");

      if (res.status === "success") {
        showToast("success", "Password reset successfully");
        router.push("/signin");
        return;
      }
      showToast("error", res.message);
    } catch (error) {
      showToast("error", "An error occurred.");
    } finally {
      setApiLoading(false);
      reset();
    }
  };

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading]);

  return (
    <div className="relative w-full min-h-screen flex bg-gray-50">
      {loading && (
        <div className="absolute  top-0 left-0 w-full min-h-screen z-50 bg-backgroudOverlay flex justify-center items-center">
          <SpinnerTick />
        </div>
      )}
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
                Reset Password
              </h1>
              <p className="text-sm font-medium text-secondary">
                Enter your new password below
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <Input
                {...register("newPassword")}
                type="password"
                placeholder="New Password"
                className="h-12"
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm">
                  {errors.newPassword.message}
                </p>
              )}

              <Input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm Password"
                className="h-12"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full h-12" disabled={apiLoading}>
              {apiLoading ? <SpinnerTick /> : "Reset Password"}
            </Button>
          </form>

          <div className="text-center flex justify-end items-center">
            <Link href="/signin" className="text-sm text-helper-primary">
              Remember your password? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
