import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import PrimaryButton from '../components/PrimaryButton'
import AnimatedIcon from '../components/icons/AnimatedIcon'
import { Mail, Menu, X } from '../components/icons/icons'
import devlabStudiosLogo from '../assets/devlabstudios-logo-only.png'
import devlabStudiosLogoWebp from '../assets/devlabstudios-logo-only.webp'



const navLinks = [
  { label: 'About Me', to: '/about' },
  { label: 'Experiences', to: '/experiences' },
  { label: 'Portfolio', to: '/portfolio' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const linkBase =
    'px-3 py-2 text-sm font-semibold text-slate-100/90 transition hover:text-white focus-visible:outline-none'

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-6">
        <div className="flex items-center justify-between px-4 py-3 mt-4 border rounded-2xl border-white/15 bg-white/10 shadow-glass backdrop-blur-lg">
          <Link to="/" className="flex items-center gap-3 text-lg font-bold tracking-tight text-white">
              <picture>
                <source srcSet={devlabStudiosLogoWebp} type="image/webp" />
                <img
                  src={devlabStudiosLogo}
                  alt="DevLab Studios"
                  className="h-11 w-11 rounded-md object-contain"
                  loading="lazy"
                  width="44"
                  height="44"
                />
              </picture>
            <span className="hidden sm:inline">DevLab Studios</span>
          </Link>

          <nav className="items-center hidden gap-2 px-2 py-1 rounded-full bg-white/5 md:flex">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    linkBase,
                    isActive
                      ? 'text-white underline decoration-2 decoration-navy-300 underline-offset-8'
                      : 'text-slate-100/80',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:block">
            <div className="group">
              <PrimaryButton to="/contact" className="flex items-center gap-2 px-4 py-2">
                <AnimatedIcon icon={Mail} size={18} animationType="hover-scale" />
                Contact Me
              </PrimaryButton>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center p-2 text-white transition border rounded-lg group border-white/25 md:hidden hover:bg-white/10"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="sr-only">Toggle menu</span>
            {isOpen ? (
              <AnimatedIcon icon={X} size={24} animationType="none" />
            ) : (
              <AnimatedIcon icon={Menu} size={24} animationType="none" />
            )}
          </button>
        </div>

        {isOpen ? (
          <div className="p-3 mt-2 border rounded-2xl border-white/15 bg-white/10 shadow-glass backdrop-blur-lg md:hidden">
            <nav className="flex flex-col gap-1">
              {navLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'block rounded-xl px-3 py-2 text-sm font-semibold transition',
                      isActive ? 'bg-white/15 text-white' : 'text-slate-100/80 hover:bg-white/10',
                    ].join(' ')
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <PrimaryButton to="/contact" className="flex items-center justify-center w-full gap-2">
                <AnimatedIcon icon={Mail} size={16} animationType="none" />
                Contact Me
              </PrimaryButton>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  )
}

export default Navbar
