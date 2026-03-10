# Error Handling Implementation Guide

This portfolio includes a scalable, user-safe error-handling system that prioritizes clear messaging, polished fallbacks, and production-ready behavior (including SPA routing on GitHub Pages).

## Overview

- 404 Page — Clean “Page Not Found” with quick links
- Maintenance Mode — Toggle with `VITE_MAINTENANCE_MODE=true` in `.env`
- Global Error Boundary — Catches UI crashes and shows fallback UI
- API Wrapper — Normalized, safe error responses
- Reusable Error Components — `ErrorState`, `EmptyState`
- Configuration-driven — Error copy in `src/config/errorMessages.js`
- SPA Routing — GitHub Pages-compatible 404 redirect

## File Structure

```
src/
├── components/
│   ├── ErrorBoundary.jsx          # Global error boundary wrapper
│   └── ui/
│       ├── ErrorState.jsx         # Reusable error UI card
│       └── EmptyState.jsx         # Reusable empty state UI card
├── config/
│   └── errorMessages.js           # Centralized error message text
├── constants/
│   └── errorTypes.js              # Error type enums & HTTP codes
├── pages/
│   └── errors/
│       ├── NotFound.jsx           # 404 page
│       └── Maintenance.jsx        # Maintenance mode page
├── services/
│   └── api/
│       └── apiClient.js           # Fetch wrapper with error handling
└── utils/
    └── errorHandler.js            # Utility functions for safe error handling
```

---

## Maintenance Mode

Enable maintenance UI globally from `.env` (dev and prod builds):

```env
VITE_MAINTENANCE_MODE=true
```

- Behavior: All routes render the Maintenance page except critical contact paths.
- Disable by setting `VITE_MAINTENANCE_MODE=false` (default).
- Use for deployments, breaking changes, or dependency incidents.

Guidance:
- Keep copy short, calm, and actionable (link to Contact).
- Avoid technical jargon or exposing internal error details.

---

## Global Error Boundary

Purpose: Catch unexpected React render errors and show a friendly fallback.

Recommended integration:

1. Wrap route-level views inside `ErrorBoundary`.
2. Provide a minimal, reassuring fallback message.
3. Offer an action (retry, go home, or contact).

Example usage:

```jsx
// Wrap a page in the boundary
<ErrorBoundary>
  <PageContent />
</ErrorBoundary>
```

Best practices:
- Do not show stack traces in the UI.
- Log errors server-side only if/when a backend is introduced.
- Keep fallback light: clear message, button to recover.

---

## API Error Handling

`services/api/apiClient.js` normalizes fetch errors and returns safe, consistent responses.

Patterns:
- Map HTTP status → `errorTypes` (e.g., `NETWORK_ERROR`, `UNAUTHORIZED`).
- Transform unexpected errors to a generic “Something went wrong” message.
- Never expose raw server messages directly; use `errorMessages.js`.

Basic usage:

```jsx
import apiClient from '../../services/api/apiClient'
import { errorTypes } from '../../constants/errorTypes'
import errorMessages from '../../config/errorMessages'

async function loadData() {
  const { data, error, type } = await apiClient('/endpoint')
  if (error) {
    const message = errorMessages[type || errorTypes.UNKNOWN]
    // Render <ErrorState message={message} /> or return message to caller
    return { ok: false, message }
  }
  return { ok: true, data }
}
```

---

## Reusable Error UI

Use these components to provide consistent, accessible fallbacks:

- `components/ui/ErrorState.jsx` — Display contextual error messages within a section/card.
- `components/ui/EmptyState.jsx` — Show a calm empty state when no data is available.

Guidelines:
- Keep iconography subtle; use `aria-hidden="true"` for decorative icons.
- Ensure text alone conveys meaning (accessible by screen readers).
- Offer a next step (reload, go home, contact) without overwhelming the UI.

---

## Configuration-Driven Messages

Put all user-facing error strings in `config/errorMessages.js`. Reference them via types defined in `constants/errorTypes.js`.

Benefits:
- Single source of truth for copy.
- Consistent tone across the app.
- Easy localization or future i18n.

Example mapping:

```js
// errorTypes.js
export const errorTypes = {
  NETWORK: 'NETWORK',
  UNAUTHORIZED: 'UNAUTHORIZED',
  NOT_FOUND: 'NOT_FOUND',
  UNKNOWN: 'UNKNOWN',
}

// errorMessages.js
export default {
  NETWORK: 'Network error. Please check your connection and try again.',
  UNAUTHORIZED: 'You are not authorized to view this resource.',
  NOT_FOUND: 'We couldn’t find what you were looking for.',
  UNKNOWN: 'Something went wrong. Please try again later.',
}
```

---

## SPA Routing on GitHub Pages

GitHub Pages is static and doesn’t handle client-side routes. This project uses a production-safe HashRouter strategy to make invalid routes and deep links work consistently.

Implementation (Option A: HashRouter)
- Router: `createHashRouter` (hash-based URLs)
- Base path: `vite.config.js` sets `base: '/tech-va-portfolio/'` for assets
- 404 rewrite: `public/404.html` preserves the path and redirects to `/#/path`
- Local preview: `src/main.jsx` converts non-hash deep paths to hash before React renders (so `.../foo` → `.../#/foo`)

URL Examples
- Home: `/tech-va-portfolio/#/`
- About: `/tech-va-portfolio/#/about`
- Invalid (NotFound): `/tech-va-portfolio/#/kl`

