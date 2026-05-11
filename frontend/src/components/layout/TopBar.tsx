import React from 'react';
import { useSession } from '../../App';
import { Hexagon, Check } from 'lucide-react';

export default function TopBar() {
  const { state, dispatch } = useSession();

  return (
    <header className="fixed top-0 left-0 right-0 h-[64px] bg-[#0A0E1A]/85 backdrop-blur-[20px] border-b border-white/10 z-50 flex items-center justify-between px-8">
      <div className="flex items-center gap-3" onClick={() => dispatch({ type: 'RESET' })} style={{ cursor: 'pointer' }}>
        <div className="relative w-8 h-8 flex items-center justify-center bg-gradient-to-br from-blue-600 to-sky-400 rounded-md shadow-[0_0_12px_rgba(37,99,235,0.4)]">
          <Hexagon className="text-white" size={20} />
          <div className="absolute w-[4px] h-[4px] bg-[#0A0E1A] rounded-full" />
        </div>
        <span className="font-display font-bold text-[20px] tracking-wider text-white">
          BIS<span className="text-blue-500 mx-1">·</span>ENGINE
        </span>
      </div>

      {state.step > 0 && (
        <div className="hidden md:flex items-center gap-4">
          {[1, 2, 3, 4, 5].map((s, idx) => (
            <React.Fragment key={s}>
              <div className={`w-3 h-3 rounded-full flex items-center justify-center transition-all ${
                state.step === s ? 'bg-blue-600 animate-pulse-ring' : 
                state.step > s ? 'bg-emerald-500' : 'border border-white/20'
              }`}>
                {state.step > s && <Check size={8} className="text-white" />}
              </div>
              {idx < 4 && (
                <div className={`w-8 h-[1px] ${state.step > s ? 'bg-emerald-500' : 'bg-white/20 border-dashed border-b border-white/20'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4">
        <button 
          onClick={() => dispatch({ type: 'RESET' })}
          className="px-5 py-2 text-sm font-body font-semibold bg-blue-600 rounded-lg hover:bg-blue-500 hover:shadow-hover transition-all text-white"
        >
          New Session
        </button>
      </div>
    </header>
  );
}
