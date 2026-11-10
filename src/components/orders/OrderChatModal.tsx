import React, { useState } from 'react';
import { X, Send, Paperclip, User, ShieldCheck } from 'lucide-react';
import { UserSession } from '../../types';

interface ChatMessageItem {
  id: string;
  senderName: string;
  senderRole: string;
  text: string;
  time: string;
  isMe: boolean;
}

interface OrderChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserSession;
  orderNumber?: string;
  counterPartyName: string;
  counterPartyRole: string;
}

export const OrderChatModal: React.FC<OrderChatModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  orderNumber = 'ORD-2026-REF',
  counterPartyName,
  counterPartyRole
}) => {
  const [messages, setMessages] = useState<ChatMessageItem[]>([
    {
      id: 'm-1',
      senderName: counterPartyName,
      senderRole: counterPartyRole,
      text: `আসসালামু আলাইকুম। ${orderNumber} চালান বিষয়ে কোনো জিজ্ঞাসা থাকলে জানাতে পারেন। আমরা প্রস্তুত আছি।`,
      time: 'সকাল ১০:০০',
      isMe: false
    }
  ]);
  const [inputVal, setInputVal] = useState('');

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg: ChatMessageItem = {
      id: `m-${Date.now()}`,
      senderName: currentUser.name,
      senderRole: currentUser.role === 'buyer' ? 'পাইকারি ক্রেতা' : 'উৎপাদক / বিক্রেতা',
      text: inputVal,
      time: 'এইমাত্র',
      isMe: true
    };

    setMessages(prev => [...prev, newMsg]);
    setInputVal('');

    // Simulated quick response
    setTimeout(() => {
      const replyMsg: ChatMessageItem = {
        id: `m-${Date.now() + 1}`,
        senderName: counterPartyName,
        senderRole: counterPartyRole,
        text: 'ধন্যবাদ, আপনার বার্তাটি পেয়েছি। বিস্তারিত যাচাই করে দ্রুত জানাচ্ছি।',
        time: 'এইমাত্র',
        isMe: false
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto font-bengali">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 flex flex-col h-[520px]">
        
        {/* Header */}
        <div className="p-4 bg-emerald-950 text-white flex items-center justify-between border-b border-emerald-900">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>নিরাপদ অর্ডার চ্যাট · {orderNumber}</span>
            </div>
            <h3 className="text-sm font-bold text-white mt-0.5">
              {counterPartyName} ({counterPartyRole})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3 bg-stone-50">
          {messages.map(msg => (
            <div 
              key={msg.id}
              className={`flex flex-col max-w-[80%] ${
                msg.isMe ? 'ml-auto items-end' : 'mr-auto items-start'
              }`}
            >
              <span className="text-[10px] text-stone-400 mb-0.5">
                {msg.senderName} · {msg.time}
              </span>
              <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                msg.isMe 
                  ? 'bg-emerald-800 text-white rounded-br-xs' 
                  : 'bg-white border border-stone-200 text-stone-900 rounded-bl-xs shadow-2xs'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="বার্তা লিখুন..."
            className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 text-stone-800"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Send className="w-3.5 h-3.5 text-amber-300" />
            <span>পাঠান</span>
          </button>
        </form>

      </div>
    </div>
  );
};
