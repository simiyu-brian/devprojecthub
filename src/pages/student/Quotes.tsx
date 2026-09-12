import { FileText } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { EmptyState } from '@/components/dashboard/EmptyState';

export function Quotes() {
  return (
    <div>
      <PageHeader title="Quotes" description="Quotations sent for your project requests." />
      <EmptyState
        icon={FileText}
        title="No quotes yet"
        description="Once your developer reviews your request, a quotation will appear here for you to accept."
      />
    </div>
  );
}
