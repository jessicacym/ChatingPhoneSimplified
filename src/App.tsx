import { ChatHeader } from './components/ChatHeader';
import { BottomNav } from './components/BottomNav';

export default function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 p-8">
      {/* Phone Device Frame */}
      <div className="relative">
        {/* Phone Outer Shell */}
        <div className="relative w-[380px] h-[780px] bg-gradient-to-br from-gray-900 to-black rounded-[3.5rem] shadow-2xl p-3">
          {/* Phone Inner Bezel */}
          <div className="relative w-full h-full bg-black rounded-[3rem] overflow-hidden">
            
            {/* Screen Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[30px] bg-black rounded-b-3xl z-50 flex items-center justify-center gap-3">
              {/* Speaker */}
              <div className="w-12 h-1.5 bg-gray-800 rounded-full" />
              {/* Front Camera */}
              <div className="w-2.5 h-2.5 bg-gray-800 rounded-full" />
            </div>

            {/* Screen Content */}
            <div className="relative w-full h-full">
              {/* Clean Green Background - No UI elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-green-100 to-green-50">
                {/* Subtle lemon/citrus pattern overlay */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-20 left-10 w-32 h-32 bg-green-300 rounded-full blur-3xl" />
                  <div className="absolute top-40 right-10 w-40 h-40 bg-green-200 rounded-full blur-3xl" />
                  <div className="absolute bottom-32 left-16 w-36 h-36 bg-lime-200 rounded-full blur-3xl" />
                  <div className="absolute bottom-48 right-12 w-28 h-28 bg-green-300 rounded-full blur-3xl" />
                </div>
              </div>
              
              {/* Interactive UI Layer - Our own UI components */}
              <div className="relative h-full flex flex-col pt-10 pb-2">
                {/* Header */}
                <ChatHeader />
                
                {/* Main Content Area */}
                <div className="flex-1" />
                
                {/* Bottom Navigation */}
                <BottomNav />
              </div>
            </div>
          </div>

          {/* Side Buttons */}
          <div className="absolute -right-1 top-24 w-1 h-12 bg-gray-800 rounded-r" />
          <div className="absolute -right-1 top-40 w-1 h-16 bg-gray-800 rounded-r" />
          <div className="absolute -left-1 top-32 w-1 h-12 bg-gray-800 rounded-l" />
        </div>
      </div>
    </div>
  );
}