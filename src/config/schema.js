// Schema.js - JSON-LD structured data helpers
export const getPersonSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'AgustinezTechVA',
  url: 'https://www.devlabstudios.com',
  description: 'Web Builder and Automation Specialist',
  jobTitle: 'Technical VA / Web Developer',
  worksFor: {
    '@type': 'Organization',
    name: 'DevLab Studios',
  },
  sameAs: [
    'https://www.linkedin.com/in/agustinez/',
    'https://github.com/agustinez',
  ],
  image: 'https://www.devlabstudios.com/screenshots/portfolio-home.png',
  location: {
    '@type': 'Place',
    name: 'Manila, Philippines',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PH',
      addressRegion: 'Manila',
    },
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
    name: 'AgustinezTechVA',
  },
  datePublished: project.datePublished || '2026-03-09',
})

export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DevLab Studios',
  url: 'https://www.devlabstudios.com',
  description: 'Web development and automation services for modern businesses',
  logo: 'https://www.devlabstudios.com/src/assets/devlabstudios-logo-only.png',
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
  '@type': 'Website',
  name: 'Tech VA Portfolio',
  url: 'https://www.devlabstudios.com',
  description: 'Tech VA Portfolio - Web Builder & Automation Specialist',
  publisher: {
    '@type': 'Organization',
    name: 'DevLab Studios',
    logo: 'https://www.devlabstudios.com/src/assets/devlabstudios-logo-only.png',
  },
})
