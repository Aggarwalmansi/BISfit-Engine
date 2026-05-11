import React from 'react';
import { useSession } from '../../App';
import { Factory, Check, MousePointer2, Package, MessageSquare, Zap, FileText, HelpCircle } from 'lucide-react';

const steps = [
  { id: 1, label: 'Product Category', icon: Package },
  { id: 2, label: 'Product Questions', icon: MessageSquare },
  { id: 3, label: 'AI Analysis', icon: Zap },
  { id: 4, label: 'View Standards', icon: FileText },
];

export default function StepSidebar() {
  const { state } = useSession();

  return (
    <div className="h-full flex flex-col p-6 md:p-8">
      
      {/* Session Context Badge */}
      <div className="mb-8 rounded-[10px] p-3 bg-blue-600/10 border border-blue-500/50 flex items-center gap-3">
        <div className="p-1.5 bg-blue-500/20 rounded-md">
          <Factory size={16} className="text-blue-400" />
        </div>
        <div className="font-mono text-xs text-blue-300">
          {state.category ? (
            <span className="flex items-center gap-1">
              <span className="text-blue-200">{state.category}</span>
            </span>
          ) : (
            <span>New Session Started</span>
          )}
        </div>
      </div>

      {/* Step List */}
      <div className="flex-1 flex md:flex-col gap-0 md:gap-1 relative overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide">
        {/* Connector Line (Desktop) */}
        <div className="hidden md:block absolute left-[18px] top-[30px] bottom-[30px] w-px border-l border-dashed border-white/10 z-0" />
        
        {steps.map((step, idx) => {
          const isCompleted = state.step > step.id;
          const isActive = state.step === step.id;
          const isPending = state.step < step.id;
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative flex items-center gap-4 py-2 px-2 min-w-[140px] md:min-w-0 z-10 group">
              
              {isActive && (
                <div className="absolute left-[-24px] top-0 bottom-0 w-[3px] bg-blue-500 rounded-r-md hidden md:block" />
              )}

              <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                isCompleted 
                  ? 'bg-emerald-500/15 border-emerald-500 text-emerald-500' 
                  : isActive
                    ? 'bg-blue-600/20 border-blue-500 text-blue-400 shadow-[0_0_12px_rgba(37,99,235,0.4)]'
                    : 'bg-[#0F1629] border-white/10 text-[#4A5A7A]'
              }`}>
                {isCompleted ? <Check size={16} /> : <span className="font-mono text-sm font-semibold">{step.id}</span>}
              </div>

              <div className="flex-1 flex flex-col justify-center min-w-0 hidden md:flex">
                <span className={`font-display text-[14px] truncate transition-colors ${
                  isActive ? 'text-white font-semibold' : isCompleted ? 'text-[#8B9DC3] line-through decoration-[#4A5A7A]' : 'text-[#4A5A7A]'
                }`}>
                  {step.label}
                </span>
              </div>

              {isCompleted && (
                <div className="hidden md:block px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-mono uppercase tracking-wider font-semibold">
                  Done
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Help Block */}
      <div className="hidden md:flex mt-auto rounded-xl bg-[#151D35] border border-white/10 p-4 items-start gap-3">
        <HelpCircle className="text-sky-400 shrink-0 mt-0.5" size={18} />
        <div>
          <h4 className="font-display text-sm font-semibold text-white mb-1">Need help?</h4>
          <button className="text-xs text-[#8B9DC3] hover:text-white transition-colors underline decoration-white/20 underline-offset-2">
            Chat with our support agent
          </button>
        </div>
      </div>

    </div>
  );
}
