import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

export interface MessageRow {
  id: string;
  project_id: string;
  sender_id: string;
  sender_role: string;
  content: string;
  created_at: string;
  read: boolean;
}

export function useMessages(projectId: string | null | undefined) {
  const { user, role } = useAuth();
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const refresh = useCallback(async () => {
    if (!projectId) {
      setMessages([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: true });

    if (error) setError(error.message);
    else {
      setMessages(data ?? []);
      setError(null);
    }
    setLoading(false);
  }, [projectId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const send = useCallback(async (content: string) => {
    if (!projectId || !user || !content.trim()) return;
    setSending(true);
    const { data, error } = await supabase
      .from('messages')
      .insert({
        project_id: projectId,
        sender_id: user.id,
        sender_role: role ?? 'student',
        content: content.trim(),
      })
      .select('*')
      .single();

    setSending(false);
    if (error) {
      setError(error.message);
      return;
    }
    if (data) setMessages((prev) => [...prev, data]);
  }, [projectId, user, role]);

  return { messages, loading, error, sending, send, refresh };
}