Behavior
- Direct deep link (non-hash) in production (e.g., `/tech-va-portfolio/about`) → 404.html rewrites to hash → SPA resolves to About
- Invalid non-hash link (e.g., `/tech-va-portfolio/kl`) → rewritten to hash → SPA renders NotFound (no silent redirect to Home)

Note
- If you later require clean URLs, switch to BrowserRouter and keep a path-preserving 404.html rewrite pattern; however, HashRouter is the most reliable for GitHub Pages.

---

## Testing & Verification

Use this checklist before deploying:

1) Maintenance toggle
   - `VITE_MAINTENANCE_MODE=true` shows Maintenance everywhere except Contact.
   - `false` restores normal routing.
2) Routing and 404 behavior (HashRouter)
  - Local (preview):
    - Open `/tech-va-portfolio/#/about` → renders About
    - Open `/tech-va-portfolio/#/kl` → renders NotFound
    - Open non-hash `/tech-va-portfolio/kl` → auto-rewrites to hash → NotFound
  - Production (GitHub Pages):
    - Open `/tech-va-portfolio/#/about` → renders About; refresh works
    - Open `/tech-va-portfolio/#/kl` → renders NotFound
    - Open non-hash `/tech-va-portfolio/kl` → 404.html rewrites to hash → NotFound
3) Error Boundary
   - Intentionally throw in a child component → Fallback UI shows without crash.
4) API failures
   - Simulate network failure → Friendly message via `ErrorState`.
   - Unauthorized/404 mapping → Correct message from `errorMessages.js`.
5) Accessibility
   - Keyboard-only navigation → All actions reachable.
   - Screen reader → Error messages are understandable.
   - Reduced motion → No critical content relies on animation.

---

## Home Navigation in Error Fallbacks

The global `ErrorBoundary` uses `import.meta.env.BASE_URL` to navigate back to the correct base path in production (GitHub Pages): this prevents broken “Go Home” buttons when the site is hosted in a subpath.

---

## Operational Guidance

- Keep error copy calm, short, and actionable.
- Avoid exposing technical details (stack traces, endpoints, IDs).
- Prefer qualitative assurances (what users can do next) over raw diagnostics.
- Consider server-side logging or Sentry only when a backend exists.

---

## Future Enhancements

- Centralized telemetry (client → server) with redaction.
- Per-route boundaries for finer-grained recovery.
- Localized error messages with i18n.
- Offline-first messaging for network outages.

---

## Appendix: Quick References

- Error UI: `components/ui/ErrorState.jsx`, `components/ui/EmptyState.jsx`
- Boundary: `components/ErrorBoundary.jsx`
- API Wrapper: `services/api/apiClient.js`
- Messages: `config/errorMessages.js`
- Types: `constants/errorTypes.js`
- Pages: `pages/errors/NotFound.jsx`, `pages/errors/Maintenance.jsx`
VITE_MAINTENANCE_MODE=false
```

### 2. **Use the API Wrapper**

```javascript
import { apiFetch, post } from '../services/api/apiClient'

// GET request
const { success, data, error } = await apiFetch('/api/endpoint')

// POST request
const { success, data, error } = await post('/api/contact', {
  name: 'John',
  email: 'john@example.com'
})

if (!success) {
  // error.type: 'network' | 'server' | 'validation' | 'auth' | 'notFound' | 'unknown'
  // error.message: safe user-facing message
  console.log(error.message)
}
```

### 3. **Use Error State Components**

```javascript
import ErrorState from '../components/ui/ErrorState'
import { ERROR_MESSAGES } from '../config/errorMessages'

<ErrorState
  title={ERROR_MESSAGES.API_ERROR.title}
  message={ERROR_MESSAGES.API_ERROR.message}
  onRetry={() => fetchData()}
  showRetry={true}
/>
```

### 4. **Create Safe Error Messages**

```javascript
import { createSafeError } from '../utils/errorHandler'

try {
  // Some operation
} catch (err) {
  const safeError = createSafeError(err, ERROR_TYPES.UNKNOWN)
  // safeError has: { type, message, title }
  setStatus({ type: 'error', message: safeError.message })
}
```

## 📄 Error Message Configuration

Edit `src/config/errorMessages.js` to update any user-facing error text:

```javascript
export const ERROR_MESSAGES = {
  NOT_FOUND: {
    title: 'Page Not Found',
    message: 'The page you\'re looking for doesn\'t exist or has been moved.'
  },
  NETWORK_ERROR: {
    title: 'Connection Error',
    message: 'Unable to connect. Please check your internet and try again.'
  },
  // ... more messages
}
```

## 🔒 Production Safety

- ✅ No raw stack traces shown in UI
- ✅ No internal error messages exposed
- ✅ Development errors logged to console only in `DEV` mode
- ✅ Production errors logged with safe, generic messages
- ✅ Error IDs generated for support reference (without exposing details)

## ⚙️ Configuration via Environment Variables

```
# .env
VITE_MAINTENANCE_MODE=false
VITE_CONTACT_API_URL=/api/contact
ZOHO_WEBHOOK_URL=https://your-zoho-endpoint-here
```

## 🧪 Testing Error Pages

1. **404 Page:** Navigate to `/invalid-page`
2. **Maintenance Mode:** Set `VITE_MAINTENANCE_MODE=true` in `.env`, restart dev server
3. **Error Boundary:** Simulate a component error by throwing in any component's render

## 📚 Further Enhancements

- Add error tracking service (Sentry, LogRocket)
- Implement retry logic with exponential backoff
- Add request timeout handling
- Create service health check
- Add analytics for error tracking

---

**All error pages are branded with the site's glassmorphism navy-blue theme and fully responsive.**
