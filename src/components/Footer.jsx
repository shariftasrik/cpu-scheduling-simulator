export default function Footer(){
  const year = new Date().getFullYear();
    return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-gray-600 text-sm">
        <p className="mb-2 md:mb-0">
          CPU Scheduling Simulator
        </p>
        <p>Tasrik © {year} </p>
        <div className="flex space-x-4">
          <a
            href="https://github.com/shariftasrik/cpu-scheduling-simulator.git"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
    );
}