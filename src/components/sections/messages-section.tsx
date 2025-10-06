'use client';

type Profile = {
  id: string;
  full_name?: string;
  avatar_url?: string;
  email?: string;
};

type Conversation = {
  id: string;
  user1_id: string;
  user2_id: string;
  user1?: Profile;
  user2?: Profile;
  last_message?: string;
  updated_at?: string;
};

type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  text: string;
  created_at?: string;
  sender?: Profile;
};

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Send, ArrowLeft, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { fetchConversations, fetchMessages, sendMessage, createConversation, fetchAllUsers } from '@/app/messages/actions';

export default function MessagesSection() {
    const { user } = useAuth();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState('');
    const [showUserPicker, setShowUserPicker] = useState(false);
    const [users, setUsers] = useState<Profile[]>([]);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (user) {
            fetchConversations(user.id).then(setConversations);
        }
    }, [user]);

    useEffect(() => {
        if (selectedConversation) {
            fetchMessages(selectedConversation.id).then(setMessages);
        }
    }, [selectedConversation]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        fetchAllUsers().then(setUsers);
    }, []);

    const handleSendMessage = async () => {
        if (!messageInput.trim() || !selectedConversation || !user) return;
        const newMsg = await sendMessage({
            conversation_id: selectedConversation.id,
            sender_id: user.id,
            text: messageInput,
        });
        setMessages(prev => [...prev, newMsg]);
        setMessageInput('');
    };

    // Helper to get the other participant's profile
    const getOtherParticipant = (convo: Conversation): Profile | undefined => {
        if (!user) return undefined;
        return convo.user1_id === user.id ? convo.user2 : convo.user1;
    };

    return (
        <div className="h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)] flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-full">
                <div className={cn("flex flex-col border-r h-full", selectedConversation && "hidden md:flex")}>
                    <div className="p-4 border-b">
                        <h2 className="text-2xl font-bold font-headline">Messages</h2>
                        <div className="relative mt-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input placeholder="Search messages..." className="pl-10 w-full bg-muted" />
                        </div>
                    </div>
                    <div className="flex-grow overflow-y-auto">
                        {conversations.map(convo => {
                            const other = getOtherParticipant(convo);
                            return (
                                <div
                                    key={convo.id}
                                    className={cn(
                                        "flex items-start gap-4 p-4 cursor-pointer hover:bg-muted",
                                        selectedConversation?.id === convo.id && "bg-muted"
                                    )}
                                    onClick={() => setSelectedConversation(convo)}
                                >
                                    <Avatar className="h-12 w-12 border">
                                        {other?.avatar_url && <AvatarImage src={other.avatar_url} alt={other.full_name} />}
                                        <AvatarFallback>{other?.full_name?.charAt(0) || "U"}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow truncate">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-semibold">{other?.full_name || "User"}</h3>
                                            <span className="text-xs text-muted-foreground">{convo.updated_at ? new Date(convo.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}</span>
                                        </div>
                                        <div className="flex justify-between items-center mt-1">
                                            <p className="text-sm text-muted-foreground truncate">{convo.last_message || ""}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={cn("md:col-span-2 lg:col-span-3 flex flex-col h-full min-h-0", !selectedConversation && "hidden md:flex")}>
                    {selectedConversation ? (
                        <>
                            <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                                <div className="flex items-center gap-3">
                                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSelectedConversation(null)}>
                                        <ArrowLeft />
                                    </Button>
                                    <Avatar className="h-10 w-10 border">
                                        {getOtherParticipant(selectedConversation)?.avatar_url && (
                                            <AvatarImage src={getOtherParticipant(selectedConversation)?.avatar_url} alt={getOtherParticipant(selectedConversation)?.full_name} />
                                        )}
                                        <AvatarFallback>{getOtherParticipant(selectedConversation)?.full_name?.charAt(0) || "U"}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-bold text-lg">{getOtherParticipant(selectedConversation)?.full_name || "User"}</h3>
                                        <p className="text-sm text-muted-foreground">Online</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <MoreVertical />
                                </Button>
                            </CardHeader>
                            <CardContent className="flex-grow flex flex-col p-4 md:p-6 overflow-y-auto bg-gray-50/50 min-h-0" style={{ maxHeight: '60vh' }}>
                                <div className="space-y-4">
                                    {messages.map(msg => (
                                        <div key={msg.id} className={cn("flex gap-3 mb-4", msg.sender_id === user.id ? "justify-end" : "justify-start")}>
                                            {msg.sender_id !== user.id && (
                                                <Avatar className="h-8 w-8 self-end">
                                                    {msg.sender?.avatar_url && <AvatarImage src={msg.sender.avatar_url} alt={msg.sender.full_name} />}
                                                    <AvatarFallback>{msg.sender?.full_name?.charAt(0) || "U"}</AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className={cn("max-w-xs md:max-w-md p-3 rounded-xl", msg.sender_id === user.id ? "bg-primary text-primary-foreground" : "bg-card border")}>
                                              <span className="block text-xs font-semibold mb-1">{msg.sender?.full_name || "User"}</span>
                                              <p>{msg.text}</p>
                                              <p className="text-xs mt-1 opacity-70 text-right">{msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}</p>
                                            </div>
                                            {msg.sender_id === user.id && (
                                                <Avatar className="h-8 w-8 self-end">
                                                    {msg.sender?.avatar_url && <AvatarImage src={msg.sender.avatar_url} alt={msg.sender.full_name} />}
                                                    <AvatarFallback>{msg.sender?.full_name?.charAt(0) || "Y"}</AvatarFallback>
                                                </Avatar>
                                            )}
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            </CardContent>
                            <div className="p-4 border-t bg-card">
                                <div className="relative">
                                    <Input
                                      placeholder="Type a message..."
                                      className="pr-12 h-12 text-base"
                                      value={messageInput}
                                      onChange={e => setMessageInput(e.target.value)}
                                      onKeyDown={e => { if (e.key === 'Enter') handleSendMessage(); }}
                                    />
                                    <Button
                                      size="icon"
                                      className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9"
                                      onClick={handleSendMessage}
                                    >
                                      <Send className="h-5 w-5"/>
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground bg-gray-50/50">
                            <Send className="w-16 h-16 mb-4" />
                            <h3 className="text-xl font-semibold">Your Messages</h3>
                            <p>Select a conversation to start chatting.</p>
                            <Button onClick={() => setShowUserPicker(true)}>New Message</Button>
                        </div>
                    )}
                </div>
            </div>

            {showUserPicker && (
  <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <div className="bg-white p-4 rounded shadow max-w-sm w-full">
      <h3 className="font-bold mb-2">Start a Conversation</h3>
      <ul>
        {users.filter(u => u.id !== user.id).map(u => (
          <li key={u.id}>
            <button
              className="w-full text-left py-2 hover:bg-gray-100"
              onClick={async () => {
                const convo = await createConversation(user.id, u.id);
                setSelectedConversation(convo);
                setShowUserPicker(false);
              }}
            >
              {u.full_name || u.email}
            </button>
          </li>
        ))}
      </ul>
      <Button onClick={() => setShowUserPicker(false)}>Cancel</Button>
    </div>
  </div>
)}

<Button
  className="fixed bottom-24 right-4 z-50 md:hidden rounded-full h-14 w-14 flex items-center justify-center shadow-lg bg-primary text-white"
  onClick={() => setShowUserPicker(true)}
  aria-label="Start a new conversation"
>
  <Send className="h-7 w-7" />
</Button>
        </div>
    )
}
