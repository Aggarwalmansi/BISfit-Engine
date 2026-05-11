import React from 'react';
import { useSession } from '../../App';
import StepSidebar from './StepSidebar';
import CategorySelectorStep from '../steps/CategorySelectorStep';
import ChatbotQnAStep from '../steps/ChatbotQnAStep';
import AIAnalysisStep from '../steps/AIAnalysisStep';
import ResultsStep from '../steps/ResultsStep';

export default function MainAppPanel() {
  const { state } = useSession();

  return (
    <div className="bg-[#0F1629] border border-white/10 rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.4)] min-h-[600px] flex flex-col md:flex-row overflow-hidden relative z-10">
      
      {/* Sidebar for Desktop, Top Steps for Mobile */}
      <div className="md:w-[280px] shrink-0 border-b md:border-b-0 md:border-r border-white/10 bg-[#0A0E1A]">
        <StepSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-[#0F1629] relative overflow-hidden">
        {state.step === 1 && <CategorySelectorStep />}
        {state.step === 2 && <ChatbotQnAStep />}
        {state.step === 3 && <AIAnalysisStep />}
        {state.step === 4 && <ResultsStep />}
      </div>
    </div>
  );
}
