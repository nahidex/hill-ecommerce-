import React, { useState } from 'react';
import { Send, User, Phone, CheckCircle, MessageSquare } from 'lucide-react';
import { ChatMessage, UserSession } from '../../types';
import { INITIAL_MESSAGES } from '../../data/dashboardMock';

interface MessagesModuleProps {
  user: UserSession;
}

export const MessagesModule: React.FC<MessagesModuleProps> = ({ user }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const activeContact = {
    name: user.role === 'buyer' ? 'মং শৈ প্রু মারমা' : 'তানভীর রহমান (বেঙ্গল এগ্রো মার্ট)',
    role: user.role === 'buyer' ? 'উৎপাদক (বান্দরবান)' : 'পাইকারি করপোরেট ক্রেতা',
    status: 'অনলাইন'
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: user.name,
      senderRole: user.role,
      text: inputVal,
      time: 'এইমাত্র',
      isMe: true
    };

    setMessages(prev => [...prev, newMsg]);
    setInputVal('');

    // Simulate smart partner response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replyMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: activeContact.name,
        senderRole: activeContact.role,
        text: 'ধন্যবাদ আপনার বার্তার জন্য। আমরা পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয়ের এসক্রো প্ল্যাটফর্মে বিষয়টি অবিলম্বে নিশ্চিত করছি।',
        time: 'এইমাত্র',
        isMe: false
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col h-[600px] animate-in fade-in">
      
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-stone-200 bg-stone-50/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-800 text-amber-300 font-bold flex items-center justify-center text-sm shadow-xs">
            {activeContact.name.slice(0, 2)}
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-900">{activeContact.name}</h3>
            <div className="text-xs text-stone-500 flex items-center gap-2">
              <span className="text-emerald-800 font-medium">{activeContact.role}</span>
              <span>·</span>
              <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                {activeContact.status}
              </span>
            </div>
          </div>
        </div>

        <div className="text-xs text-stone-500 font-medium hidden sm:block">
          সরাসরি এনক্রিপ্টেড বার্তা ও মূল্য আলোচনা
        </div>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-stone-50/30">
        {messages.map((m) => {
          return (
            <div
              key={m.id}
              className={`flex flex-col ${m.isMe ? 'items-end' : 'items-start'}`}
            >
              <div className="text-[10px] text-stone-400 mb-1 px-1">
                {m.sender} · {m.time}
              </div>
              <div
                className={`max-w-[80%] sm:max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                  m.isMe
                    ? 'bg-emerald-900 text-white rounded-br-xs'
                    : 'bg-white text-stone-800 border border-stone-200 rounded-bl-xs'
                }`}
              >
                {m.text}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="text-xs text-stone-400 italic flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce"></span>
            <span>{activeContact.name} লিখছেন...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-stone-200 bg-white flex items-center gap-3">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="আপনার প্রস্তাব বা বার্তা লিখুন..."
          className="flex-1 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-stone-50"
        />
        <button
          type="submit"
          className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
        >
          <span>পাঠান</span>
          <Send className="w-3.5 h-3.5 text-amber-300" />
        </button>
      </form>

    </div>
  );
};
