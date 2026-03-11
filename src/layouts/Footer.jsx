function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-6 py-8 text-sm text-slate-200/80">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 text-center md:text-left">
          {/* Contact & Address */}
          <div className="flex-1 mb-4 md:mb-0 flex flex-col items-center md:items-start">
            <p className="font-semibold text-white text-lg mb-1">DevLab Studios</p>
            {/* Responsive tagline: single line on large screens, wraps on small */}
            <p className="text-slate-300/80 mb-3 whitespace-normal md:whitespace-nowrap">
              Your Vision, Digitally Crafted—one solution at a time, always evolving.
            </p>
            <a href="mailto:hello@devlabstudios.com" className="hover:underline text-slate-200/90 block mb-1">hello@devlabstudios.com</a>
            <span className="text-slate-300/70 block">Lapu-lapu City, Cebu, PH</span>
          </div>
          {/* Quick Links */}
          <div className="flex-1 mb-4 md:mb-0 flex flex-col items-center">
            <p className="font-semibold text-white mb-2">Quick Links</p>
            <ul className="space-y-1">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/about" className="hover:underline">About</a></li>
              <li><a href="/portfolio" className="hover:underline">Portfolio</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          {/* Social Media */}
          <div className="flex-1 flex flex-col items-center md:items-end">
            <p className="font-semibold text-white mb-2">Connect</p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/stephen-rey-agustinez-8b86041b3" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-400">LinkedIn</a>
              <a href="https://github.com/stpn-dev" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-gray-300">GitHub</a>
              <a href="mailto:hello@devlabstudios.com" aria-label="Email" className="hover:text-green-300">Email</a>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row md:justify-between md:items-center border-t border-white/10 pt-4 text-xs text-slate-400/80 gap-2 text-center md:text-left">
          <span>&copy; 2026 DevLab Studios. All rights reserved.</span>
          <span className="mt-2 md:mt-0">Privacy Policy | Terms of Service</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
