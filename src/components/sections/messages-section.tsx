
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Search, Send, ArrowLeft, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const conversations = [
    { id: '1', name: 'Nalwoga Sarah', lastMessage: 'Okay, I will check it out.', timestamp: '10:30 AM', unread: 2, avatarId: 'avatar-2' },
    { id: '2', name: 'Ssebugwawo Peter', lastMessage: 'See you then!', timestamp: 'Yesterday', unread: 0, avatarId: 'avatar-3' },
    { id: '3', name: 'Jane Doe', lastMessage: 'Thanks for the update.', timestamp: '2 days ago', unread: 0, avatarId: 'avatar-4' },
    { id: '4', name: 'John Smith', lastMessage: 'Can you send me the file?', timestamp: '2 days ago', unread: 1, avatarId: 'avatar-5' },
    { id: '5', name: 'Emily White', lastMessage: 'Great, thank you!', timestamp: '3 days ago', unread: 0, avatarId: 'avatar-6' },
];

const messages = {
    '1': [
        { id: 'm1', sender: 'Nalwoga Sarah', text: 'Hey, are you available to chat?', time: '10:25 AM', isSender: false },
        { id: 'm2', sender: 'KAWOOYA RAYMOND', text: 'Hi Sarah, yes I am. What\'s up?', time: '10:26 AM', isSender: true },
        { id: 'm3', sender: 'Nalwoga Sarah', text: 'I saw your listing for the computer classes. I\'m interested!', time: '10:28 AM', isSender: false },
        { id: 'm4', sender: 'Nalwoga Sarah', text: 'Could you tell me more about the schedule?', time: '10:28 AM', isSender: false },
        { id: 'm5', sender: 'KAWOOYA RAYMOND', text: 'Of course. We have classes on weekdays from 4 PM to 6 PM, and on weekends from 10 AM to 1 PM.', time: '10:29 AM', isSender: true },
        { id: 'm6', sender: 'Nalwoga Sarah', text: 'Okay, I will check it out.', time: '10:30 AM', isSender: false },
    ],
    '2': [
        { id: 'm7', sender: 'Ssebugwawo Peter', text: 'Meeting confirmed for 2 PM tomorrow.', time: 'Yesterday', isSender: false },
        { id: 'm8', sender: 'KAWOOYA RAYMOND', text: 'Sounds good. See you then!', time: 'Yesterday', isSender: true },
    ],
    '3': [],
    '4': [],
    '5': [],
}

export default function MessagesSection() {
    const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
    
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
                            const avatar = PlaceHolderImages.find(p => p.id === convo.avatarId);
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
                                        {avatar && <AvatarImage src={avatar.imageUrl} alt={convo.name} data-ai-hint="person portrait" />}
                                        <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow truncate">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-semibold">{convo.name}</h3>
                                            <span className="text-xs text-muted-foreground">{convo.timestamp}</span>
                                        </div>
                                        <div className="flex justify-between items-center mt-1">
                                            <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                                            {convo.unread > 0 && <span className="bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{convo.unread}</span>}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={cn("md:col-span-2 lg:col-span-3 flex flex-col h-full", !selectedConversation && "hidden md:flex")}>
                    {selectedConversation ? (
                        <>
                            <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                                <div className="flex items-center gap-3">
                                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSelectedConversation(undefined)}>
                                        <ArrowLeft />
                                    </Button>
                                    <Avatar className="h-10 w-10 border">
                                        <AvatarImage src={PlaceHolderImages.find(p => p.id === selectedConversation.avatarId)?.imageUrl} alt={selectedConversation.name} data-ai-hint="person portrait" />
                                        <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-bold text-lg">{selectedConversation.name}</h3>
                                        <p className="text-sm text-muted-foreground">Online</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <MoreVertical />
                                </Button>
                            </CardHeader>
                            <CardContent className="flex-grow p-4 md:p-6 overflow-y-auto bg-gray-50/50">
                                <div className="space-y-4">
                                    {messages[selectedConversation.id].map(msg => (
                                        <div key={msg.id} className={cn("flex gap-3", msg.isSender ? "justify-end" : "justify-start")}>
                                            {!msg.isSender && <Avatar className="h-8 w-8 self-end"><AvatarFallback>{msg.sender.charAt(0)}</AvatarFallback></Avatar>}
                                            <div className={cn("max-w-xs md:max-w-md p-3 rounded-xl", msg.isSender ? "bg-primary text-primary-foreground" : "bg-card border")}>
                                                <p>{msg.text}</p>
                                                <p className="text-xs mt-1 opacity-70 text-right">{msg.time}</p>
                                            </div>
                                             {msg.isSender && <Avatar className="h-8 w-8 self-end"><AvatarFallback>Y</AvatarFallback></Avatar>}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <div className="p-4 border-t bg-card">
                                <div className="relative">
                                    <Input placeholder="Type a message..." className="pr-12 h-12 text-base" />
                                    <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9">
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
