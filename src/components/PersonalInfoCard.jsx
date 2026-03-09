import GlassCard from './GlassCard'
import AnimatedIcon from './icons/AnimatedIcon'
import { MapPin, Mail, Phone, Calendar } from './icons/icons'
import profilePhoto from '../assets/recent-photo.png'

function PersonalInfoCard({ aboutData }) {
  return (
    <GlassCard className="p-6 sm:p-8">
      <div className="flex flex-col gap-8 sm:flex-row sm:gap-8 sm:items-center">
        {/* Profile Photo */}
        <div className="flex justify-center sm:justify-start sm:flex-shrink-0">
          <div className="group relative">
            <img
              src={profilePhoto}
              alt="Profile photo of Stephen Rey G. Agustinez"
              className="h-28 w-28 rounded-full border-2 border-white/20 object-cover shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:border-white/40 sm:h-40 sm:w-40"
              loading="lazy"
            />
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 rounded-full bg-navy-300/0 transition-all duration-300 group-hover:bg-navy-300/10 group-hover:blur-xl" />
          </div>
        </div>

        {/* Content Grid */}
        <div className="flex-1">
          <div className="grid gap-8 sm:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-navy-100/70">Name</p>
                <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{aboutData.name}</h2>
                {aboutData.role && (
                  <p className="mt-1 text-sm text-navy-300">{aboutData.role}</p>
                )}
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <AnimatedIcon
                    icon={MapPin}
                    size={18}
                    color="text-navy-300"
                    animationType="none"
                    ariaLabel="Location"
                  />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-navy-100/70">Location</p>
                  <p className="mt-1 text-lg text-slate-200/85">{aboutData.location}</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <div className="mt-1">
                  <AnimatedIcon
                    icon={Mail}
                    size={18}
                    color="text-navy-300 group-hover:text-navy-200"
                    animationType="hover-scale"
                    ariaLabel="Email"
                  />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-navy-100/70">Email</p>
                  <a
                    href={`mailto:${aboutData.email}`}
                    className="mt-1 text-lg text-navy-300 transition hover:text-navy-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-300"
                  >
                    {aboutData.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="mt-1">
                  <AnimatedIcon
                    icon={Phone}
                    size={18}
                    color="text-navy-300 group-hover:text-navy-200"
                    animationType="hover-scale"
                    ariaLabel="Phone"
                  />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-navy-100/70">Phone</p>
                  <a
                    href={`tel:${aboutData.phone}`}
                    className="mt-1 text-lg text-slate-200/85 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-300"
                  >
                    {aboutData.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <AnimatedIcon
                    icon={Calendar}
                    size={18}
                    color="text-navy-300"
                    animationType="none"
                    ariaLabel="Date of Birth"
                  />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-navy-100/70">Date of Birth</p>
                  <p className="mt-1 text-lg text-slate-200/85">{aboutData.dateOfBirth}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

export default PersonalInfoCard
