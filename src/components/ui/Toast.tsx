import * as React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg animate-slide-down max-w-sm',
        type === 'success' ? 'bg-white border border-green-200' : 'bg-white border border-red-200'
      )}
    >
      {type === 'success' ? (
        <CheckCircle className="h-5 w-5 text-success shrink-0" />
      ) : (
        <XCircle className="h-5 w-5 text-error shrink-0" />
      )}
      <p className="text-sm text-gray-700 flex-1">{message}</p>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
