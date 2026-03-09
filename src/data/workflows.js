// Structured data: Workflow patterns and system characteristics
export const workflowPatterns = [
  {
    key: 'website-discovery',
    label: 'Website discovery, section planning, and conversion flow setup',
    icon: 'Code2',
  },
  {
    key: 'landing-builds',
    label: 'Landing page implementation with responsive UI patterns',
    icon: 'ArrowRight',
  },
  {
    key: 'multi-step-routers',
    label: 'Multi-step automation with routers & conditions',
    icon: 'Zap',
  },
  {
    key: 'ai-assisted',
    label: 'AI-assisted content & response systems',
    icon: 'Lightbulb',
  },
  {
    key: 'crm-pipeline',
    label: 'CRM-connected lead pipelines',
    icon: 'Briefcase',
  },
  {
    key: 'ops-webhooks',
    label: 'Email, forms, sheets, and webhook-driven operations',
    icon: 'Mail',
  },
  {
    key: 'website-automation-bridge',
    label: 'Website + automation handoff (forms to CRM and follow-up)',
    icon: 'Settings',
  },
]

export const systemCharacteristics = [
  { key: 'reliable', label: 'Reliable & documented', icon: 'CheckCircle2' },
  { key: 'handoff', label: 'Easy to hand off', icon: 'ArrowRight' },
  { key: 'scalable', label: 'Scalable & modular', icon: 'Settings' },
  { key: 'error-aware', label: 'Error-aware & monitored', icon: 'Shield' },
  { key: 'conversion-minded', label: 'Conversion-minded UX decisions', icon: 'Lightbulb' },
  { key: 'launch-ready', label: 'Launch-ready and deployment-safe', icon: 'Shield' },
]

// Provide a default export for resilience in dev/preview environments
export default { workflowPatterns, systemCharacteristics }
