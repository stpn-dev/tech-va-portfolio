# Tech VA Portfolio

A professional, data-driven portfolio site showcasing AI automation systems, technical workflows, and software engineering projects. Built with modern web technologies and designed for clarity, maintainability, and accessibility.

**Live Site:** [https://www.devlabstudios.com/](https://www.devlabstudios.com/)

---

## 📋 Project Overview

This portfolio serves as a professional showcase for **Stephen Rey G. Agustinez**, a Technical Virtual Assistant and AI Automation Specialist. The site is designed for:

- **Founders and Operations Teams** — evaluating automation capabilities and technical skills
- **Recruiters and Collaborators** — understanding work history, project scope, and technical depth
- **Clients** — viewing real-world automation workflows and polished microsites

### Core Purpose

- Present a clean, structured view of skills, experience, and projects
- Demonstrate systems thinking and attention to UX detail
- Provide a calm, professional interface that reflects the work style
- Enable easy content updates through centralized data files

---

## ✨ Key Features

### Design & UX
- **Glassmorphism UI** — Modern, layered glassmorphic cards with backdrop blur and subtle shadows
- **Professional Visual Hierarchy** — Clear typography, consistent spacing, and intuitive navigation
- **Calm Color Palette** — Navy and slate tones with muted accents for readability
- **Responsive Layout** — Mobile-first design with optimized breakpoints for all devices
- **Icon-Enhanced Sections** — Lucide icons for visual scanning in Education, Achievements, and Certificates

### Content Architecture
- **Data-Driven Design** — All content sourced from centralized JavaScript data files
- **Systems Panel Dashboard** — Real capabilities and workflow patterns (no time-based or vanity metrics)
- **Project Portfolio** — Automation workflows and development projects with screenshots and tech stacks
- **Skills & Tools** — Technical and personal skills clearly organized and tagged

### Technical Quality
- **Safe Error Handling** — 404 pages, maintenance mode, and React error boundaries
- **Accessibility Considerations** — Semantic HTML, ARIA labels, keyboard navigation support
- **Reduced Motion Support** — Respects user preferences for animation
- **Zoho Integration** — Contact form submissions routed through a Zoho endpoint
- **Cloudflare Pages Deployment** — Connected to GitHub for continuous deployments

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | React 19.2 |
| **Build Tool** | Vite 7.2 |
| **Styling** | Tailwind CSS 3.4 |
| **Routing** | React Router v7 |
| **Icons** | Lucide React |
| **Contact Service** | Zoho (Webhook/Form Endpoint) |
| **Linting** | ESLint 9 + Stylelint |
| **Deployment** | Cloudflare Pages |

---

## 📂 Project Structure

```
src/
├── assets/              # Images, icons, and vector files
│   ├── projects/        # Portfolio project screenshots
│   └── vectors/         # SVG logos and decorative elements
├── components/          # Reusable UI components
│   ├── icons/           # Icon system (centralized Lucide exports)
│   │   ├── AnimatedIcon.jsx
│   │   └── icons.js
│   ├── ui/              # Specialized UI components
│   │   ├── EmptyState.jsx
│   │   ├── ErrorState.jsx
│   │   ├── ListItemWithIcon.jsx
│   │   ├── SkillsSection.jsx
│   │   └── SystemsPanel.jsx
│   ├── ErrorBoundary.jsx
│   ├── GlassCard.jsx
│   ├── ImageModal.jsx
│   ├── PersonalInfoCard.jsx
│   ├── PortfolioRow.jsx
│   ├── PrimaryButton.jsx
│   └── SectionHeader.jsx
├── config/              # Configuration files
│   └── errorMessages.js # Centralized error message text
├── constants/           # Application constants
│   └── errorTypes.js    # Error type enums and HTTP codes
├── data/                # Content data files (resume-driven)
│   ├── about.js         # Bio, education, achievements, certificates
│   ├── experiences.js   # Work history and responsibilities
│   ├── portfolio.js     # Projects with images and tech stacks
│   ├── skills.js        # Technical and personal skills
│   ├── tools.js         # Core tools and platforms
│   └── workflows.js     # Workflow patterns and system characteristics
├── layouts/             # Layout wrappers
│   ├── Footer.jsx
│   ├── MainLayout.jsx
│   └── Navbar.jsx
├── pages/               # Route-level views
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Experiences.jsx
│   ├── Home.jsx
│   ├── Portfolio.jsx
│   └── errors/
│       ├── Maintenance.jsx
│       └── NotFound.jsx
├── services/            # External service integrations
│   └── api/
│       └── apiClient.js # Fetch wrapper with error handling
├── styles/              # Global styles and animations
│   └── animations.css
├── utils/               # Shared utility functions
│   └── errorHandler.js
├── App.jsx              # Root component with routing
└── main.jsx             # Application entry point
```

### Why This Structure?

- **Separation of Concerns** — Components, data, and logic are clearly separated
- **Scalability** — New sections or projects can be added without restructuring
- **Maintainability** — Content updates only require editing data files
- **Discoverability** — Intuitive folder names make navigation easy

---

## 📊 Data-Driven Design

All content is centralized in `src/data/` JavaScript files and mapped dynamically by components. This eliminates hardcoded content and makes updates straightforward.

### Data Files

| File | Purpose |
|------|---------|
| `about.js` | Personal info, bio, career objectives, education, achievements, certificates |
| `experiences.js` | Work history with responsibilities and date ranges |
| `portfolio.js` | Project details, screenshots, tech stacks, and links |
| `skills.js` | Technical skills (e.g., Make.com, React) and personal skills (e.g., communication) |
| `tools.js` | Core tools displayed in the Systems Panel |
| `workflows.js` | Workflow patterns and system characteristics for dashboard |

### Adding New Content

**To add a new project:**
1. Add the project screenshot to `src/assets/projects/`
2. Import the image in `src/data/portfolio.js`
3. Add a new object to the `portfolioItems` array with title, description, tech stack, and image
4. The Portfolio page automatically renders the new entry

**To add a new skill:**
1. Open `src/data/skills.js`
2. Add the skill to `technicalSkills` or `personalSkills` array
3. The Skills Section on the About page updates automatically

**To update experience:**
1. Edit `src/data/experiences.js`
2. Add or modify entries in the `experiencesData` array
3. The Experiences page re-renders with updated content

---

## 🎛️ Dashboard & Systems Panel

The **Systems Panel** on the Home page presents real capabilities, not vanity metrics.

### Why No Time-Based Metrics?

Early iterations included a "Weekly Snapshot" dashboard with placeholder metrics (e.g., "12 automations built this week"). This was removed because:

- **No backend** — Metrics would be hardcoded or fake
- **Misleading** — Time-based stats don't reflect actual capability
- **Unnecessary** — The portfolio already shows real projects

### Current Approach

The Systems Panel now shows:
- **Core Tools In Use** — Real platforms (Make.com, Zapier, Airtable, etc.)
- **Workflow Patterns** — Actual automation patterns (Data sync, Lead routing, etc.)
- **System Characteristics** — Qualitative indicators (Error handling, Scalability, etc.)

This provides **meaningful context** without fabricating data.

---

## 🛡️ Error Handling & UX Safety

Comprehensive error handling ensures users never see raw errors or broken states.

### Error Handling Components

| Component | Purpose |
|-----------|---------|
| **ErrorBoundary** | Catches React component crashes and shows fallback UI |
| **NotFound (404)** | Clean "Page Not Found" with navigation links |
| **Maintenance** | Toggle with `VITE_MAINTENANCE_MODE=true` in `.env` |
| **ErrorState** | Reusable error card for section-level failures |
| **EmptyState** | Reusable empty state card for missing data |

### API Error Handling

The `apiClient.js` wrapper:
- Normalizes HTTP responses
- Maps error codes to user-friendly messages
- Never exposes stack traces or internal errors
- Returns consistent error shapes

### Configuration-Driven Messages

All error text is centralized in `src/config/errorMessages.js` for easy updates.

See `ERROR_HANDLING_GUIDE.md` for detailed implementation notes.

---

## ♿ Responsiveness & Accessibility

### Mobile-First Design
- All layouts are designed for mobile and scale up gracefully
- Responsive navigation with hamburger menu on small screens
- Touch-friendly buttons and interactive elements

### Accessibility Features
- **Semantic HTML** — Proper heading hierarchy and landmark elements
- **ARIA Labels** — Screen-reader-friendly icon descriptions
- **Keyboard Navigation** — All interactive elements are keyboard-accessible
- **Focus Management** — Visible focus indicators and logical tab order
- **Reduced Motion** — Animation-free experience when `prefers-reduced-motion` is set
- **Decorative Icons** — Marked with `aria-hidden="true"` to avoid clutter

### Visual Hierarchy
- Clear typography with consistent font weights and sizes
- High-contrast text on glassmorphic backgrounds
- Icons enhance meaning without being decorative-only

---

## 🚀 Setup & Development

### Prerequisites

- **Node.js** 18+ and npm
- Git (for cloning the repository)

### Installation

```bash
# Clone the repository
git clone https://github.com/stpn120400/tech-va-portfolio.git
cd tech-va-portfolio

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
# Contact Configuration
VITE_CONTACT_API_URL=/api/contact
ZOHO_WEBHOOK_URL=https://your-zoho-endpoint-here

# Maintenance Mode (optional)
VITE_MAINTENANCE_MODE=false
```

Use `/api/contact` in the frontend and keep `ZOHO_WEBHOOK_URL` as a server-side secret/proxy target.

### Running Locally

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

Development server runs at `http://localhost:5173/`

---

## 🌐 Deployment

The site is deployed to **Cloudflare Pages** with GitHub integration.

### Deployment Process

1. Connect the repository to Cloudflare Pages
2. Configure build settings:
  - Framework preset: `Vite`
  - Build command: `npm run build`
  - Build output directory: `dist`
3. Add environment variables in Cloudflare Pages project settings:
  - `ZOHO_WEBHOOK_URL` (Secret)
  - `VITE_CONTACT_API_URL` (`/api/contact`)
  - `VITE_MAINTENANCE_MODE` (optional)
4. Push changes to `main` and Cloudflare deploys automatically.

### Configuration Notes

- **Base Path:** Set in `vite.config.js` as `/`.
- **SPA Routing:** `public/_redirects` rewrites all routes to `index.html`.
- **Security Headers:** `public/_headers` applies CSP and browser hardening headers.

### Manual Deployment (Optional)

```bash
npm run build
# Upload dist/ to Cloudflare Pages via dashboard or wrangler pages deploy
```

---

## 🎨 Customization Guide

### Updating Personal Information

Edit `src/data/about.js`:
```javascript
const aboutData = {
  name: "Your Name",
  role: "Your Role",
  email: "your@email.com",
  // ... other fields
}
```

### Adding Projects

1. Add screenshot to `src/assets/projects/project-name.png`
2. Edit `src/data/portfolio.js`:
```javascript
import newProject from "../assets/projects/project-name.png";

export const portfolioItems = [
  {
    id: "new-project",
    title: "Project Title",
    description: "Project description",
    techStack: ["Tool 1", "Tool 2"],
    image: newProject,
    type: "Automation",
  },
  // ... existing projects
];
```

### Changing Availability Status

Edit the badge in `src/pages/Home.jsx`:
```jsx
<span className="badge-pill">Currently available for engagements</span>
```

### Replacing Images

- **Logo:** Replace `src/assets/vectors/stpn.svg`
- **Profile Photo:** Replace the image in `PersonalInfoCard` component

### Adjusting Theme Colors

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      navy: {
        50: '#your-color',
        // ... other shades
      },
    },
  },
}
```

---

## 🔧 Maintenance & Scalability

### Regular Updates

- **Content:** Update data files in `src/data/` as skills and projects evolve
- **Dependencies:** Run `npm outdated` and update packages periodically
- **Security:** Monitor GitHub Dependabot alerts and update vulnerable packages

### Adding New Sections

1. Create data file in `src/data/newSection.js`
2. Create component in `src/components/` or page in `src/pages/`
3. Add route in `src/App.jsx` if needed
4. Update navigation in `src/layouts/Navbar.jsx`

### Future Enhancements (Optional)

- **Backend Integration** — Replace static data with API calls for real-time updates
- **Analytics** — Add Google Analytics or privacy-friendly alternatives
- **Blog Section** — Add Markdown-based blog posts
- **Dark Mode Toggle** — User-selectable light/dark themes
- **Internationalization** — Multi-language support with i18n

### Best Practices

- Keep data files focused and single-purpose
- Use descriptive component names
- Document complex logic with inline comments
- Run linter before committing changes
- Test responsive layouts on real devices

---

## ⚠️ Known Limitations

- **Static Site** — No backend, all data is client-side and static
- **Contact Endpoint Limits** — Your Zoho plan/workflow may enforce monthly or per-minute limits
- **No CMS** — Content updates require code changes and redeployment
- **Image Optimization** — Images are not auto-optimized (consider manual compression)

---

## 📄 License & Credits

### License
This project is **private** and not licensed for reuse without permission.

### Technologies & Libraries
- [React](https://react.dev/) — UI framework
- [Vite](https://vite.dev/) — Build tool
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [Lucide React](https://lucide.dev/) — Icon library
- [Zoho](https://www.zoho.com/) — Contact workflow endpoint provider
- [React Router](https://reactrouter.com/) — Client-side routing

### Icon & Asset Credits
- Icons: [Lucide Icons](https://lucide.dev/) (ISC License)
- Logo: Custom SVG asset

---

## 📞 Contact

For questions, collaboration, or inquiries:

- **Email:** stpnrey.agustinez@gmail.com
- **Portfolio:** [https://stpn120400.github.io/tech-va-portfolio/](https://stpn120400.github.io/tech-va-portfolio/)
- **Resume:** [https://stpn120400.github.io/stpn-resume/](https://stpn120400.github.io/stpn-resume/)

---

**Built with clarity, maintained with care.** 🚀
