"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";
import {  
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Pencil,
  Trash,
  MoreHorizontal,
  Plus,
  Loader,
  Search,
} from "lucide-react";
import { format } from "date-fns";
import { ImageCell } from "@/components/dashboard/image/imageCell";


enum EducationProgram {
  ENGLISH_CLASS = "english-class",
  MANDARIN_CLASS = "mandarin-class",
  BIMBEL_CLASS = "bimbel-class",
  LETTERLAND = "letterland",
  MORNING_CLASS = "morning-class",
  ENGLISH_MASTERY = "english-mastery",
}

const studentSchema = z.object({
  namaSiswa: z.string().min(2, "Nama minimal 2 karakter"),
  tempatLahir: z.string().min(2, "Tempat lahir tidak valid"),
  tanggalLahir: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Tanggal lahir tidak valid"),
  sekolah: z.string().min(2, "Nama sekolah tidak valid"),
  kelas: z.string().min(1, "Kelas harus diisi"),
  alamat: z.string().min(5, "Alamat terlalu pendek"),
  namaAyah: z.string().optional(),
  namaIbu: z.string().optional(),
  alamatOrtu: z.string().optional(),
  noHp: z.string().regex(/^(08|\+62)\d{8,11}$/, "Nomor HP tidak valid"),
  program: z.nativeEnum(EducationProgram),
  buktiPembayaran: z.any().optional(),
});

type StudentFormData = z.infer<typeof studentSchema>;

interface Student extends StudentFormData {
  id: string;
  buktiPembayaran?: string | null;
  createdAt: Date;
}

