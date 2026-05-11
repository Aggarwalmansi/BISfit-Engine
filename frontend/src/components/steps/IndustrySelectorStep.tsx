import React, { useState } from 'react';
import { useSession } from '../../App';
import { Building2, HardHat, Factory, Landmark, MoreHorizontal, Check } from 'lucide-react';
import clsx from 'clsx';

const industries = [
  { id: 'Building Materials', label: 'Building Materials', desc: 'Cement, steel, concrete, aggregates', icon: Building2, gradient: 'from-[#1e3a8a] to-[#2563eb]' },
  { id: 'Construction', label: 'Construction', desc: 'On-site methods, structural design', icon: HardHat, gradient: 'from-[#065f46] to-[#10b981]' },
  { id: 'Manufacturing', label: 'Manufacturing', desc: 'Heavy machinery, factory operations', icon: Factory, gradient: 'from-[#7c2d12] to-[#f97316]' },
  { id: 'Infrastructure', label: 'Infrastructure', desc: 'Roads, bridges, water systems', icon: Landmark, gradient: 'from-[#312e81] to-[#818cf8]' },
  { id: 'Others', label: 'Other Sectors', desc: 'Chemicals, electronics, textiles', icon: MoreHorizontal, gradient: 'from-[#374151] to-[#9ca3af]' },
];

export default function IndustrySelectorStep() {
  const { state, dispatch } = useSession();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex-1 flex flex-col items-center py-12 px-6 md:px-12 overflow-y-auto animate-fadeUp">
      
      <div className="text-center mb-12 max-w-xl">
        <div className="font-mono text-[12px] text-blue-400 tracking-[0.1em] uppercase mb-4 font-semibold">
          Step 01 / 05
        </div>
        <h2 className="font-display text-[28px] md:text-[32px] font-bold text-white mb-3">
          What industry are you in?
        </h2>
        <p className="font-body text-[15px] text-[#8B9DC3]">
          Select your primary sector to help us filter relevant BIS standards and compliance pathways.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {industries.map((ind) => {
          const isSelected = state.industry === ind.id;
          const isHovered = hovered === ind.id;
          const Icon = ind.icon;

          return (
            <button
              key={ind.id}
              onMouseEnter={() => setHovered(ind.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                dispatch({ type: 'SET_INDUSTRY', payload: ind.id });
              }}
              className={clsx(
                "relative text-left rounded-[14px] p-6 transition-all duration-250 border focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                isSelected 
                  ? "bg-[rgba(15,22,41,0.7)] backdrop-blur-[12px] border-blue-600 shadow-hover -translate-y-[2px]" 
                  : isHovered
                    ? "bg-[#1A2340] border-blue-500/30 -translate-y-[2px]"
                    : "bg-[#151D35] border-white/10"
              )}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center animate-pulse-ring">
                  <Check size={12} className="text-white" strokeWidth={3} />
                </div>
              )}

              <div className={clsx(
                "w-12 h-12 rounded-[12px] flex items-center justify-center mb-4 transition-transform",
                `bg-gradient-to-br ${ind.gradient}`,
                isSelected && "scale-110 shadow-glow"
              )}>
                <Icon size={24} className="text-white drop-shadow-md" />
              </div>

              <h3 className="font-display text-[16px] font-semibold text-white mb-1.5">
                {ind.label}
              </h3>
              <p className="font-body text-[13px] text-[#8B9DC3] leading-relaxed">
                {ind.desc}
              </p>
            </button>
          );
        })}
      </div>

    </div>
  );
}
