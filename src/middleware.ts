import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Membuat pola pencocokan untuk rute yang dimulai dengan '/admin'
const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // Memeriksa apakah rute yang diminta adalah rute admin dan apakah pengguna bukan admin
  if (isAdminRoute(req) && (await auth()).sessionClaims?.metadata?.role !== 'admin') {
    
    // Jika pengguna bukan admin, buat URL baru untuk halaman beranda
    const url = new URL('/', req.url)

    // Mengarahkan pengguna ke halaman beranda
    return NextResponse.redirect(url)
  }
})

export const config = {
  matcher: [
    // Lewati file internal Next.js dan semua file statis, kecuali jika ditemukan dalam parameter pencarian.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Selalu dijalankan untuk rute API.
    "/(api|trpc)(.*)",
  ],
};
