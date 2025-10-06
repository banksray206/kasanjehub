import { supabase } from '@/lib/supabase';

// Fetch conversations for current user
export async function fetchConversations(userId: string) {
  const { data, error } = await supabase
    .from('conversations')
    .select('*, user1: user1_id (full_name, avatar_url), user2: user2_id (full_name, avatar_url)')
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data;
}

// Fetch messages for a conversation
export async function fetchMessages(conversationId: string) {
  const { data, error } = await supabase
    .from('messages')
    .select('*, sender: sender_id (full_name, avatar_url)')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
}

// Send a message
export async function sendMessage({ conversation_id, sender_id, text }: { conversation_id: string; sender_id: string; text: string }) {
  const { data, error } = await supabase
    .from('messages')
    .insert([{ conversation_id, sender_id, text }])
    .select('*, sender:sender_id(full_name, avatar_url)')
    .single();
  if (error) throw error;
  return data;
}

export async function fetchAllUsers() {
  const { data, error } = await supabase.from('profile').select('id, full_name, email');
  if (error) throw error;
  return data;
}

export async function createConversation(user1_id: string, user2_id: string) {
  // Check if conversation already exists
  const { data: existing } = await supabase
    .from('conversations')
    .select('*')
    .or(`and(user1_id.eq.${user1_id},user2_id.eq.${user2_id}),and(user1_id.eq.${user2_id},user2_id.eq.${user1_id})`)
    .maybeSingle();

  if (existing) return existing;

  // Create new conversation
  const { data, error } = await supabase
    .from('conversations')
    .insert([{ user1_id, user2_id }])
    .select('*')
    .single();
  if (error) throw error;
  return data;
}