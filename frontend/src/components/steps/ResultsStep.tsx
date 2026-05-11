import React, { useState } from 'react';
import { useSession } from '../../App';
import { Download, Copy, RefreshCw, ArrowRight, ChevronDown, CheckCircle2, Award, ExternalLink } from 'lucide-react';
import clsx from 'clsx';
import { jsPDF } from 'jspdf';
import ReactMarkdown from 'react-markdown';

export default function ResultsStep() {
  const { state, dispatch } = useSession();
  const { results, category } = state;

  const handleCopy = () => {
    const text = results.map((r: any) => `${r.standard_code}\n${r.applicability_rationale}`).join('\n\n');
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('BIS Standards Report', 14, 20);
    doc.setFontSize(12);
    let y = 30;
    
    results.forEach((r: any) => {
      doc.setFont('helvetica', 'bold');
      doc.text(r.standard_code, 14, y);
      y += 6;
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(r.applicability_rationale, 180);
      doc.text(lines, 14, y);
      y += (lines.length * 6) + 10;
      
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
    doc.save('BIS_Standards_Report.pdf');
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10 pb-20 animate-fadeUp">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-[24px] font-bold text-white mb-2">
            Your BIS Standards
          </h2>
          <div className="flex items-center gap-2">
            <span className="font-body text-[14px] text-[#8B9DC3]">
              Found {results.length} relevant standards · AI confidence: 
            </span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-mono text-[12px] text-emerald-400 font-medium tracking-wide uppercase">High</span>
            </div>
          </div>
        </div>

        <div className="inline-flex items-center self-start md:self-end px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20">
          <span className="font-mono text-[12px] text-blue-300">
            {category} · OPC 53 Grade · Manufacturer
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-4 mb-10">
        {results.map((res: any, idx: number) => (
          <ResultCard key={idx} result={res} isFirst={idx === 0} />
        ))}
      </div>

      {/* Export / Share Actions */}
      <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
        <button onClick={handleExportPDF} className="px-5 py-2.5 rounded-[10px] bg-[#151D35] border border-white/10 hover:border-white/20 hover:bg-[#1A2340] flex items-center gap-2 text-sm font-body text-[#F0F4FF] transition-colors">
          <Download size={16} className="text-[#8B9DC3]" /> Export PDF
        </button>
        <button onClick={handleCopy} className="px-5 py-2.5 rounded-[10px] bg-[#151D35] border border-white/10 hover:border-white/20 hover:bg-[#1A2340] flex items-center gap-2 text-sm font-body text-[#F0F4FF] transition-colors">
          <Copy size={16} className="text-[#8B9DC3]" /> Copy Summary
        </button>
        <div className="flex-1" />
        <button 
          onClick={() => dispatch({ type: 'RESET' })}
          className="px-6 py-2.5 rounded-[10px] bg-blue-600 hover:bg-blue-500 flex items-center gap-2 text-sm font-semibold font-body text-white transition-colors shadow-[0_4px_14px_rgba(37,99,235,0.4)]"
        >
          <RefreshCw size={16} /> Start New Search
        </button>
      </div>

    </div>
  );
}

function ResultCard({ result, isFirst }: { result: any, isFirst: boolean }) {
  const [expanded, setExpanded] = useState(isFirst);

  const confColor = result.confidence === 'High' ? 'bg-emerald-500' : result.confidence === 'Medium' ? 'bg-amber-500' : 'bg-red-500';
  const confText = result.confidence === 'High' ? 'text-emerald-500' : result.confidence === 'Medium' ? 'text-amber-500' : 'text-red-500';
  const confWidth = result.confidence === 'High' ? 'w-full' : result.confidence === 'Medium' ? 'w-2/3' : 'w-1/3';

  return (
    <div className={clsx(
      "rounded-[16px] bg-[#151D35] border transition-all duration-300 overflow-hidden",
      expanded ? "border-blue-500/50 shadow-[0_8px_40px_rgba(37,99,235,0.15)]" : "border-white/10 hover:border-white/20 hover:shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
    )}>
      
      {/* Top Row (Always Visible) */}
      <div 
        className="p-6 flex flex-col md:flex-row md:items-start gap-4 cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className={clsx(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-mono text-sm font-bold border",
          result.rank === 1 
            ? "bg-gradient-to-br from-blue-600 to-sky-400 border-transparent text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]"
            : "bg-[#0F1629] border-white/20 text-[#8B9DC3]"
        )}>
          #{result.rank}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-2">
            <h3 className="font-mono text-[18px] font-semibold text-[#60A5FA] group relative inline-block">
              {result.standard_code}
            </h3>
            
            {result.mandatory ? (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF6B2B]/10 border border-[#FF6B2B]/40 text-[#FF6B2B] self-start md:self-auto">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B2B]" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider">Mandatory</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-500 self-start md:self-auto">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider">Voluntary</span>
              </div>
            )}
          </div>
          
          <p className="font-body text-[15px] text-[#F0F4FF]">{result.standard_title}</p>
        </div>

        <button className="hidden md:flex w-8 h-8 rounded-full bg-[#0A0E1A] border border-white/10 items-center justify-center text-[#8B9DC3] hover:text-white transition-colors shrink-0">
          <ChevronDown size={16} className={clsx("transition-transform duration-300", expanded && "rotate-180")} />
        </button>
      </div>

      {/* Expandable Content */}
      <div className={clsx(
        "grid transition-all duration-300 ease-in-out",
        expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}>
        <div className="overflow-hidden">
          <div className="p-6 pt-0 border-t border-white/5 mt-2">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 mt-6">
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#4A5A7A] mb-2">Why it applies</h4>
                  <div className="font-body text-[14px] text-[#F0F4FF] leading-relaxed markdown-content">
                    <ReactMarkdown>{result.applicability_rationale}</ReactMarkdown>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#4A5A7A] mb-2">Key Requirement</h4>
                  <div className="p-3 rounded-lg bg-[#0A0E1A] border border-white/5 font-mono text-[13px] text-sky-400 leading-relaxed">
                    {result.key_requirement}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#4A5A7A] mb-2">Certification Path</h4>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[#0A0E1A] border border-white/5">
                    <Award size={18} className="text-[#8B9DC3] mt-0.5" />
                    <span className="font-body text-[14px] text-[#F0F4FF]">{result.certification_path}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#4A5A7A] mb-2">AI Confidence</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-[120px] h-1.5 rounded-full bg-[#0A0E1A] overflow-hidden">
                      <div className={clsx("h-full rounded-full", confColor, confWidth)} />
                    </div>
                    <span className={clsx("font-mono text-[13px] font-semibold", confText)}>
                      {result.confidence}
                    </span>
                  </div>
                  <p className="font-body text-[13px] text-[#8B9DC3] mt-2 leading-snug">
                    {result.confidence_reason}
                  </p>
                </div>
              </div>

            </div>

            {/* Next Action Area */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-blue-600/5 border border-blue-500/20">
              <div className="flex-1">
                <h4 className="font-mono text-[11px] uppercase tracking-wider text-blue-400 mb-1">Recommended Next Step</h4>
                <p className="font-body text-[14px] text-[#F0F4FF]">{result.next_action}</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
