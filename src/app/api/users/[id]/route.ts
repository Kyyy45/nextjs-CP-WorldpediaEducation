import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { message: "ID tidak ditemukan" },
        { status: 400 }
      );
    }

    // 1. Dapatkan user dari database
    const user = await prisma.user.findUnique({
      where: { id: String(id) },
      select: { clerkId: true }
    });

    if (!user) {
      return NextResponse.json(
        { message: "Pengguna tidak ditemukan" },
        { status: 404 }
      );
    }

    // 2. Hapus dari database
    await prisma.user.delete({
      where: { id: String(id) }
    });

    // 3. Hapus dari Clerk jika ada clerkId
    if (user.clerkId) {
      try {
        await clerkClient.users.deleteUser(user.clerkId);
      } catch (error) {
        console.error("Kesalahan saat menghapus dari Clerk:", error);
        return NextResponse.json(
          { message: "Berhasil hapus dari database tapi gagal hapus dari Clerk" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { message: "Pengguna berhasil dihapus" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Gagal menghapus pengguna" },
      { status: 500 }
    );
  }
}