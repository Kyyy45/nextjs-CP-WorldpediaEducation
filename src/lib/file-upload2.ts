// import axios from "axios";

// export const uploadFile = async (file: File) => {
//   try {
    
//     const data = { email: "rizkyabr698@gmail.com", password: "terserahaja123" };

//     const token = await axios({
//       method: "post",
//       maxBodyLength: Infinity,
//       url: "http://localhost:4200/login",
//       headers: {},
//       data: JSON.stringify(data),
//     });

//     if (token.status !== 200) {
//       throw new Error("Gagal mendapatkan token untuk storage server");
//     }

//     const t = new FormData();
//     t.append("photo",file);

//     const req = await axios({
//       method: "post",
//       maxBodyLength: Infinity,
//       url: "http://localhost:4200/admin/v1.0-api/upload",
//       headers: {
//         "Authorization": `Bearer ${token.data.token}`,
//       },
//       data: t,
//     });

//     return `/uploads/${req.data.filename}`

//   } catch (error) {
//     console.error("Error uploading file:", error);
//     throw error;
//   }
// };
