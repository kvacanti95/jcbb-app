import PageForm from '@/components/admin/PageForm';
import { createPage } from '../actions';

export default function NewPagePage() {
  return (
    <div>
      <h1 className="section-heading text-3xl font-bold text-white">Add Page</h1>
      <div className="mt-8 max-w-2xl rounded-lg border border-white/10 bg-white/5 p-6">
        <PageForm action={createPage} submitLabel="Create Page" />
      </div>
    </div>
  );
}
