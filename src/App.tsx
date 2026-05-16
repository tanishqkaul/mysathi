import * as React from 'react';
import { CheckCircle } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { GamificationPage } from '@/pages/GamificationPage';
import { useGamification } from '@/hooks/useGamification';
import { cn } from '@/lib/utils';

/** "Reward Created!" success badge (top-center, auto-dismisses) */
function SuccessBadge({ visible, onDone }: { visible: boolean; onDone: () => void }) {
  React.useEffect(() => {
    if (!visible) return;
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [visible, onDone]);

  if (!visible) return null;
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] animate-slide-down">
      <div className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-full shadow-xl text-sm font-semibold">
        <CheckCircle className="h-4 w-4 text-green-400" />
        Reward Created!
      </div>
    </div>
  );
}

/** Generic error toast */
function ErrorToast({ message, onClose }: { message: string; onClose: () => void }) {
  React.useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={cn(
      'fixed bottom-6 right-6 z-[60] flex items-center gap-3 px-4 py-3 bg-white border border-red-200 rounded-xl shadow-lg text-sm text-red-600 animate-slide-down max-w-sm'
    )}>
      {message}
      <button onClick={onClose} className="text-red-400 hover:text-red-600 ml-1 text-lg leading-none">×</button>
    </div>
  );
}

export function App() {
  const [activeNav, setActiveNav] = React.useState('gamification');
  const { state, openModal, closeModal, clearSubmitError } = useGamification();

  const prevSuccess = React.useRef(false);

  // When submit succeeds: show badge then close modal
  React.useEffect(() => {
    if (state.ui.submitSuccess && !prevSuccess.current) {
      // Modal already shows nothing (submitSuccess guard), close after badge timeout
      const t = setTimeout(() => closeModal(), 3200);
      return () => clearTimeout(t);
    }
    prevSuccess.current = state.ui.submitSuccess;
  }, [state.ui.submitSuccess, closeModal]);

  return (
    <Layout activeNav={activeNav} onNavigate={id => { setActiveNav(id); if (id === 'gamification') openModal(); }}>
      <GamificationPage />

      {/* Success badge */}
      <SuccessBadge
        visible={state.ui.submitSuccess}
        onDone={() => { /* timeout handled above */ }}
      />

      {/* Error toast */}
      {state.ui.submitError && (
        <ErrorToast message={state.ui.submitError} onClose={clearSubmitError} />
      )}
    </Layout>
  );
}
