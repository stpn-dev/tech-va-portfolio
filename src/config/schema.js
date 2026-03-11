// Schema.js - JSON-LD structured data helpers
export const getPersonSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Stephen Rey G. Agustinez',
  alternateName: 'AgustinezTechVA',
  url: 'https://www.devlabstudios.com',
  description:
    'Freelance website developer and AI automation specialist. Builds conversion-focused websites with React and Laravel, and designs workflow automations using Zapier, n8n, and AI agents for modern businesses worldwide.',
  jobTitle: 'Website Developer & AI Automation Specialist',
  knowsAbout: [
    'Website Development',
    'Web Design',
    'AI Automation',
    'Workflow Automation',
    'Business Process Automation',
    'React',
    'Tailwind CSS',
    'Laravel',
    'Zapier',
    'n8n',
    'AI Agents',
    'Landing Page Development',
    'Full Stack Development',
    'Google Gemini',
    'Power BI',
    'Google Apps Script',
    'CRM Automation',
    'Lead Generation Websites',
    'E-commerce Websites',
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Website Developer & AI Automation Specialist',
    description:
      'Builds conversion-focused websites and AI-driven automation systems for businesses, enabling lead generation, operational scaling, and process efficiency.',
    skills:
      'React, Tailwind CSS, Laravel, Zapier, n8n, AI Agents, Business Process Automation, Landing Pages, Full Stack Development',
    occupationLocation: {
      '@type': 'Country',
      name: 'Philippines',
    },
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Website Development',
      description:
        'Conversion-focused websites, landing pages, and full-stack web applications built with React, Tailwind CSS, and Laravel.',
      url: 'https://www.devlabstudios.com/portfolio',
    },
    {
      '@type': 'Offer',
      name: 'AI Automation & Workflow Automation',
      description:
        'Business process automations using Zapier, n8n, AI agents, and Google Gemini. Includes email automation, CRM integration, lead enrichment, and AI social media systems.',
      url: 'https://www.devlabstudios.com/portfolio',
    },
  ],
  areaServed: 'Worldwide',
  worksFor: {
    '@type': 'Organization',
    name: 'DevLab Studios',
    url: 'https://www.devlabstudios.com',
  },
  sameAs: [
    'https://www.linkedin.com/in/agustinez/',
    'https://github.com/agustinez',
  ],
  image: 'https://www.devlabstudios.com/screenshots/portfolio-home.png',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'PH',
    addressRegion: 'Cebu',
    addressLocality: 'Lapu-Lapu City',
  },
})

export const getPortfolioItemSchema = (project) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: project.title,
  description: project.description,
  url: project.link || `https://www.devlabstudios.com/portfolio#${project.id}`,
  image: project.image,
  author: {
    '@type': 'Person',
    name: 'Stephen Rey G. Agustinez',
    jobTitle: 'Website Developer & AI Automation Specialist',
  },
  datePublished: project.datePublished || '2026-03-11',
})

export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DevLab Studios',
  url: 'https://www.devlabstudios.com',
  description:
    'DevLab Studios provides freelance website development and AI automation services. Specializing in conversion-focused websites, Zapier automations, n8n workflows, and AI agent development for businesses worldwide.',
  logo: 'https://www.devlabstudios.com/devlabstudios-logo-only.png',
  founder: {
    '@type': 'Person',
    name: 'Stephen Rey G. Agustinez',
    jobTitle: 'Website Developer & AI Automation Specialist',
  },
  knowsAbout: [
    'Website Development',
    'AI Automation',
    'Workflow Automation',
    'Business Process Automation',
    'Landing Pages',
    'React Development',
    'Zapier',
    'n8n',
  ],
  areaServed: 'Worldwide',
  sameAs: [
    'https://www.linkedin.com/in/agustinez/',
    'https://github.com/agustinez',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    url: 'https://www.devlabstudios.com/contact',
  },
})

export const getWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'DevLab Studios – Website Developer & AI Automation Specialist',
  url: 'https://www.devlabstudios.com',
  description:
    'Portfolio and resume of Stephen Agustinez — freelance website developer and AI automation specialist building conversion-focused websites and workflow automations for modern businesses.',
  publisher: {
    '@type': 'Organization',
    name: 'DevLab Studios',
    logo: 'https://www.devlabstudios.com/devlabstudios-logo-only.png',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.devlabstudios.com/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
})
