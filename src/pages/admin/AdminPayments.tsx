import { DollarSign } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { EmptyState } from '@/components/dashboard/EmptyState';

export function AdminPayments() {
  return (
    <div>
      <PageHeader title="Payments" description="Track invoices and payments across all projects." />
      <EmptyState
        icon={DollarSign}
        title="No payment records connected"
        description="Payment tracking (M-Pesa or otherwise) isn't wired to a backend table yet."
      />
    </div>
  );
}
