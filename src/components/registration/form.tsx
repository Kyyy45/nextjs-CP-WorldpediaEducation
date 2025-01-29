"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Definisi Enum untuk Program
enum EducationProgram {
  ENGLISH_CLASS = "english-class",
  MANDARIN_CLASS = "mandarin-class",
  BIMBEL_CLASS = "bimbel-class",
  LETTERLAND = "letterland",  
  MORNING_CLASS = "morning-class",
  ENGLISH_MASTERY = "english-mastery",
}

// Skema Validasi Zod
const RegistrationSchema = z.object({
  namaSiswa: z.string().min(2, "Nama minimal 2 karakter"),
  tempatLahir: z.string().min(2, "Tempat lahir tidak valid"),
  tanggalLahir: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Tanggal lahir tidak valid"),
  sekolah: z.string().min(2, "Nama sekolah tidak valid"),
  kelas: z.string().min(1, "Kelas harus diisi"),
  alamat: z.string().min(5, "Alamat terlalu pendek"),
  namaAyah: z.string().optional(),
  namaIbu: z.string().optional(),
  alamatOrtu: z.string().min(5, "Alamat terlalu pendek"),
  noHp: z.string().regex(/^(08|\+62)\d{8,11}$/, "Nomor HP tidak valid"),
  program: z.nativeEnum(EducationProgram, {
    errorMap: () => ({ message: "Pilihan program wajib diisi" }),
  }),
});

// Tipe untuk data formulir
type RegistrationFormData = z.infer<typeof RegistrationSchema>;

const RegistrationForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormData>({
    namaSiswa: "",
    tempatLahir: "",
    tanggalLahir: "",
    sekolah: "",
    kelas: "",
    alamat: "",
    namaAyah: "",
    namaIbu: "",
    alamatOrtu: "",
    noHp: "",
    program: "" as EducationProgram,
  });

  // Handler untuk perubahan Input umum
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handler khusus untuk select program
  const handleProgramChange = (value: EducationProgram) => {
    setFormData((prev) => ({
      ...prev,
      program: value,
    }));
  };

  // Fungsi validasi formulir
  const validateForm = () => {
    try {
      RegistrationSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      }
      return false;
    }
  };

  // Handler submit formulir
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validasi formulir
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/pendaftaran", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tanggalLahir: new Date(formData.tanggalLahir),
        }),
      });

      if (response.ok) {
        toast.success("Pendaftaran Berhasil!");
        setShowSuccessNotification(true);
        setTimeout(() => {
          setShowSuccessNotification(false);
          router.push("/");
        }, 5000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Gagal mendaftar");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Terjadi kesalahan saat mendaftar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-32">
      <div className="flex flex-col items-center justify-center mx-auto">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="logo" width={36} height={38} />
          <span className="text-transparent bg-gradient-to-r from-[#FFED00] to-[#FFF05F] text-xl font-semibold bg-clip-text inline-block">
            Worldpedia
            <br />
            Education
          </span>
        </div>
        <div className="flex text-center">
          <span className="text-xl md:text-2xl lg:text-3xl font-semibold text-transparent bg-gradient-to-b from-zinc-200 to-zinc-400 bg-clip-text pt-4 pb-4">
            Pendaftaran Bimbel Worldpedia Education
          </span>
        </div>
      </div>

      {showSuccessNotification && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-3 px-6 rounded-md shadow-xl shadow-green-500/50">
          <span>
            Pendaftaran Berhasil! Silahkan Konfirmasi Kembali Melalui WhatsApp
            Kami
          </span>
        </div>
      )}

      <div className="max-w-5xl mx-auto p-6 bg-zinc-300 rounded-lg shadow">
        <h1 className="text-xl font-semibold mb-6 text-zinc-800">Data Diri</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama Siswa */}
          <div className="space-y-2">
            <Label htmlFor="namaSiswa" className="text-base font-medium text-gray-700">
              Nama Siswa
            </Label>
            <Input
              type="text"
              id="namaSiswa"
              value={formData.namaSiswa}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-yellow-500 focus:ring-yellow-500"
              placeholder="Masukkan nama lengkap anda"
              required
            />
          </div>

          {/* Tempat Tanggal Lahir */}
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:gap-4">
            <div className="w-full sm:w-1/2 space-y-2">
              <Label htmlFor="tempatLahir" className="text-base font-medium text-gray-700">
                Tempat Lahir
              </Label>
              <Input
                type="text"
                id="tempatLahir"
                value={formData.tempatLahir}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-yellow-500 focus:ring-yellow-500"
                placeholder="Masukkan tempat lahir anda"
                required
              />
            </div>
            <div className="w-full sm:w-1/2 space-y-2">
              <Label htmlFor="tanggalLahir" className="text-base font-medium text-gray-700">
                Tanggal Lahir
              </Label>
              <Input
                type="date"
                id="tanggalLahir"
                value={formData.tanggalLahir}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-yellow-500 focus:ring-yellow-500 [&::-webkit-calendar-picker-indicator]:bg-transparent"
                style={{
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  appearance: 'none'
                }}
                required
              />
            </div>
          </div>

          {/* Sekolah */}
          <div className="space-y-2">
            <Label htmlFor="sekolah" className="text-base font-medium text-gray-700">
              Sekolah
            </Label>
            <Input
              type="text"
              id="sekolah"
              value={formData.sekolah}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-yellow-500 focus:ring-yellow-500"
              placeholder="Masukkan asal sekolah anda"
              required
            />
          </div>

          {/* Kelas */}
          <div className="space-y-2">
            <Label htmlFor="kelas" className="text-base font-medium text-gray-700">
              Kelas
            </Label>
            <Input
              type="text"
              id="kelas"
              value={formData.kelas}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-yellow-500 focus:ring-yellow-500"
              placeholder="Masukkan tingkat kelas anda"
              required
            />
          </div>

          {/* Alamat */}
          <div className="space-y-2">
            <Label htmlFor="alamat" className="text-base font-medium text-gray-700">
              Alamat
            </Label>
            <Textarea
              id="alamat"
              value={formData.alamat}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-yellow-500 focus:ring-yellow-500"
              placeholder="Masukkan alamat anda"
              required
            />
          </div>

          {/* Nama Orang Tua */}
          <div className="space-y-2">
            <Label className="text-base font-medium text-gray-700">
              Nama Orang Tua
            </Label>
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:gap-4">
              <div className="w-full sm:w-1/2">
                <Label className="text-base text-gray-600">Ayah</Label>
                <Input
                  type="text"
                  id="namaAyah"
                  value={formData.namaAyah}
                  onChange={handleChange}
                  placeholder="Masukkan nama ayah anda"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <Label className="text-base text-gray-600">Ibu</Label>
                <Input
                  type="text"
                  id="namaIbu"
                  value={formData.namaIbu}
                  onChange={handleChange}
                  placeholder="Masukkan nama ibu anda"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>
            </div>
          </div>

          {/* Alamat Orang Tua */}
          <div className="space-y-2">
            <Label htmlFor="alamatOrtu" className="text-base font-medium text-gray-700">
              Alamat Orang Tua
            </Label>
            <Textarea
              id="alamatOrtu"
              value={formData.alamatOrtu}
              onChange={handleChange}
              rows={3}
              placeholder="Masukkan alamat orang tua anda"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-yellow-500 focus:ring-yellow-500"
              required
            />
          </div>

          {/* No. Handphone */}
          <div className="space-y-2">
            <Label htmlFor="noHp" className="text-base font-medium text-gray-700">
              No. Handphone (WhatsApp)
            </Label>
            <Input
              type="tel"
              id="noHp"
              value={formData.noHp}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-yellow-500 focus:ring-yellow-500"
              placeholder="Masukkan nomor whatsapp anda"
              required
            />
          </div>

          {/* Program yang dibeli */}
          <div className="space-y-2">
            <Label htmlFor="program" className="text-base font-medium text-gray-700">
              Program yang dibeli <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.program}
              onValueChange={handleProgramChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Program Bimbel" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(EducationProgram).map((program) => (
                  <SelectItem key={program} value={program}>
                    {program
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Form Actions */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FFED00] hover:bg-[#FFF05F] text-primary-foreground shadow-sm"
            >
              {loading ? (
                <Loader className="animate-spin" size={18} />
              ) : (
                "Daftar"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;