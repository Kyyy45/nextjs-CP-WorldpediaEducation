import Sidebar from "@/components/dashboard/sidebar/sidebar";
import { checkRole } from "@/lib/roles";
import ErrorPage from "../AccessDenied";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await checkRole("admin");
  if (!isAdmin) {
    return <ErrorPage />;
  }

  return (
    <div className="h-full relative">
      <div className="flex">
        <Sidebar />
      </div>
      <main className="lg:ml-64">{children}</main>
    </div>
  );
}