export default function StudentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState<StudentFormData>({
    namaSiswa: "",
    tempatLahir: "",
    tanggalLahir: "",
    sekolah: "",
    kelas: "",
    alamat: "",
    namaAyah: "",
    namaIbu: "",
    alamatOrtu: "",
    noHp: "",
    program: EducationProgram.BIMBEL_CLASS,
    buktiPembayaran: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleProgramChange = (value: EducationProgram) => {
    setFormData((prev) => ({
      ...prev,
      program: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Ukuran file terlalu besar (maksimal 5MB)");
        e.target.value = "";
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("File harus berupa gambar");
        e.target.value = "";
        return;
      }

      setFormData((prev) => ({
        ...prev,
        buktiPembayaran: file,
      }));
    }
  };

  const validateForm = () => {
    try {
      studentSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      }
      return false;
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/siswa");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Gagal mengambil data siswa");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);


  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus data siswa ini?")) return;
  
    try {
      // First try to delete any associated image
      const student = students.find(s => s.id === id);
      if (student?.buktiPembayaran) {
        try {
          await fetch(`/api/siswa/${id}/image`, {
            method: "DELETE",
          });
        } catch (error) {
          console.error("Error deleting image:", error);
          // Continue with student deletion even if image deletion fails
        }
      }
  
      // Then delete the student data
      const response = await fetch(`/api/siswa/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = "Gagal menghapus data";
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = errorText;
        }
  
        throw new Error(errorMessage);
      }
  
      // Update local state to remove the deleted student
      setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
      toast.success("Data siswa berhasil dihapus!");
    } catch (error) {
      console.error("Error dalam proses delete:", error);
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus data");
    }
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    const formattedDate = new Date(student.tanggalLahir)
      .toISOString()
      .split("T")[0];
    
    setFormData({
      ...student,
      tanggalLahir: formattedDate,
      buktiPembayaran: null 
    });
    
    setIsEdit(true);
    setIsOpen(true);
  };
  
  const resetForm = () => {
    setFormData({
      namaSiswa: "",
      tempatLahir: "",
      tanggalLahir: "",
      sekolah: "",
      kelas: "",
      alamat: "",
      namaAyah: "",
      namaIbu: "",
      alamatOrtu: "",
      noHp: "",
      program: EducationProgram.BIMBEL_CLASS,
      buktiPembayaran: null,
    });
    setIsEdit(false);
    setSelectedStudent(null);
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
  
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (key === "buktiPembayaran" && value instanceof File) {
            formDataToSend.append("buktiPembayaran", value);
          } else {
            formDataToSend.append(key, String(value));
          }
        }
      });
  
      const url = isEdit && selectedStudent
        ? `/api/siswa/${selectedStudent.id}`
        : "/api/siswa";
  
      const response = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        body: formDataToSend,
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Gagal menyimpan data");
      }
  
      await fetchStudents();
      resetForm();
      setIsOpen(false);
      toast.success(`Data siswa berhasil ${isEdit ? "diperbarui" : "ditambahkan"}!`);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan saat menyimpan data");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.namaSiswa.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.sekolah.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.program.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 mt-16 lg:mt-0">
      <h1 className="text-2xl font-bold pb-6 text-zinc-100">Daftar Siswa</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-1/3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari siswa..."
            className="pl-8 flex"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Tambah Siswa
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Tambah Siswa Baru</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <Card>
                  <CardHeader>
                    <CardTitle>Data Siswa</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="namaSiswa">Nama Siswa</Label>
                      <Input
                        id="namaSiswa"
                        value={formData.namaSiswa}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Tempat Tanggal Lahir</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          id="tempatLahir"
                          placeholder="Tempat Lahir"
                          value={formData.tempatLahir}
                          onChange={handleChange}
                        />
                        <Input
                          id="tanggalLahir"
                          type="date"
                          value={formData.tanggalLahir}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sekolah">Sekolah</Label>
                      <Input
                        id="sekolah"
                        value={formData.sekolah}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="kelas">Kelas</Label>
                      <Input
                        id="kelas"
                        value={formData.kelas}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2 col-span-full">
                      <Label htmlFor="alamat">Alamat</Label>
                      <Textarea
                        id="alamat"
                        value={formData.alamat}
                        onChange={handleChange}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Data Orang Tua</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="namaAyah">Nama Ayah</Label>
                      <Input
                        id="namaAyah"
                        value={formData.namaAyah}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="namaIbu">Nama Ibu</Label>
                      <Input
                        id="namaIbu"
                        value={formData.namaIbu}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2 col-span-full">
                      <Label htmlFor="alamatOrtu">Alamat Orang Tua</Label>
                      <Textarea
                        id="alamatOrtu"
                        value={formData.alamatOrtu}
                        onChange={handleChange}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Informasi Tambahan</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="noHp">No. Handphone (WhatsApp)</Label>
                      <Input
                        id="noHp"
                        value={formData.noHp}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="program">Program yang diikuti</Label>
                      <Select
                        value={formData.program}
                        onValueChange={handleProgramChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Program" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(EducationProgram).map((program) => (
                            <SelectItem key={program} value={program}>
                              {program
                                .replace(/-/g, " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase())}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="buktiPembayaran">
                        Bukti Pembayaran (Opsional)
                      </Label>
                      <Input
                        id="buktiPembayaran"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                  </CardContent>
                </Card>

                <DialogFooter className="mt-6">
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <Loader className="animate-spin mr-2 h-4 w-4" />
                  ) : (
                    "Simpan"
                  )}
                </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="border-collapse border-spacing-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Nama Siswa</TableHead>
              <TableHead className="text-center">Tempat Lahir</TableHead>
              <TableHead className="text-center">Tanggal Lahir</TableHead>
              <TableHead className="text-center">Sekolah</TableHead>
              <TableHead className="text-center">Kelas</TableHead>
              <TableHead className="text-center">Alamat</TableHead>
              <TableHead className="text-center">Nama Ayah</TableHead>
              <TableHead className="text-center">Nama Ibu</TableHead>
              <TableHead className="text-center">Alamat Orang Tua</TableHead>
              <TableHead className="text-center">No. HP</TableHead>
              <TableHead className="text-center">Program</TableHead>
              <TableHead className="text-center">Bukti Pembayaran</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={13} className="text-center py-10">
                  Tidak ada data siswa
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="text-center">
                    {student.namaSiswa}
                  </TableCell>
                  <TableCell className="text-center">
                    {student.tempatLahir}
                  </TableCell>
                  <TableCell className="text-center">
                    {format(new Date(student.tanggalLahir), "d MMMM yyyy")}
                  </TableCell>
                  <TableCell className="text-center">
                    {student.sekolah}
                  </TableCell>
                  <TableCell className="text-center">{student.kelas}</TableCell>
                  <TableCell className="text-center">
                    {student.alamat}
                  </TableCell>
                  <TableCell className="text-center">
                    {student.namaAyah}
                  </TableCell>
                  <TableCell className="text-center">
                    {student.namaIbu}
                  </TableCell>
                  <TableCell className="text-center">
                    {student.alamatOrtu}
                  </TableCell>
                  <TableCell className="text-center">{student.noHp}</TableCell>
                  <TableCell className="text-center">
                    {student.program
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </TableCell>
                  <TableCell className="place-items-center text-center">
                    <ImageCell 
                        student={student} 
                        onUpdate={fetchStudents} 
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(student)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(student.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

