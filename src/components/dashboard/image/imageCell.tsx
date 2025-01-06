import React, { useState } from "react";
import Image from "next/image";
import { Trash, Loader } from "lucide-react";
import { toast } from "sonner";

interface ImageCellProps {
  student: {
    id: string;
    buktiPembayaran?: string | null;
  };
  onUpdate: () => Promise<void>;
}

export function ImageCell({ student, onUpdate }: ImageCellProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteImage = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!confirm("Apakah Anda yakin ingin menghapus gambar ini?")) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/siswa/${student.id}/image`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Gagal menghapus gambar");
      }

      await onUpdate();
      toast.success("Gambar berhasil dihapus");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "Gagal menghapus gambar");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!student.buktiPembayaran) {
    return <span className="text-muted-foreground text-center">Belum ada</span>;
  }

  return (
    <div className="relative group flex items-center justify-center">
      <div className="relative w-[50px] h-[50px]">
        <Image
          src={student.buktiPembayaran}
          alt="Bukti Pembayaran"
          fill
          className="object-cover rounded cursor-pointer transition-opacity group-hover:opacity-75"
          onClick={() => window.open(student.buktiPembayaran!, "_blank")}
        />
      </div>
      <button
        onClick={handleDeleteImage}
        disabled={isDeleting}
        className="absolute top-0 right-0 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 disabled:opacity-50"
        title="Hapus gambar"
      >
        {isDeleting ? (
          <Loader className="h-3 w-3 animate-spin" />
        ) : (
          <Trash className="h-3 w-3" />
        )}
      </button>
    </div>
  );
}