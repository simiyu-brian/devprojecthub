import { CreditCard } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { EmptyState } from '@/components/dashboard/EmptyState';

export function Payments() {
  return (
    <div>
      <PageHeader title="Payments" description="Track invoices and payments for your project." />
      <EmptyState
        icon={CreditCard}
        title="No payments recorded"
        description="Payment tracking isn't connected yet. You'll see invoices and payment status here once it is."
      />
    </div>
  );
}
