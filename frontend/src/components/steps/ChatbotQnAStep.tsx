import React, { useState, useEffect, useRef } from 'react';
import { useSession } from '../../App';
import { Hexagon, Check, User } from 'lucide-react';
import clsx from 'clsx';

const categoryQuestions: Record<string, any[]> = {
  'Cement': [
    {
      id: 'q1',
      text: 'What type of cement is your product or input material?',
      type: 'mcq',
      options: ['Ordinary Portland Cement (OPC)', 'Portland Pozzolana Cement (PPC)', 'Portland Slag Cement (PSC)', 'Rapid Hardening Cement', 'Sulphate Resisting Cement', 'White Cement', 'Other / Not Sure'],
    },
    {
      id: 'q2',
      text: 'What is the intended end-use application?',
      type: 'multi',
      options: ['Structural concrete (columns, beams, slabs)', 'Mass concrete / dam construction', 'Marine / coastal structures', 'Underground / sewage structures', 'Plastering and masonry', 'Precast elements', 'Other'],
    },
    {
      id: 'q3',
      text: 'What grade / strength class does your cement target?',
      type: 'mcq',
      options: ['33 Grade', '43 Grade', '53 Grade', 'Not yet determined'],
    }
  ],
  'Steel': [
    {
      id: 'q1',
      text: 'What is the primary steel product form?',
      type: 'mcq',
      options: ['TMT Bars / Rebars', 'Structural sections', 'Steel plates / sheets', 'Hollow sections', 'Wire rods', 'Other'],
    },
    {
      id: 'q2',
      text: 'What yield strength / grade does your product correspond to?',
      type: 'mcq',
      options: ['Fe 415', 'Fe 500', 'Fe 550', 'Fe 600', 'E250 / E350 (structural)', 'Not yet determined'],
    }
  ],
  'Concrete': [
    {
      id: 'q1',
      text: 'What type of concrete are you producing or specifying?',
      type: 'mcq',
      options: ['Plain Cement Concrete (PCC)', 'Reinforced Cement Concrete (RCC)', 'Ready Mix Concrete (RMC)', 'High-Performance Concrete (HPC)', 'Other'],
    },
    {
      id: 'q2',
      text: 'What is the target design mix / grade?',
      type: 'mcq',
      options: ['M10 – M20', 'M25 – M40', 'M45 – M60', 'Above M60', 'Not determined'],
    }
  ],
  'Aggregates': [
    {
      id: 'q1',
      text: 'What type of aggregates are you dealing with?',
      type: 'mcq',
      options: ['Coarse Aggregates', 'Fine Aggregates (Sand)', 'Manufactured Sand (M-Sand)', 'Recycled Aggregates'],
    },
    {
      id: 'q2',
      text: 'What is the intended application?',
      type: 'multi',
      options: ['Concrete production', 'Road base/sub-base', 'Plastering', 'Other'],
    }
  ],
  'Bricks & Blocks': [
    {
      id: 'q1',
      text: 'What type of masonry unit are you producing?',
      type: 'mcq',
      options: ['Burnt Clay Bricks', 'Fly Ash Bricks', 'AAC Blocks', 'Concrete Blocks', 'Other'],
    },
    {
      id: 'q2',
      text: 'What is the target compressive strength class?',
      type: 'mcq',
      options: ['Class 3.5 to 7.5', 'Class 10 to 15', 'Above 15', 'Not sure'],
    }
  ],
  'Tiles': [
    {
      id: 'q1',
      text: 'What type of tiles are you producing?',
      type: 'mcq',
      options: ['Ceramic Tiles', 'Vitrified Tiles', 'Cement Concrete Tiles', 'Terrazzo Tiles'],
    },
    {
      id: 'q2',
      text: 'What is the application area?',
      type: 'mcq',
      options: ['Floor', 'Wall', 'Roofing', 'Heavy-duty / Industrial'],
    }
  ],
  'Glass': [
    {
      id: 'q1',
      text: 'What kind of architectural glass are you manufacturing?',
      type: 'mcq',
      options: ['Float Glass', 'Toughened / Tempered Glass', 'Laminated Safety Glass', 'Other'],
    }
  ],
  'Pipes': [
    {
      id: 'q1',
      text: 'What is the primary material of the pipes?',
      type: 'mcq',
      options: ['PVC / UPVC', 'HDPE', 'Cast Iron / Ductile Iron', 'Concrete', 'Steel'],
    },
    {
      id: 'q2',
      text: 'What is the intended use case?',
      type: 'multi',
      options: ['Potable water supply', 'Sewage / Drainage', 'Plumbing', 'Agricultural'],
    }
  ],
  'Waterproofing': [
    {
      id: 'q1',
      text: 'What type of waterproofing compound or membrane is it?',
      type: 'mcq',
      options: ['Integral waterproofing compound for concrete', 'Bitumen based felt/membrane', 'Polymer modified cementitious', 'Liquid applied membrane'],
    }
  ],
  'Timber': [
    {
      id: 'q1',
      text: 'What type of timber or wood product are you supplying?',
      type: 'mcq',
      options: ['Plywood', 'Blockboard', 'Flush Doors', 'Structural Timber / Sawn wood'],
    },
    {
      id: 'q2',
      text: 'What is the environmental grade?',
      type: 'mcq',
      options: ['BWR (Boiling Water Resistant)', 'MR (Moisture Resistant)', 'BWP (Boiling Water Proof) / Marine grade'],
    }
  ]
};

