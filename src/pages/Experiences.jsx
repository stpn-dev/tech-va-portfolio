import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import GlassCard from '../components/GlassCard'
import SectionHeader from '../components/SectionHeader'
import AnimatedIcon from '../components/icons/AnimatedIcon'
import ImageModal from '../components/ImageModal'
import { experiences } from '../data/experiences'
import { Briefcase, Calendar, ArrowRight, Maximize2 } from '../components/icons/icons'

function Experiences() {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <>
      <Helmet>
        <title>Work Experience – Website Developer &amp; AI Automation Specialist | Devlab Studios</title>
        <meta name="description" content="Professional experience of Devlab Studios as a website developer and AI automation specialist. Past roles include AI Automation Specialist (self-employed), Software Engineer at Accenture, and Process Engineer at ONSEMI — with expertise in React, Zapier, n8n, Power BI, and business automation." />
        <meta name="keywords" content="web developer experience, AI automation specialist experience, Zapier automation work history, n8n developer, software engineer, React developer experience, business automation projects, freelance developer portfolio" />
        <meta property="og:title" content="Work Experience – Website Developer &amp; AI Automation Specialist | Devlab Studios" />
        <meta property="og:description" content="Devlab Studios professional experience as a website developer and AI automation specialist. Roles include software engineer at Accenture and self-employed AI automation specialist." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.devlabstudios.com/experiences" />
        <meta property="og:image" content="/screenshots/portfolio-experiences.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Work Experience – Website Developer &amp; AI Automation Specialist" />
        <meta name="twitter:description" content="Work history as website developer and AI automation specialist — Accenture, ONSEMI, and self-employed automation projects." />
        <meta name="twitter:image" content="/screenshots/portfolio-experiences.png" />
      </Helmet>
    <div className="space-y-8">
      <SectionHeader
        title="Experiences"
        subtitle="Roles, responsibilities, and achievements across professional operations and technical VA work."
      />

      <div className="space-y-6">
        {experiences.map((item) => (
          <GlassCard key={item.id} className="p-6 sm:p-8">
            {/* Image Section (if image exists) */}
            {item.image && (
              <div
                className="group relative mb-6 overflow-hidden rounded-xl border border-white/15 bg-white/5 cursor-pointer transition-all hover:border-white/30"
                onClick={() => setSelectedImage(item.image)}
              >
                <img
                  src={item.image}
                  alt={`${item.role} project screenshot`}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
            )}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <AnimatedIcon
                    icon={Briefcase}
                    size={16}
                    color="text-navy-300"
                    animationType="none"
                    ariaLabel="Role type"
                  />
                  <p className="text-sm uppercase tracking-[0.14em] text-navy-100/80">{item.title}</p>
                </div>
                <h3 className="text-2xl font-semibold text-white">{item.role}</h3>
                <p className="text-slate-200/75">{item.company}</p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-semibold text-white/80 sm:whitespace-nowrap">
                <AnimatedIcon
                  icon={Calendar}
                  size={14}
                  color="text-navy-300"
                  animationType="none"
                  ariaLabel="Date range"
                />
                {item.dates}
              </div>
            </div>

            <ul className="mt-4 space-y-2 text-slate-200/85">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 leading-relaxed">
                  <AnimatedIcon
                    icon={ArrowRight}
                    size={16}
                    color="text-navy-300"
                    animationType="none"
                    ariaLabel={null}
                    className="mt-0.5 flex-shrink-0"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </div>

      {/* Image Modal */}
      <ImageModal
        src={selectedImage}
        alt="Experience project screenshot"
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
    </>
  )
}

export default Experiences
