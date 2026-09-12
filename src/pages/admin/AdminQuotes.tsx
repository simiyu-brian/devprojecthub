import { FileText } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { EmptyState } from '@/components/dashboard/EmptyState';

export function AdminQuotes() {
  return (
    <div>
      <PageHeader title="Quotes" description="Draft and track quotations sent to students." />
      <EmptyState
        icon={FileText}
        title="Quote builder not connected yet"
        description="Quote generation isn't wired to a backend table yet — this is the next piece to build after project requests."
      />
    </div>
  );
}
