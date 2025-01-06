import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { deleteFromCloudinary } from "@/lib/cloudinary";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const student = await prisma.pendaftaran.findUnique({
      where: { id },
    });

    if (!student || !student.buktiPembayaran) {
      return NextResponse.json(
        { message: "Gambar tidak ditemukan" },
        { status: 404 }
      );
    }

    await deleteFromCloudinary(student.buktiPembayaran);

    await prisma.pendaftaran.update({
      where: { id },
      data: {
        buktiPembayaran: null,
      },
    });

    return NextResponse.json({
      message: "Gambar berhasil dihapus",
      status: 200,
    });
  } catch (error) {
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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

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