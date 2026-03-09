import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import GlassCard from '../components/GlassCard'
import PrimaryButton from '../components/PrimaryButton'
import SectionHeader from '../components/SectionHeader'
import SystemsPanel from '../components/ui/SystemsPanel'
import { Download } from '../components/icons/icons'
import resumePdf from '../assets/documents/Agustinez_Tech VA_Resume.pdf'
import { getPersonSchema, getWebsiteSchema } from '../config/schema'

const previewCards = [
  {
    title: 'About Me',
    copy: 'Career objectives, bio, and what drives my work.',
    to: '/about',
  },
  {
    title: 'Experiences',
    copy: 'Professional history and technical VA engagements.',
    to: '/experiences',
  },
  {
    title: 'Portfolio',
    copy: 'Selected builds, automations, and recent experiments.',
    to: '/portfolio',
  },
]

function Home() {
  return (
    <>
      <Helmet>
        <title>Home | DevLab Studios</title>
        <meta name="description" content="Building websites and automation systems for modern businesses. Conversion-focused websites, AI-driven automations, and dashboards for founders." />
        <meta property="og:title" content="DevLab Studios - Home" />
        <meta property="og:description" content="Building websites and automation systems for modern businesses. Conversion-focused websites, AI-driven automations, and dashboards for founders." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.devlabstudios.com/" />
        <meta property="og:image" content="/screenshots/portfolio-home.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DevLab Studios - Home" />
        <meta name="twitter:description" content="Building websites and automation systems for modern businesses." />
        <meta name="twitter:image" content="/screenshots/portfolio-home.png" />
        <script type="application/ld+json">{JSON.stringify(getPersonSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(getWebsiteSchema())}</script>
      </Helmet>
    <div className="space-y-12">
      <GlassCard className="relative p-6 overflow-hidden sm:p-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" aria-hidden />
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="relative z-10 space-y-6 lg:col-span-7 xl:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-navy-100/80">
              Web Builder + Automation Specialist
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Building websites and automation systems for modern businesses.
              </h1>
              <p className="text-lg text-slate-200/85 sm:text-xl">
                I create conversion-focused websites, AI-driven automations, and polished dashboards so founders can attract more leads and scale operations with clarity.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={resumePdf}
                download="Agustinez_Tech_VA_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white transition duration-200 border rounded-full focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-navy-300 bg-white/10 border-white/20 hover:bg-white/15 active:bg-white/20"
                aria-label="Download resume as PDF"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Download Resume
              </a>
              <PrimaryButton to="/contact" variant="secondary">
                Contact Me
              </PrimaryButton>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-slate-200/75">
              <span className="badge-pill">Available for part-time and full-time engagements</span>
              <span className="badge-pill">Based in Asia/Manila (GMT+8) • Remote-first</span>
            </div>
          </div>

          <div className="relative z-10 lg:col-span-5 xl:col-span-5 xl:pl-2">
            <SystemsPanel />
          </div>
        </div>
      </GlassCard>

      <div className="space-y-6">
        <SectionHeader
          title="Navigate the work"
          subtitle="Quick links into the core sections of this portfolio."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {previewCards.map((item) => (
            <Link key={item.to} to={item.to} className="block">
              <GlassCard className="h-full p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  </div>
                  <span className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/80">Open</span>
                </div>
                <p className="mt-3 text-slate-200/80">{item.copy}</p>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default Home
