export default function Footer() {
  return (
    <footer className="mt-8 sm:mt-12 py-4 text-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
      <p className="px-2">SEO Tag Analyzer - Analyze and improve your website's meta tags for better search visibility</p>
      <p className="text-xs mt-2 text-gray-400 dark:text-gray-500">©{new Date().getFullYear()} - Made with ❤️</p>
    </footer>
  );
}
