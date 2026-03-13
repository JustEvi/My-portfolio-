import AdminEditProjectPage from "@/components/pages/admin/projects/edit";

export default function EditProject({ params }: { params: { id: string } }) {
  return <AdminEditProjectPage projectId={params.id} />;
}
