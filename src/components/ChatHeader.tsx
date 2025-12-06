import { UserPlus, Users } from 'lucide-react';

export function ChatHeader() {
  return (
    <div className="bg-white/90 backdrop-blur-sm m-4 rounded-2xl px-5 py-4 shadow-sm flex items-center justify-between">
      <h1 className="text-gray-800 font-light">Chat</h1>
      
      {/* Avatar Circle */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center overflow-hidden">
        {/* Placeholder - can be replaced with image */}
        <div className="w-full h-full bg-gray-300" />
      </div>
    </div>
  );
}