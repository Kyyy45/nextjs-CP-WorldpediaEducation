import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET() {
  try {
    const students = await prisma.pendaftaran.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(students);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Gagal mengambil data siswa' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('buktiPembayaran') as File | null;

    let buktiPembayaranUrl: string | undefined = undefined;
    if (file && file.size > 0) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { message: 'Ukuran file maksimal 5MB' },
          { status: 400 }
        );
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        return NextResponse.json(
          { message: 'File harus berupa gambar' },
          { status: 400 }
        );
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

    const student = await prisma.pendaftaran.create({
      data: studentData
    });
    
    return NextResponse.json({
      message: 'Data siswa berhasil ditambahkan',
      data: student
    }, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Gagal menambahkan data siswa' },
      { status: 500 }
    );
  }
}