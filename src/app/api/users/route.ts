import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil data pengguna" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(deletedUser);
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menghapus pengguna" },
      { status: 500 }
    );
  }
}