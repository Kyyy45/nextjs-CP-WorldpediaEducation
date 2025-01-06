import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const student = await prisma.pendaftaran.findUnique({
      where: { id },
    });

    if (!student) {
      return NextResponse.json(
        { message: "Data siswa tidak ditemukan" },
        { status: 404 }
      );
    }

    if (student.buktiPembayaran) {
      await deleteFromCloudinary(student.buktiPembayaran);
    }

    await prisma.pendaftaran.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Data siswa berhasil dihapus",
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        message: "Terjadi kesalahan saat menghapus data siswa",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const formData = await request.formData();
    const file = formData.get('buktiPembayaran') as File | null;

    let buktiPembayaranUrl: string | undefined = undefined;
    
    if (file && file.size > 0) {
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { message: 'Ukuran file maksimal 5MB' },
          { status: 400 }
        );
      }

      if (!file.type.startsWith('image/')) {
        return NextResponse.json(
          { message: 'File harus berupa gambar' },
          { status: 400 }
        );
      }

      const existingStudent = await prisma.pendaftaran.findUnique({
        where: { id },
        select: { buktiPembayaran: true },
      });

      if (existingStudent?.buktiPembayaran) {
        await deleteFromCloudinary(existingStudent.buktiPembayaran);
      }

      buktiPembayaranUrl = await uploadToCloudinary(file) as string;
    }

    const studentData = {
      namaSiswa: formData.get('namaSiswa') as string,
      tempatLahir: formData.get('tempatLahir') as string,
      tanggalLahir: new Date(formData.get('tanggalLahir') as string),
      sekolah: formData.get('sekolah') as string,
      kelas: formData.get('kelas') as string,
      alamat: formData.get('alamat') as string,
      namaAyah: formData.get('namaAyah') as string,
      namaIbu: formData.get('namaIbu') as string,
      alamatOrtu: formData.get('alamatOrtu') as string,
      noHp: formData.get('noHp') as string,
      program: formData.get('program') as string,
      ...(buktiPembayaranUrl && { buktiPembayaran: buktiPembayaranUrl }),
    };

    const updatedStudent = await prisma.pendaftaran.update({
      where: { id },
      data: studentData,
    });

    return NextResponse.json({
      message: 'Data siswa berhasil diperbarui',
      data: updatedStudent,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}