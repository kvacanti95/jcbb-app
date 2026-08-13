import ClassForm from '@/components/admin/ClassForm';
import { createClass } from '../actions';

export default function NewClassPage() {
  return (
    <div>
      <h1 className="section-heading text-3xl font-bold text-white">Add Class</h1>
      <div className="mt-8 max-w-2xl rounded-lg border border-white/10 bg-white/5 p-6">
        <ClassForm action={createClass} submitLabel="Add Class" />
      </div>
    </div>
  );
}
