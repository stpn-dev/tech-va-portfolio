import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import GlassCard from '../components/GlassCard'
import SectionHeader from '../components/SectionHeader'
import PrimaryButton from '../components/PrimaryButton'
import AnimatedIcon from '../components/icons/AnimatedIcon'
import { ERROR_MESSAGES } from '../config/errorMessages'
import { User, Mail, MessageSquare, Send, Check, AlertCircle, Loader2 } from '../components/icons/icons'

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const config = useMemo(
    () => ({
      apiUrl: import.meta.env.VITE_CONTACT_API_URL || '/api/contact',
    }),
    [],
  )

  const validate = () => {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Full name is required.'
    if (!form.email.trim()) nextErrors.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = 'Enter a valid email.'
    if (!form.subject.trim()) nextErrors.subject = 'Subject is required.'
    if (!form.message.trim()) nextErrors.message = 'Message is required.'
    return nextErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validation = validate()
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      setStatus({
        type: 'error',
        message: ERROR_MESSAGES.CONTACT_VALIDATION_ERROR.message,
      })
      return
    }

    if (!config.apiUrl) {
      setStatus({
        type: 'error',
        message: 'Contact endpoint is missing. Check your .env settings.',
      })
      return
    }

    setIsSubmitting(true)
    setStatus(null)

    try {
      const payload = {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        source: 'devlabstudios-contact-form',
      }

      const requestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }

      const response = await fetch(config.apiUrl, requestInit)
      if (!response.ok) {
        throw new Error(`Zoho submission failed with status ${response.status}`)
      }

      setStatus({
        type: 'success',
        message: 'Message sent successfully. You should receive a confirmation email shortly.',
      })
      setForm(initialForm)
      setErrors({})
    } catch (err) {
      // User-safe error message
      setStatus({
        type: 'error',
        message: ERROR_MESSAGES.CONTACT_SEND_ERROR.message,
      })
      if (import.meta.env.DEV) {
        console.error('[Contact Form Error]', err)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Hire a Website Developer &amp; AI Automation Specialist | Contact Devlab Studios</title>
        <meta name="description" content="Get in touch with Devlab Studios — available to hire as a freelance website developer or AI automation specialist. Inquire about website projects, Zapier automations, n8n workflows, or AI agent development. Remote-first, worldwide." />
        <meta name="keywords" content="hire website developer, hire AI automation specialist, freelance web developer for hire, Zapier automation service, n8n automation hire, contact web developer, remote developer hire, business automation consultant" />
        <meta property="og:title" content="Hire a Website Developer &amp; AI Automation Specialist | Contact Devlab Studios" />
        <meta property="og:description" content="Hire Devlab Studios for website development or AI automation projects. Remote-first, available worldwide. Specializing in React, Zapier, n8n, and AI agents." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.devlabstudios.com/contact" />
        <meta property="og:image" content="/screenshots/portfolio-contact.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hire a Website Developer &amp; AI Automation Specialist | Contact Devlab Studios" />
        <meta name="twitter:description" content="Hire Devlab Studios for website development or AI automation. Remote-first, available worldwide." />
        <meta name="twitter:image" content="/screenshots/portfolio-contact.png" />
      </Helmet>
    <div className="space-y-8">
      <SectionHeader
        title="Contact Me"
        subtitle="Share a project, request, or support need. I'll get back to you as soon as possible."
      />

      <GlassCard className="p-6 sm:p-8">
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-white" htmlFor="name">
                <AnimatedIcon
                  icon={User}
                  size={16}
                  color="text-navy-300"
                  animationType="none"
                  ariaLabel={null}
                />
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-slate-300/50 focus:border-navy-300 focus:outline-none transition-colors"
                placeholder="Your name"
              />
              {errors.name ? <p className="text-sm text-red-200/90">{errors.name}</p> : null}
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-white" htmlFor="email">
                <AnimatedIcon
                  icon={Mail}
                  size={16}
                  color="text-navy-300"
                  animationType="none"
                  ariaLabel={null}
                />
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-slate-300/50 focus:border-navy-300 focus:outline-none transition-colors"
                placeholder="name@email.com"
              />
              {errors.email ? <p className="text-sm text-red-200/90">{errors.email}</p> : null}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-white" htmlFor="subject">
              <AnimatedIcon
                icon={MessageSquare}
                size={16}
                color="text-navy-300"
                animationType="none"
                ariaLabel={null}
              />
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-slate-300/50 focus:border-navy-300 focus:outline-none transition-colors"
              placeholder="Project inquiry, support, collaboration"
            />
            {errors.subject ? <p className="text-sm text-red-200/90">{errors.subject}</p> : null}
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-white" htmlFor="message">
              <AnimatedIcon
                icon={MessageSquare}
                size={16}
                color="text-navy-300"
                animationType="none"
                ariaLabel={null}
              />
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-slate-300/50 focus:border-navy-300 focus:outline-none transition-colors"
              placeholder="Share context, goals, timelines, and success criteria."
            />
            {errors.message ? <p className="text-sm text-red-200/90">{errors.message}</p> : null}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <PrimaryButton type="submit" disabled={isSubmitting} className="px-6 py-3">
              {isSubmitting ? (
                <>
                  <span>Sending…</span>
                  <AnimatedIcon
                    icon={Loader2}
                    size={16}
                    color="inherit"
                    animationType="spin"
                    ariaLabel={null}
                  />
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <AnimatedIcon
                    icon={Send}
                    size={16}
                    color="inherit"
                    animationType="hover-slide"
                    ariaLabel={null}
                  />
                </>
              )}
            </PrimaryButton>
            <span className="text-sm text-slate-200/80">Responses will be routed via Zoho.</span>
          </div>

          {status ? (
            <div
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${
                status.type === 'success' ? 'bg-emerald-500/15 text-emerald-100' : 'bg-red-500/15 text-red-100'
              }`}
              role="status"
              aria-live="polite"
            >
              <AnimatedIcon
                icon={status.type === 'success' ? Check : AlertCircle}
                size={18}
                color="inherit"
                animationType={status.type === 'success' ? 'pulse' : 'none'}
                ariaLabel={null}
              />
              <span>{status.message}</span>
            </div>
          ) : null}
        </form>
      </GlassCard>
    </div>
    </>
  )
}

export default Contact
