import { Paperclip } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { EmptyState } from '@/components/dashboard/EmptyState';

export function Files() {
  return (
    <div>
      <PageHeader title="Files" description="Deliverables and shared files for your project." />
      <EmptyState
        icon={Paperclip}
        title="No files shared yet"
        description="File sharing isn't wired up yet — your developer will send deliverables via Messages until this is enabled."
      />
    </div>
  );
}
