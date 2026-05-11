import React, { createContext, useContext, useReducer, useEffect } from 'react';
import TopBar from './components/layout/TopBar';
import HeroSection from './components/hero/HeroSection';
import MainAppPanel from './components/layout/MainAppPanel';
import ContextTooltip from './components/shared/ContextTooltip';

// Context setup
type SessionState = {
  step: number;
  industry: string | null;
  category: string | null;
  answers: Record<string, any>;
  results: any[];
  isAmbiguous: boolean;
};

type Action = 
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_INDUSTRY'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_ANSWER'; payload: { key: string; value: any } }
  | { type: 'SET_RESULTS'; payload: any[] }
  | { type: 'SET_AMBIGUOUS'; payload: boolean }
  | { type: 'RESET' };

const initialState: SessionState = {
  step: 0,
  industry: null,
  category: null,
  answers: {},
  results: [],
  isAmbiguous: false,
};

function sessionReducer(state: SessionState, action: Action): SessionState {
  let newState = state;
  switch (action.type) {
    case 'SET_STEP': newState = { ...state, step: action.payload }; break;
    case 'SET_CATEGORY': newState = { ...state, category: action.payload, step: 2 }; break;
    case 'SET_ANSWER': newState = { ...state, answers: { ...state.answers, [action.payload.key]: action.payload.value } }; break;
    case 'SET_RESULTS': newState = { ...state, results: action.payload, step: 4 }; break;
    case 'SET_AMBIGUOUS': newState = { ...state, isAmbiguous: action.payload }; break;
    case 'RESET': newState = initialState; break;
    default: return state;
  }
  
  if (newState.step !== state.step) {
    window.history.pushState({ step: newState.step }, '', `#step${newState.step}`);
  }
  return newState;
}

export const SessionContext = createContext<{ state: SessionState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error('useSession must be used within SessionProvider');
  return context;
}

function MainLayout() {
  const { state } = useSession();
  
  return (
    <div className="relative min-h-screen text-white font-body selection:bg-accent-primary/30">
      <TopBar />
      
      <main className="max-w-[1200px] mx-auto pt-[64px] px-8">
        {state.step === 0 ? (
          <HeroSection />
        ) : (
          <div className="py-12 animate-fadeUp">
            <MainAppPanel />
          </div>
        )}
      </main>

      <ContextTooltip />
    </div>
  );
}

function App() {
  const [state, dispatch] = useReducer(sessionReducer, initialState);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const step = event.state?.step || 0;
      if (step !== state.step) {
        dispatch({ type: 'SET_STEP', payload: step });
      }
    };
    
    // Set initial state
    window.history.replaceState({ step: state.step }, '', `#step${state.step}`);
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <SessionContext.Provider value={{ state, dispatch }}>
      <MainLayout />
    </SessionContext.Provider>
  );
}

export default App;
