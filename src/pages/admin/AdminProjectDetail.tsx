import { useEffect, useState, FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Plus, Send, Trash2, AlertCircle,
} from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ProgressBar } from '@/components/ui/Progress';
import { supabase } from '@/lib/supabase';
import { useMilestones } from '@/hooks/useMilestones';
import { useMessages } from '@/hooks/useMessages';
import type { ProjectRow } from '@/hooks/useMyProject';

const projectStatuses = [
  'New', 'Under Review', 'Approved', 'In Development', 'Testing', 'Ready for Handover', 'Completed', 'Cancelled',
];
const milestoneStatuses = ['pending', 'in-progress', 'completed'];

export function AdminProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingProject, setSavingProject] = useState(false);

  const { milestones, refresh: refreshMilestones } = useMilestones(id);
  const { messages, sending, send } = useMessages(id);
  const [draft, setDraft] = useState('');

  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [newMilestoneDue, setNewMilestoneDue] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState<Record<string, string>>({});

  const loadProject = async () => {
    if (!id) return;
    setLoading(true);
    const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
    if (error) setError(error.message);
    else setProject(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const updateProject = async (fields: Partial<ProjectRow>) => {
    if (!id) return;
    setSavingProject(true);
    const { error } = await supabase.from('projects').update(fields).eq('id', id);
    setSavingProject(false);
    if (error) { setError(error.message); return; }
    setProject((prev) => (prev ? { ...prev, ...fields } : prev));
  };

  const addMilestone = async (e: FormEvent) => {
    e.preventDefault();
    if (!id || !newMilestoneTitle.trim()) return;
    await supabase.from('milestones').insert({
      project_id: id,
      title: newMilestoneTitle.trim(),
      due_date: newMilestoneDue || null,
      position: milestones.length,
    });
    setNewMilestoneTitle('');
    setNewMilestoneDue('');
    refreshMilestones();
  };

  const updateMilestone = async (milestoneId: string, fields: { status?: string; progress?: number }) => {
    await supabase.from('milestones').update(fields).eq('id', milestoneId);
    refreshMilestones();
  };

  const deleteMilestone = async (milestoneId: string) => {
    await supabase.from('milestones').delete().eq('id', milestoneId);
    refreshMilestones();
  };

  const addTask = async (milestoneId: string, position: number) => {
    const title = newTaskTitle[milestoneId]?.trim();
    if (!title) return;
    await supabase.from('milestone_tasks').insert({ milestone_id: milestoneId, title, position });
    setNewTaskTitle((prev) => ({ ...prev, [milestoneId]: '' }));
    refreshMilestones();
  };

  const toggleTask = async (taskId: string, done: boolean) => {
    await supabase.from('milestone_tasks').update({ done: !done }).eq('id', taskId);
    refreshMilestones();
  };

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    await send(draft);
    setDraft('');
  };

  if (loading) return <p className="text-sm text-muted">Loading project…</p>;

  if (error && !project) {
    return (
      <div className="card flex items-start gap-3 p-6 text-sm text-error-700">
        <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" /> <span>{error}</span>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div>
      <Link to="/admin/projects" className="mb-4 inline-flex items-center gap-1 text-sm text-navy-500 hover:text-navy-700">
        <ArrowLeft className="h-4 w-4" /> Back to projects
      </Link>

      <PageHeader title={project.title} description={project.category ?? undefined} />

      <div className="card p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="label">Status</label>
            <select
              value={project.status}
              onChange={(e) => updateProject({ status: e.target.value })}
              disabled={savingProject}
              className="input"
            >
              {projectStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Progress (%)</label>
            <input
              type="number"
              min={0}
              max={100}
              defaultValue={project.progress}
              onBlur={(e) => updateProject({ progress: Number(e.target.value) })}
              className="input w-28"
            />
          </div>
          <div className="ml-auto">
            <StatusBadge status={project.status} />
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar progress={project.progress} />
        </div>
        {project.description && <p className="mt-4 text-sm text-muted">{project.description}</p>}
      </div>

      {/* Milestones */}
      <div className="mt-6">
        <p className="mb-3 text-sm font-semibold text-navy-900">Milestones</p>
        <div className="space-y-4">
          {milestones.map((m) => (
            <div key={m.id} className="card p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-navy-900">{m.title}</p>
                <div className="flex items-center gap-2">
                  <select
                    value={m.status}
                    onChange={(e) => updateMilestone(m.id, { status: e.target.value })}
                    className="input py-1 text-xs"
                  >
                    {milestoneStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    defaultValue={m.progress}
                    onBlur={(e) => updateMilestone(m.id, { progress: Number(e.target.value) })}
                    className="input w-20 py-1 text-xs"
                  />
                  <button type="button" onClick={() => deleteMilestone(m.id)} className="text-navy-300 hover:text-error-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <ul className="mt-3 space-y-1">
                {m.tasks.map((t) => (
                  <li key={t.id} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={t.done} onChange={() => toggleTask(t.id, t.done)} />
                    <span className={t.done ? 'text-navy-400 line-through' : 'text-navy-700'}>{t.title}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={newTaskTitle[m.id] ?? ''}
                  onChange={(e) => setNewTaskTitle((prev) => ({ ...prev, [m.id]: e.target.value }))}
                  placeholder="Add a task…"
                  className="input py-1.5 text-sm"
                />
                <button type="button" onClick={() => addTask(m.id, m.tasks.length)} className="btn-outline btn-sm flex-shrink-0">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}

          <form onSubmit={addMilestone} className="card flex flex-wrap items-end gap-3 p-5">
            <div className="flex-1 min-w-[200px]">
              <label className="label">New milestone</label>
              <input
                type="text"
                value={newMilestoneTitle}
                onChange={(e) => setNewMilestoneTitle(e.target.value)}
                placeholder="e.g. Backend API"
                className="input"
              />
            </div>
            <div>
              <label className="label">Due date</label>
              <input
                type="date"
                value={newMilestoneDue}
                onChange={(e) => setNewMilestoneDue(e.target.value)}
                className="input"
              />
            </div>
            <button type="submit" className="btn-primary">
              <Plus className="h-4 w-4" /> Add
            </button>
          </form>
        </div>
      </div>

      {/* Messages */}
      <div className="mt-6">
        <p className="mb-3 text-sm font-semibold text-navy-900">Messages</p>
        <div className="card flex h-[50vh] flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {messages.length === 0 && <p className="text-sm text-muted">No messages yet.</p>}
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender_role === 'admin' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-md rounded-2xl px-4 py-2.5 text-sm ${m.sender_role === 'admin' ? 'bg-electric-600 text-white' : 'bg-navy-50 text-navy-800'}`}>
                  <p>{m.content}</p>
                  <p className={`mt-1 text-[11px] ${m.sender_role === 'admin' ? 'text-electric-100' : 'text-navy-400'}`}>
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
              placeholder="Reply to the student…"
              className="input"
            />
            <button type="submit" disabled={sending} className="btn-primary btn-sm flex-shrink-0">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
