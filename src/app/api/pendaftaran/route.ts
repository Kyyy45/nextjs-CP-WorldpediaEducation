import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const registration = await prisma.pendaftaran.create({
      data: {
        ...body,
        tanggalLahir: new Date(body.tanggalLahir),
        program: body.program.toString(),
      }
    })

    return NextResponse.json(
      { 
        success: true,
        message: 'Pendaftaran berhasil',
        data: registration 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { 
        success: false,
        message: 'Terjadi kesalahan saat memproses pendaftaran' 
      },
      { status: 500 }
    )
  }
}

// export async function GET() {
//   try {
//     const registrations = await prisma.pendaftaran.findMany({
//       orderBy: {
//         createdAt: 'desc'
//       }
//     })

//     return NextResponse.json(
//       {
//         success: true,
//         data: registrations
//       },
//       { status: 200 }
//     )
//   } catch (error) {
//     console.error('Error fetching registrations:', error)
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Gagal mengambil data pendaftaran'
//       },
//       { status: 500 }
//     )
//   }
// }