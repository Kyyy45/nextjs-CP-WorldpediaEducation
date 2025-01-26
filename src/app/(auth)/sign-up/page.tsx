/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState } from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { toast } from 'sonner';
import { Eye, EyeOff, LoaderIcon } from "lucide-react";
import Link from "next/link";
import Navbar from '@/components/navigation/navbar';

const SignUpPage = () => {

  const { isLoaded, signUp, setActive } = useSignUp();

  const router = useRouter();

  const [name, setName] = useState<string>('');
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [code, setCode] = useState<string>(''); 
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    if (!name || !emailAddress || !password) {
      return toast.warning("Tolong isi semua kolom");
    }

    setIsLoading(true);

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      setVerified(true);

      await signUp.update({
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1],
      });
    } catch (error: any) {
      console.error(JSON.stringify(error, null, 2));

      switch (error.errors[0]?.code) {
        case "form_identifier_exists":
          toast.error("Email ini sudah terdaftar. Silakan masuk.");
          break;
        case "form_password_pwned":
          toast.error("Kata sandinya terlalu umum. Silakan pilih kata sandi yang lebih kuat.");
          break;
        case "form_param_format_invalid":
          toast.error("Alamat email tidak valid. Silakan masukkan alamat email yang valid.");
          break;
        case "form_password_length_too_short":
          toast.error("Kata sandi terlalu pendek. Silakan pilih kata sandi yang lebih panjang.");
          break;
        default:
          toast.error("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    if (!code) {
      return toast.warning("Kode verifikasi diperlukan");
    }

    setIsVerified(true);

    try {
        const completeSignUp = await signUp.attemptEmailAddressVerification({
            code,
        });

        if (completeSignUp.status === 'complete') {
            await setActive({ session: completeSignUp.createdSessionId });
            router.push('/auth-callback');
        } else {
            console.error(JSON.stringify(completeSignUp, null, 2));
            toast.error("Kode verifikasi tidak valid");
        }
    } catch (error: any) {
        console.error('Error:', JSON.stringify(error, null, 2));
        toast.error("Terjadi kesalahan. Kode verifikasi tidak valid");
    } finally {
        setIsVerified(false);
    }
  }

  return verified ? (
    <div className="flex flex-col items-center justify-center hc gap-y-6 max-w-sm mx-auto text-center">
      <h1 className="text-2xl text-center font-bold">
        Silakan periksa email anda
      </h1>
      <p className="text-sm text-muted-foreground mt-2">
        Kami telah mengirimkan kode verifikasi ke {emailAddress}
      </p>
      <form onSubmit={handleVerify} className="w-full max-w-sm space-y-4">
        <div className="space-y-2">
          <Label htmlFor="code">
            Kode verifikasi
          </Label>
          <InputOTP
            id="code"
            maxLength={6}
            value={code}
            disabled={isVerified}
            onChange={(e) => setCode(e)}
            className="pt-2"
          >
            <InputOTPGroup className="justify-center w-full">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button
          size="lg"
          type="submit"
          disabled={isVerified}
          className="w-full"
        >
          {isVerified ? (
            <LoaderIcon className="w-5 h-5 animate-spin" />
          ) : "Lanjutkan"}
        </Button>
        <div className="flex">
          <p className="text-sm text-muted-foreground text-center w-full">
            Kembali ke
            <Button
              size="sm"
              variant="link"
              type="button"
              disabled={isVerified}
              onClick={() => setVerified(false)}
            >
              sign up
            </Button>
          </p>
        </div>
      </form>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center hc gap-y-6">
      <Navbar/>
      <h1 className="text-2xl text-center font-bold">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 px-[20px]">
        <div className="space-y-2">
          <Label htmlFor="name">
            Nama lengkap
          </Label>
          <Input
            id="name"
            type="text"
            name="name"
            value={name}
            disabled={isLoading}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Masukkan nama anda"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">
            Alamat email
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={emailAddress}
            disabled={isLoading}
            onChange={(e) => setEmailAddress(e.target.value)}
            placeholder="Masukkan alamat email anda"
            
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">
            Kata sandi
          </Label>
          <div className="relative w-full">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan kata sandi anda"
            />

            <div id="clerk-captcha"></div>

            <Button
              type="button"
              size="icon"
              variant="ghost"
              disabled={isLoading}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1 right-1"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" /> 
              )}
            </Button>
          </div>
        </div>
        <Button
          size="lg"
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <LoaderIcon className="w-5 h-5 animate-spin" />
          ) : "Sign Up"}
        </Button>
        <div className="flex">
          <p className="text-sm text-muted-foreground text-center w-full">
            Sudah menjadi anggota? <Link href="/sign-in" className="text-foreground">Sign in</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SignUpPage