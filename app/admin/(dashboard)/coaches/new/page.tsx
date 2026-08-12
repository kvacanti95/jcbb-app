import CoachForm from '@/components/admin/CoachForm';
import { createCoach } from '../actions';

export default function NewCoachPage() {
  return (
    <div>
      <h1 className="section-heading text-3xl font-bold text-white">Add Coach</h1>
      <div className="mt-8 max-w-2xl rounded-lg border border-white/10 bg-white/5 p-6">
        <CoachForm action={createCoach} submitLabel="Add Coach" />
      </div>
    </div>
  );
}
