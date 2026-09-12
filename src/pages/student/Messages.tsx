import { useState, FormEvent } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { useMyProject } from '@/hooks/useMyProject';
import { useMessages } from '@/hooks/useMessages';

export function Messages() {
  const { project, loading: projectLoading } = useMyProject();
  const { messages, loading, sending, send } = useMessages(project?.id);
  const [draft, setDraft] = useState('');

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    await send(draft);
    setDraft('');
  };

  if (projectLoading) {
    return <p className="text-sm text-muted">Loading…</p>;
  }

  if (!project) {
    return (
      <div>
        <PageHeader title="Messages" description="Your conversation with your developer." />
        <EmptyState
          icon={MessageSquare}
          title="No active project yet"
          description="Once your project is approved, you'll be able to message your developer here."
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Messages" description="Your conversation with your developer." />

      <div className="card flex h-[65vh] flex-col">
        <div className="flex-1 space-y-4 overflow-y-auto scrollbar-thin p-6">
          {loading && <p className="text-sm text-muted">Loading messages…</p>}
          {!loading && messages.length === 0 && (
            <p className="text-sm text-muted">No messages yet — say hello!</p>
          )}
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender_role === 'student' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-md rounded-2xl px-4 py-2.5 text-sm ${
                  m.sender_role === 'student'
                    ? 'bg-electric-600 text-white'
                    : 'bg-navy-50 text-navy-800'
                }`}
              >
                <p>{m.content}</p>
                <p className={`mt-1 text-[11px] ${m.sender_role === 'student' ? 'text-electric-100' : 'text-navy-400'}`}>
                  {new Date(m.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} className="flex items-center gap-3 border-t border-navy-100 p-4">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type a message…"
            className="input"
          />
          <button type="submit" disabled={sending} className="btn-primary btn-sm flex-shrink-0">
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
