  "use client";

  import { useState, useEffect } from "react";
  import { toast } from "sonner";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
  import { Loader, Search, MoreHorizontal, ArrowUpDown } from "lucide-react";
  import { format } from "date-fns";
  import { id } from 'date-fns/locale';

  interface User {
    id: string;
    clerkId?: string;
    email: string;
    firstName?: string;
    lastName?: string;
    profileImageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
  }

  // Fungsi untuk mendapatkan inisial dari nama pengguna
  function getInitials(firstName?: string, lastName?: string): string {
    if (!firstName && !lastName) return '?';
    
    let initials = '';
    if (firstName) initials += firstName[0].toUpperCase();
    if (lastName) initials += lastName[0].toUpperCase();
    return initials;
  }

  // Fungsi untuk mendapatkan warna latar belakang avatar berdasarkan nama
  function getAvatarColor(name: string): string {
    const colors = [
      'bg-red-500',
      'bg-green-500',
      'bg-blue-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500'
    ];
    
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  }

  export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Gagal mengambil data pengguna");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchUsers();
    }, []);

    const deleteUser = async (userId: string) => {
      if (!confirm("Yakin ingin menghapus pengguna ini?")) return;
    
      try {
        // Hapus dari database dan Clerk melalui API route
        const response = await fetch(`/api/users/${userId}`, {
          method: "DELETE",
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Gagal menghapus pengguna");
        }
    
        await fetchUsers(); // Refresh data
        toast.success("Pengguna berhasil dihapus!");
      } catch (error) {
        console.error("Error:", error);
        toast.error(error instanceof Error ? error.message : "Gagal menghapus pengguna");
      }
    };
    
        
    const toggleSortOrder = () => {
      setSortOrder(prevOrder => prevOrder === "asc" ? "desc" : "asc");
    };

    const filteredAndSortedUsers = users
      .filter(user => {
        const fullName = `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase();
        const email = user.email.toLowerCase();
        const query = searchQuery.toLowerCase();
        return fullName.includes(query) || email.includes(query);
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Loader className="animate-spin" />
        </div>
      );
    }

    return (
      <div className="p-4 mt-16 lg:mt-0">
        <h1 className="text-2xl font-bold pb-6 text-zinc-100">Daftar Users</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-2 top-1/3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari pengguna..."
              className="pl-8 flex"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="border-collapse border-spacing-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pengguna</TableHead>
                <TableHead className="text-center">Terakhir Masuk</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={toggleSortOrder}
                    className="flex items-center space-x-2"
                  >
                    <span>Bergabung</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10">
                    Tidak ada data pengguna
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={user.profileImageUrl || ''}
                            alt={`${user.firstName} ${user.lastName}`}
                          />
                          <AvatarFallback className={`${getAvatarColor(`${user.firstName} ${user.lastName}`)} text-white`}>
                            {getInitials(user.firstName, user.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {user.firstName} {user.lastName}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {format(new Date(user.updatedAt), "d MMMM yyyy", { locale: id })}
                    </TableCell>
                    <TableCell>
                      {format(new Date(user.createdAt), "d MMMM yyyy", { locale: id })}
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => deleteUser(user.id)}
                          >
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