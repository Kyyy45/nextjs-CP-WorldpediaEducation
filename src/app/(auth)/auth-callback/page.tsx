import db from "@/lib/db";
import { currentUser  } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation';

const AuthCallbackPage = async () => {
    // Ambil informasi pengguna saat ini
    const user = await currentUser ();
    
    // Log informasi pengguna
    console.log("Pengguna Saat Ini:", user);

    // Cek apakah pengguna valid
    if (!user?.id || !user?.primaryEmailAddress?.emailAddress) {
        console.log("Pengguna tidak valid, mengalihkan ke /sign-in");
        return redirect("/sign-in");
    }

    // Cari pengguna di database
    const dbUser  = await db.user.findFirst({
        where: {
            clerkId: user.id,
        },
    });

    // Log hasil pencarian pengguna di database
    console.log("Pengguna di Database:", dbUser );

    // Jika pengguna tidak ditemukan, buat pengguna baru
    if (!dbUser ) {
        console.log("Pengguna tidak ditemukan di database, membuat pengguna baru.");
        await db.user.create({
            data: {
                id: user.id,
                clerkId: user.id,
                email: user.primaryEmailAddress.emailAddress,
                firstName: user.firstName,
                lastName: user.lastName,
            }
        });

        console.log("Pengguna baru dibuat, mengalihkan ke halaman utama");
    }
    return redirect("/");
};

export default AuthCallbackPage;