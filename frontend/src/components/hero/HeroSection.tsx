import React from 'react';
import { useSession } from '../../App';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const { dispatch } = useSession();

  return (
    <div className="min-h-[calc(100vh-64px)] overflow-y-auto w-full flex flex-col items-center pt-32 text-center relative max-w-5xl mx-auto pb-32 px-6">
      
      <div className="animate-fadeUp mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/50 bg-blue-600/10 backdrop-blur-sm shadow-[0_0_20px_rgba(37,99,235,0.15)]">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
        <span className="font-mono text-xs text-blue-400 font-medium tracking-wide uppercase">
          ⚡ AI-Powered BIS Compliance
        </span>
      </div>

      <h1 className="animate-fadeUp [animation-delay:100ms] font-display text-[48px] md:text-[56px] leading-[1.2] font-extrabold tracking-tight mb-6">
        <span className="text-white">Find Your BIS Standard </span>
        <span className="bg-gradient-to-br from-blue-500 to-sky-400 bg-clip-text text-transparent">
          in Seconds, Not Weeks
        </span>
      </h1>

      <p className="animate-fadeUp [animation-delay:200ms] font-body text-[18px] text-[#8B9DC3] leading-relaxed mb-12 max-w-2xl">
        Answer a few questions about your building materials product and get
        precise BIS standard recommendations with compliance pathways — instantly.
      </p>

      <div id="stats" className="animate-fadeUp [animation-delay:300ms] flex flex-wrap justify-center gap-12 mb-12 border-y border-white/10 py-6">
        <div className="flex flex-col items-center">
          <span className="font-display text-[32px] font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">10+</span>
          <span className="font-body text-[13px] text-[#8B9DC3] uppercase tracking-wider mt-1">Categories</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-display text-[32px] font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">200+</span>
          <span className="font-body text-[13px] text-[#8B9DC3] uppercase tracking-wider mt-1">Standards</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-display text-[32px] font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">&lt; 30s</span>
          <span className="font-body text-[13px] text-[#8B9DC3] uppercase tracking-wider mt-1">Results</span>
        </div>
      </div>

      <button
        onClick={() => dispatch({ type: 'SET_STEP', payload: 1 })}
        className="animate-fadeUp [animation-delay:400ms] group relative flex items-center gap-3 px-10 py-4 bg-blue-600 rounded-xl font-display font-semibold text-[16px] text-white overflow-hidden shadow-[0_0_0_0_rgba(59,130,246,0.6)] hover:shadow-[0_0_0_8px_rgba(59,130,246,0)] transition-all duration-300 hover:bg-blue-500 hover:-translate-y-1"
      >
        <span>Start Compliance Check</span>
        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </button>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50 mb-12">
        <div className="w-5 h-9 border-2 border-blue-500/50 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-blue-400 rounded-full animate-bounce" />
        </div>
      </div>
      
      {/* How it Works Dashboard */}
      <div className="w-full max-w-4xl mt-32 text-left bg-[#151D35] border border-white/10 rounded-2xl p-8 md:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.3)] animate-fadeUp [animation-delay:500ms]">
        <h2 className="font-display text-[28px] md:text-[32px] font-bold text-white mb-10 text-center">
          How <span className="text-blue-500">BIS·VERIFY</span> Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 font-mono font-bold text-lg border border-blue-500/30">1</div>
            <div>
              <h3 className="text-[#F0F4FF] font-semibold text-[18px] mb-2">Data Ingestion</h3>
              <p className="text-[#8B9DC3] text-[15px] leading-relaxed">Official BIS standard PDFs are parsed, chunked, and embedded into a high-dimensional vector space using FAISS and advanced NLP models.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 font-mono font-bold text-lg border border-blue-500/30">2</div>
            <div>
              <h3 className="text-[#F0F4FF] font-semibold text-[18px] mb-2">Query Formulation</h3>
              <p className="text-[#8B9DC3] text-[15px] leading-relaxed">Your simple answers to our chatbot are transformed by an LLM into precise, standard-compliant technical search queries.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 font-mono font-bold text-lg border border-blue-500/30">3</div>
            <div>
              <h3 className="text-[#F0F4FF] font-semibold text-[18px] mb-2">Vector Retrieval (RAG)</h3>
              <p className="text-[#8B9DC3] text-[15px] leading-relaxed">Our RAG engine scans the vector database to retrieve the top 5 most relevant clauses and standards matching your exact material spec.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-mono font-bold text-lg border border-emerald-500/30">4</div>
            <div>
              <h3 className="text-[#F0F4FF] font-semibold text-[18px] mb-2">Extraction & Recommendation</h3>
              <p className="text-[#8B9DC3] text-[15px] leading-relaxed">A final inference pass extracts the correct IS codes, generates a custom compliance path, and distinguishes mandatory vs. voluntary standards.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