const defaultQuestions = [
  {
    id: 'q1',
    text: 'What is the specific material or product you are looking for?',
    type: 'mcq',
    options: ['Standard variant', 'High-strength variant', 'Specialized application', 'Other'],
  },
  {
    id: 'q2',
    text: 'What is your primary use case?',
    type: 'multi',
    options: ['Residential construction', 'Commercial/Industrial', 'Infrastructure', 'Other'],
  }
];

export default function ChatbotQnAStep() {
  const { state, dispatch } = useSession();
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const questions = state.category && categoryQuestions[state.category] ? categoryQuestions[state.category] : defaultQuestions;

  useEffect(() => {
    if (messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([{ role: 'ai', text: `Let's figure out the right BIS standards for your ${state.category} product.` }, { role: 'ai', isQuestion: true, ...questions[0] }]);
        setIsTyping(false);
      }, 800);
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleAnswer = (answer: any) => {
    const q = questions[currentQIdx];
    
    // Add user message
    const answerText = Array.isArray(answer) ? answer.join(', ') : answer;
    setMessages(prev => [...prev, { role: 'user', text: answerText }]);
    
    dispatch({ type: 'SET_ANSWER', payload: { key: q.id, value: answer } });

    // Next question or analysis
    setIsTyping(true);
    setTimeout(() => {
      if (currentQIdx + 1 < questions.length) {
        setMessages(prev => [...prev, { role: 'ai', isQuestion: true, ...questions[currentQIdx + 1] }]);
        setCurrentQIdx(prev => prev + 1);
      } else {
        dispatch({ type: 'SET_STEP', payload: 3 });
      }
      setIsTyping(false);
    }, 1000);
  };

  const progress = (currentQIdx / questions.length) * 100;

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
      
      {/* Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-[#0A0E1A] relative">
        
        {/* Progress Bar Top */}
        <div className="shrink-0 p-4 border-b border-white/5 flex items-center gap-4">
          <div className="flex-1 h-1 bg-[#151D35] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-sky-400 transition-all duration-500" 
              style={{ width: `${progress}%` }} 
            />
          </div>
          <span className="font-mono text-[11px] text-[#8B9DC3]">
            {currentQIdx} of {questions.length} answered
          </span>
        </div>

        {/* Scrollable Messages */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={clsx("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}>
              {msg.role === 'ai' ? (
                <div className="flex items-start gap-3 max-w-[85%] animate-slideInLeft">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-sky-400 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(37,99,235,0.4)]">
                    <Hexagon size={18} className="text-white" />
                  </div>
                  <div className="bg-[#151D35] border border-white/10 rounded-2xl rounded-tl-sm p-4 md:p-5 shadow-sm">
                    {msg.isQuestion ? (
                      <div>
                        <p className="font-body text-[15px] text-[#F0F4FF] leading-relaxed mb-3">{msg.text}</p>
                        <div className="h-px bg-white/10 mb-3" />
                        <OptionsList q={msg} onAnswer={handleAnswer} disabled={currentQIdx > questions.indexOf(questions.find(q => q.id === msg.id) as any)} />
                      </div>
                    ) : (
                      <p className="font-body text-[15px] text-[#F0F4FF] leading-relaxed">{msg.text}</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3 max-w-[75%] animate-slideInRight flex-row-reverse">
                  <div className="w-9 h-9 rounded-full bg-[#151D35] border border-white/10 flex items-center justify-center shrink-0">
                    <User size={16} className="text-[#8B9DC3]" />
                  </div>
                  <div className="bg-blue-600 rounded-2xl rounded-tr-sm p-3.5 px-5">
                    <p className="font-body text-[15px] text-white font-medium">{msg.text}</p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start gap-3 animate-slideInLeft">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-sky-400 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(37,99,235,0.4)]">
                <Hexagon size={18} className="text-white" />
              </div>
              <div className="bg-[#151D35] border border-white/10 rounded-2xl rounded-tl-sm p-4 flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0ms]" />
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:150ms]" />
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Quick Answer Panel (Desktop) */}
      <div className="hidden md:flex w-[320px] bg-[#151D35] border-l border-white/10 flex-col p-6 animate-fadeUp">
        <h3 className="font-display text-[14px] font-semibold text-[#8B9DC3] tracking-widest uppercase mb-6">
          Quick Answers
        </h3>
        
        {messages.length > 0 && !isTyping && messages[messages.length - 1].isQuestion ? (
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="mb-4 inline-block px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-mono">
              Current: Q{currentQIdx + 1} of {questions.length}
            </div>
            <p className="text-[13px] text-[#8B9DC3] mb-4">{questions[currentQIdx].text}</p>
            
            <OptionsList 
              q={questions[currentQIdx]} 
              onAnswer={handleAnswer} 
              isVertical 
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[#4A5A7A] text-sm text-center">
            Waiting for next question...
          </div>
        )}
      </div>

    </div>
  );
}

function OptionsList({ q, onAnswer, disabled = false, isVertical = false }: { q: any, onAnswer: (val: any) => void, disabled?: boolean, isVertical?: boolean }) {
  const [selectedMulti, setSelectedMulti] = useState<string[]>([]);

  if (q.type === 'mcq') {
    return (
      <div className={clsx("flex gap-2", isVertical ? "flex-col" : "flex-wrap")}>
        {q.options.map((opt: string) => (
          <button
            key={opt}
            disabled={disabled}
            onClick={() => onAnswer(opt)}
            className={clsx(
              "text-left border border-white/10 bg-[#0F1629] hover:bg-blue-600/10 hover:border-blue-500/50 hover:text-white text-[#8B9DC3] font-body text-[14px] transition-all rounded-[8px] flex items-center",
              isVertical ? "p-3 w-full" : "px-4 py-2",
              disabled && "opacity-50 pointer-events-none"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    );
  }

  // Multi-select
  return (
    <div className={clsx("flex flex-col gap-2", !isVertical && "flex-wrap md:flex-row")}>
      <div className={clsx("flex gap-2", isVertical ? "flex-col" : "flex-wrap")}>
        {q.options.map((opt: string) => {
          const isSelected = selectedMulti.includes(opt);
          return (
            <button
              key={opt}
              disabled={disabled}
              onClick={() => {
                if (isSelected) setSelectedMulti(selectedMulti.filter(x => x !== opt));
                else setSelectedMulti([...selectedMulti, opt]);
              }}
              className={clsx(
                "text-left border transition-all rounded-[8px] flex items-center gap-3",
                isVertical ? "p-3 w-full" : "px-4 py-2",
                isSelected 
                  ? "bg-blue-600/15 border-blue-500 text-blue-400" 
                  : "border-white/10 bg-[#0F1629] hover:bg-blue-600/10 hover:border-blue-500/50 hover:text-white text-[#8B9DC3]",
                disabled && "opacity-50 pointer-events-none"
              )}
            >
              <div className={clsx(
                "w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors shrink-0",
                isSelected ? "bg-blue-500 border-blue-500" : "border-white/30"
              )}>
                {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
              </div>
              <span className="font-body text-[14px]">{opt}</span>
            </button>
          );
        })}
      </div>
      {!disabled && selectedMulti.length > 0 && (
        <button
          onClick={() => onAnswer(selectedMulti)}
          className="mt-2 self-start px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-colors"
        >
          Submit Answers
        </button>
      )}
    </div>
  );
}
