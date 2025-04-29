export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Analyzing website metadata...</p>
    </div>
  );
}
