import FighterForm from '@/components/admin/FighterForm';
import { createFighter } from '../actions';

export default function NewFighterPage() {
  return (
    <div>
      <h1 className="section-heading text-3xl font-bold text-white">Add Fighter</h1>
      <div className="mt-8 max-w-2xl rounded-lg border border-white/10 bg-white/5 p-6">
        <FighterForm action={createFighter} submitLabel="Add Fighter" />
      </div>
    </div>
  );
}
