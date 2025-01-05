"use client";

import React, { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Eye, EyeOff, LoaderIcon } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navigation/navbar";

interface SignInError {
  code: string;
  message: string;
}

const SignInPage = () => {
  const { isLoaded, signIn, setActive } = useSignIn();

  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    if (!emailAddress || !password) {
      return toast.warning("Tolong isi semua kolom");
    }

    setIsLoading(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
        redirectUrl: "/auth-callback",
      });

      console.log("SignIn Attempt:", signInAttempt);

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/auth-callback");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        toast.error("Email atau kata sandi salah");
      }
    } catch (error) {
      if (error instanceof Error) {
        const signInError = error as { errors?: SignInError[] };
        if (signInError.errors && signInError.errors.length > 0) {
          switch (signInError.errors[0]?.code) {
            case "form_identifier_not_found":
              toast.error(
                "Email ini belum terdaftar. Silakan daftar terlebih dahulu."
              );
              break;
            case "form_password_incorrect":
              toast.error("Kata sandi salah. Silakan coba lagi.");
              break;
            case "too_many_attempts":
              toast.error("Terlalu banyak percobaan. Silakan coba lagi nanti.");
              break;
            default:
              toast.error("Terjadi kesalahan. Silakan coba lagi.");
              break;
          }
        } else {
          toast.error("Terjadi kesalahan. Silakan coba lagi.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center hc gap-y-6">
      <Navbar />
      <h1 className="text-2xl font-bold">Sign in</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 px-[20px]"
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={emailAddress}
            disabled={isLoading}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative w-full">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              disabled={isLoading}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              size="icon"
              type="button"
              variant="ghost"
              disabled={isLoading}
              className="absolute top-1 right-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
        <Button size="lg" type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <LoaderIcon className="w-5 h-5 animate-spin" />
          ) : (
            "Sign In"
          )}
        </Button>
        <div className="flex">
          <p className="text-sm text-muted-foreground text-center w-full">
            Belum memiliki akun?{" "}
            <Link href="sign-up" className="text-foreground">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
