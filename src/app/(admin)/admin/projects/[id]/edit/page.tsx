import AdminEditProjectPage from "@/components/pages/admin/projects/edit";

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AdminEditProjectPage projectId={id} />;
}
