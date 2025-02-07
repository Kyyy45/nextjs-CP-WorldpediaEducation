# 📌 Capstone Project: Perancangan Web Interaktif Pendaftaran Online  
## 📖 Worldpedia Education  

Project ini dibuat sebagai bagian dari Capstone Project dengan judul:  
**"Perancangan Web Interaktif Pendaftaran Online untuk Bimbingan Belajar Worldpedia Education."**  

Website ini dirancang untuk memudahkan calon siswa dalam mendaftar secara online ke Worldpedia Education, serta menyediakan sistem manajemen data bagi administrator.

## Tech Stack

- **Next.js**: Untuk membangun website berbasis React.  
- **TailwindCSS**: Untuk styling dengan CSS berbasis utility-first.  
- **Shadcn UI**: Untuk komponen UI.  
- **Magic UI**: Untuk komponen UI.  
- **Aceternity UI**: Untuk komponen UI.  
- **Clerk**: Untuk autentikasi pengguna.  
- **MongoDB**: Untuk penyimpanan dan manajemen database.  
- **Cloudinary**: Untuk penyimpanan dan optimasi media.  


## Getting Started

### Pastikan Anda telah menginstal:

- [**Node.js**](https://nodejs.org/)  
- [**Git**](https://git-scm.com/)  
- **npm** (termasuk dalam Node.js) / [**Yarn**](https://yarnpkg.com/) / [**pnpm**](https://pnpm.io/) / [**Bun**](https://bun.sh/)  

### 1. Clone repositori ini:
```sh
 https://github.com/Kyyy45/nextjs-CP-WorldpediaEducation.git
 cd nextjs-CP-WorldpediaEducation
```
### 2. Install dependensi:
```sh
 npm install
```
### 3. Atur variabel env:
```sh
 #database
 DATABASE_URL=
 
 #clerk
 NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
 CLERK_SECRET_KEY=
 NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
 NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
 NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_URL=/
 NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_URL=/

 #cloudinary
 CLOUDINARY_CLOUD_NAME=  
 CLOUDINARY_API_KEY=
 CLOUDINARY_API_SECRET=
```
### 4. Jalankan server:
```sh
 npm run dev
```
### 5. Buka browser dan akses:
```sh
http://localhost:3000
```
