# 📌 Capstone Project 
## 📖 Worldpedia Education  

Project ini dibuat sebagai bagian dari Capstone Project dengan judul:  
**"Perancangan Web Interaktif Pendaftaran Online untuk Bimbingan Belajar Worldpedia Education."**  

Website ini dirancang untuk memudahkan calon siswa dalam mendaftar secara online ke Worldpedia Education, serta menyediakan sistem manajemen data bagi administrator.  

🚀 **Teknologi yang Digunakan:**  
- **Next.js**: Untuk membangun website berbasis React.  
- **TailwindCSS**: Untuk styling dengan CSS berbasis utility-first.  
- **Shadcn UI**: Untuk komponen UI.  
- **Magic UI**: Untuk komponen UI.  
- **Aceternity UI**: Untuk komponen UI.  
- **Clerk**: Untuk autentikasi pengguna.  
- **MongoDB**: Untuk penyimpanan dan manajemen database.  
- **Prisma**: ORM untuk mengelola interaksi dengan database.  
- **Cloudinary**: Untuk penyimpanan dan optimasi media.  

💡 **Fitur Utama:**  
- Pendaftaran siswa secara online.  
- Sistem manajemen data melalui dashboard admin.  
- Integrasi dengan WhatsApp untuk komunikasi langsung.  

📌 **Cara Menjalankan Proyek:**  
1. Clone repositori ini:  
    ```sh
    https://github.com/Kyyy45/nextjs-CP-WorldpediaEducation.git
    cd nextjs-CP-WorldpediaEducation
    ```
2. Install dependensi:  
    ```sh
    npm install
    ```
3. Atur variabel lingkungan (env):  
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
4. Setup Prisma:  
    ```sh
    npx prisma init
    npx prisma generate
    npx prisma db push 
    ```
5. Jalankan server pengembangan:  
    ```sh
    npm run dev
    ```
6. Buka browser dan akses: [http://localhost:3000](http://localhost:3000)

// Tambahan untuk perubahan setelah CP
Update pada HeroSection.tsx yaitu menambahkan nomor WA

Update pada FooterSection.tsx yaitu menambahkan nomor WA, IG, dan Update untuk alamat terbaru, serta icon map.svg

Update pada ProgramSection.tsx dan card-hover-effect pada ui components yaitu menambahkan pricelist dan detail lainnya.


