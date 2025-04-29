import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  message: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-3 sm:p-4 rounded-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 text-red-500" />
        </div>
        <div className="ml-2 sm:ml-3">
          <h3 className="text-base sm:text-lg font-medium">Error</h3>
          <div className="mt-1 sm:mt-2">
            <p className="text-sm sm:text-base">{message}</p>
            <p className="text-xs mt-2 text-red-600/70 dark:text-red-400/70">
              Please check your URL and try again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
