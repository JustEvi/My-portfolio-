import AdminLayout from "@/components/layout/admin";
import { Toaster } from "@/components/ui/sonner";

export default function AdminLayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminLayout>{children}</AdminLayout>
      <Toaster />
    </>
  );
}
