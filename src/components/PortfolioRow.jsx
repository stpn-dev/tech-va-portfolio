import PrimaryButton from './PrimaryButton'
import GlassCard from './GlassCard'
import AnimatedIcon from './icons/AnimatedIcon'
import { ExternalLink, Code2, Zap, Maximize2 } from './icons/icons'

function PortfolioRow({ project, onImageClick }) {
  const isInternalLiveLink = project.liveUrl?.startsWith('/')

  return (
    <GlassCard className="p-6 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1.6fr] lg:items-center">
        {/* Clickable Image Container */}
        <div
          className="group relative overflow-hidden rounded-xl border border-white/15 bg-white/5 shadow-faint cursor-pointer transition-all hover:border-white/30"
          onClick={onImageClick}
          role="button"
          tabIndex={0}
          aria-label={`Enlarge ${project.title} image`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onImageClick()
            }
          }}
        >
          <img
            src={project.image}
            alt={`${project.title} cover`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {/* Hover Overlay with Icon */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
            <AnimatedIcon
              icon={Maximize2}
              size={32}
              color="text-white opacity-0 group-hover:opacity-100"
              animationType="none"
              ariaLabel="Enlarge image"
              className="transition-opacity duration-300"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <AnimatedIcon
                icon={Zap}
                size={16}
                color="text-navy-300"
                animationType="none"
                ariaLabel="Featured project"
              />
              <p className="text-sm uppercase tracking-[0.14em] text-navy-100/70">Featured project</p>
            </div>
            <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
            <p className="mt-2 text-slate-200/80">{project.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="badge-pill">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {project.liveUrl && project.liveUrl !== '#' ? (
              <PrimaryButton
                {...(isInternalLiveLink ? { to: project.liveUrl } : { href: project.liveUrl })}
                variant="primary"
                className="px-4 py-2"
              >
                <span>Live Demo</span>
                <AnimatedIcon
                  icon={ExternalLink}
                  size={16}
                  color="inherit"
                  animationType="hover-slide"
                  ariaLabel="Open live demo"
                />
              </PrimaryButton>
            ) : null}

            {project.sourceUrl && project.sourceUrl !== '#' ? (
              <PrimaryButton href={project.sourceUrl} variant="secondary" className="px-4 py-2">
                <span>Source Code</span>
                <AnimatedIcon
                  icon={Code2}
                  size={16}
                  color="inherit"
                  animationType="hover-slide"
                  ariaLabel="View source code"
                />
              </PrimaryButton>
            ) : null}
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

export default PortfolioRow
