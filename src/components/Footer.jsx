export default function Footer() {
  return (
    <footer className="w-full py-12 bg-gray-950 text-white">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-blue-500">SkillSwap</h2>
          <p className="text-gray-400 mt-2">Connecting talents with opportunities.</p>
        </div>
        
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold mb-2">Pages</h3>
          <a href="/" className="text-gray-400 hover:text-white">Home</a>
          <a href="/browse-tasks" className="text-gray-400 hover:text-white">Browse Tasks</a>
          <a href="/browse-freelancers" className="text-gray-400 hover:text-white">Freelancers</a>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold mb-2">Contact</h3>
          <a href="mailto:support@skillswap.com" className="text-gray-400 hover:text-white">support@skillswap.com</a>
          <div className="mt-4">
             <a href="https://x.com" target="_blank" className="text-xl hover:text-blue-400">𝕏</a>
          </div>
        </div>
      </div>
      <div className="text-center mt-10 border-t border-gray-800 pt-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} SkillSwap. All rights reserved.
      </div>
    </footer>
  );
}