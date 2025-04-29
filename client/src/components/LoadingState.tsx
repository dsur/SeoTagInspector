export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-8">
      <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-blue-500 border-opacity-80"></div>
      <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 text-center">
        Analyzing website metadata<span className="animate-pulse">...</span>
      </p>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-500 text-center">
        This may take a few moments
      </p>
    </div>
  );
}
