// /api/siswa/[id]/image/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { unlink } from "fs/promises";
import { join } from "path";

/**
 * API endpoint untuk menghapus gambar bukti pembayaran siswa
 * Method: DELETE
 * Route: /api/siswa/[id]/image
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    // Cek apakah data siswa ada
    const student = await prisma.pendaftaran.findUnique({
      where: { id },
    });

    // Jika siswa atau bukti pembayaran tidak ditemukan
    if (!student || !student.buktiPembayaran) {
      return NextResponse.json(
        { message: "Gambar tidak ditemukan" },
        { status: 404 }
      );
    }

    // Hapus file dari sistem
    const filePath = join(
      process.cwd(),
      "public",
      student.buktiPembayaran.replace(/^\//, "")
    );

    try {
      // Mencoba menghapus file fisik
      await unlink(filePath);
    } catch (error) {
      console.error("Error saat menghapus file:", error);
      // Lanjutkan eksekusi meskipun file tidak ditemukan
      // Karena kita masih perlu menghapus referensi di database
    }

    // Update data siswa untuk menghapus referensi gambar
    await prisma.pendaftaran.update({
      where: { id },
      data: {
        buktiPembayaran: null,
      },
    });

    // Kembalikan response sukses
    return NextResponse.json({
      message: "Gambar berhasil dihapus",
      status: 200,
    });
  } catch (error) {
    // Handle error
    console.error("Error:", error);
    return NextResponse.json(
      {
        message: "Terjadi kesalahan saat menghapus gambar",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Tambahkan method GET untuk mengecek status gambar (opsional)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const student = await prisma.pendaftaran.findUnique({
      where: { id },
      select: {
        buktiPembayaran: true,
      },
    });

    if (!student) {
      return NextResponse.json(
        { message: "Data siswa tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      hasImage: !!student.buktiPembayaran,
      imagePath: student.buktiPembayaran,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Gagal mengambil informasi gambar" },
      { status: 500 }
    );
  }
}