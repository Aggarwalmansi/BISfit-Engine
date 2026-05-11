import React from 'react';
import { useSession } from '../../App';
import { FlaskConical, Layers, Square, Mountain, Grid, Layout, Droplets, PaintRoller, Type } from 'lucide-react';
import clsx from 'clsx';

const categories = [
  { id: 'Cement', label: 'Cement', standards: 12, icon: FlaskConical, color: 'bg-blue-500' },
  { id: 'Steel', label: 'Steel', standards: 18, icon: Layers, color: 'bg-orange-500' },
  { id: 'Concrete', label: 'Concrete', standards: 24, icon: Square, color: 'bg-teal-500' },
  { id: 'Aggregates', label: 'Aggregates', standards: 8, icon: Mountain, color: 'bg-amber-500' },
  { id: 'Bricks & Blocks', label: 'Bricks & Blocks', standards: 14, icon: Grid, color: 'bg-red-500' },
  { id: 'Tiles', label: 'Tiles', standards: 10, icon: Layout, color: 'bg-indigo-500' },
  { id: 'Pipes', label: 'Pipes', standards: 22, icon: Droplets, color: 'bg-cyan-500' },
  { id: 'Waterproofing', label: 'Waterproofing', standards: 9, icon: PaintRoller, color: 'bg-violet-500' },
  { id: 'Timber', label: 'Timber', standards: 11, icon: Type, color: 'bg-emerald-500' },
];

export default function CategorySelectorStep() {
  const { state, dispatch } = useSession();

  return (
    <div className="flex-1 flex flex-col justify-center py-12 animate-fadeUp">
      
      <div className="text-center mb-10 px-6 max-w-xl mx-auto">
        <div className="font-mono text-[12px] text-blue-400 tracking-[0.1em] uppercase mb-4 font-semibold">
          Step 01 / 04
        </div>
        <h2 className="font-display text-[28px] md:text-[32px] font-bold text-white mb-3">
          Select Product Category
        </h2>
        <p className="font-body text-[15px] text-[#8B9DC3]">
          Which specific building material are you querying standards for?
        </p>
      </div>

      <div className="w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6 md:px-12 pb-8">
        <div className="flex gap-4 min-w-max">
          {categories.map((cat) => {
            const isSelected = state.category === cat.id;
            const Icon = cat.icon;

            return (
              <button
                key={cat.id}
                onClick={() => dispatch({ type: 'SET_CATEGORY', payload: cat.id })}
                className={clsx(
                  "relative snap-center shrink-0 w-[200px] h-[120px] rounded-[14px] flex flex-col justify-center items-start p-5 overflow-hidden transition-all duration-300 border focus:outline-none",
                  isSelected 
                    ? "bg-[rgba(15,22,41,0.7)] backdrop-blur-[12px] border-blue-500 shadow-hover -translate-y-1"
                    : "bg-[#151D35] border-white/10 hover:border-blue-500/30 hover:bg-[#1A2340]"
                )}
              >
                {/* Left Accent Bar */}
                <div className={clsx(
                  "absolute left-0 top-0 bottom-0 transition-all duration-500 ease-out",
                  isSelected ? `w-full opacity-10 ${cat.color}` : `w-1 rounded-l-[4px] ${cat.color}`
                )} />

                <div className="relative z-10">
                  <Icon size={28} className={clsx("mb-3", isSelected ? "text-white" : "text-[#8B9DC3]")} />
                  <h3 className={clsx("font-display text-[15px] font-semibold mb-1", isSelected ? "text-white" : "text-gray-200")}>
                    {cat.label}
                  </h3>
                  <p className="font-mono text-[11px] text-[#4A5A7A] font-medium tracking-wide">
                    {cat.standards} standards
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {state.category && (
        <div className="flex justify-center mt-4 animate-expandDown">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A2340] border border-blue-500/20">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="font-mono text-xs text-blue-300">Deep focus: {state.category}</span>
          </div>
        </div>
      )}

    </div>
  );
}
