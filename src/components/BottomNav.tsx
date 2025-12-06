import { useState } from 'react';
import { Smile, Send } from 'lucide-react';

export function BottomNav() {
  const [activeTab, setActiveTab] = useState('emoji');

  return (
    <div className="bg-white/90 backdrop-blur-sm m-4 mb-6 rounded-3xl px-6 py-4 shadow-lg">
      <div className="flex items-center justify-around">
        {/* Left Icon - Emoji */}
        <button
          onClick={() => setActiveTab('emoji')}
          className={`transition-all ${
            activeTab === 'emoji' ? 'scale-110' : 'opacity-60'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-green-200/50 flex items-center justify-center">
            <Smile className="w-6 h-6 text-green-700" />
          </div>
        </button>

        {/* Right Icon - Send */}
        <button
          onClick={() => setActiveTab('send')}
          className={`transition-all ${
            activeTab === 'send' ? 'scale-110' : 'opacity-60'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-green-200/50 flex items-center justify-center">
            <Send className="w-6 h-6 text-green-700" />
          </div>
        </button>
      </div>
    </div>
  );
}