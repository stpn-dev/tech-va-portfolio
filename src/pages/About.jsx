import GlassCard from '../components/GlassCard'
import SectionHeader from '../components/SectionHeader'
import PersonalInfoCard from '../components/PersonalInfoCard'
import aboutData from '../data/about.js'
import SkillsSection from '../components/ui/SkillsSection'
import ListItemWithIcon from '../components/ui/ListItemWithIcon'
import { GraduationCap, Trophy, BadgeCheck } from '../components/icons/icons'
import { Helmet } from 'react-helmet-async'

function About() {
  return (
    <>
      <Helmet>
        <title>About | DevLab Studios</title>
        <meta name="description" content="A concise overview of how I work, what I value, and the skills I bring to each engagement." />
        <meta property="og:title" content="About - DevLab Studios" />
        <meta property="og:description" content="A concise overview of how I work, what I value, and the skills I bring to each engagement." />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://www.devlabstudios.com/about" />
        <meta property="og:image" content="/screenshots/portfolio-about.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About - DevLab Studios" />
        <meta name="twitter:description" content="A concise overview of how I work, what I value, and the skills I bring to each engagement." />
        <meta name="twitter:image" content="/screenshots/portfolio-about.png" />
      </Helmet>
    <div className="space-y-10">
      <SectionHeader
        title="About Me"
        subtitle="A concise overview of how I work, what I value, and the skills I bring to each engagement."
      />

      <PersonalInfoCard aboutData={aboutData} />


      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6 sm:p-7">
          <h3 className="text-xl font-semibold text-white">Career Objectives</h3>
          <p className="mt-3 text-slate-200/85">{aboutData.careerObjectives}</p>
        </GlassCard>
        <GlassCard className="p-6 sm:p-7">
          <h3 className="text-xl font-semibold text-white">Short Bio</h3>
          <p className="mt-3 text-slate-200/85">{aboutData.shortBio}</p>
        </GlassCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-6 sm:p-7">
          <h3 className="text-xl font-semibold text-white">Education</h3>
          <ul className="mt-3 space-y-3 text-slate-200/85">
            {aboutData.education && aboutData.education.map((item, idx) => (
              <ListItemWithIcon icon={GraduationCap} key={idx}>
                <span className="font-bold text-white">{item.school}</span><br />
                <span>{item.program}</span><br />
                <span className="text-sm text-slate-300/80">{item.years}</span>
              </ListItemWithIcon>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="p-6 sm:p-7 lg:col-span-2">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-white">Achievements & Responsibilities</h3>
              <ul className="mt-3 space-y-3 text-slate-200/85">
                {aboutData.achievementsAndResponsibilities && aboutData.achievementsAndResponsibilities.map((item, idx) => (
                  <ListItemWithIcon icon={Trophy} key={idx}>
                    <span className="font-semibold">{item.title}:</span> {item.details}
                  </ListItemWithIcon>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Certificates & Licenses</h3>
              <ul className="mt-3 space-y-3 text-slate-200/85">
                {aboutData.certificatesAndLicenses && aboutData.certificatesAndLicenses.map((cert, idx) => (
                  <ListItemWithIcon icon={BadgeCheck} key={idx}>
                    {cert}
                  </ListItemWithIcon>
                ))}
              </ul>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Skills Section */}
        <SkillsSection />
        
    </div>
    </>
  )
}

export default About
