# Production Deployment Guide (Cloudflare Pages + GitHub)

## Scope
This project is deployed through Cloudflare Pages with GitHub integration.

## 1. Cloudflare Pages Setup
1. Open Cloudflare Dashboard -> Workers & Pages -> Create application -> Pages.
2. Connect GitHub and select `stpn-dev/tech-va-portfolio`.
3. Configure build settings:
- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/` (leave default)
4. Set production branch to `main`.

## 2. Environment Variables (Cloudflare)
In Pages project settings -> Variables and Secrets, add:
- `ZOHO_WEBHOOK_URL` (Secret)
- `VITE_CONTACT_API_URL` (`/api/contact`)
- `VITE_MAINTENANCE_MODE` (`false` by default)

Notes:
- Do not store secrets in repository files.
- Rotate or regenerate Zoho webhook URLs/tokens immediately if ever exposed.

## 3. Routing and Headers
This repo now includes Cloudflare Pages static config:
- `public/_redirects`: SPA fallback (`/* /index.html 200`)
- `public/_headers`: CSP + security headers

These files are copied to `dist/` during build and applied by Cloudflare.

## 4. GitHub Workflow Behavior
GitHub Actions is now CI-only (lint/build/audit). Deployment is handled by Cloudflare after pushes to `main`.

CI file:
- `.github/workflows/deploy.yml`

## 5. Pre-Deployment Checklist
- `npm ci`
- `npm run lint`
- `npm run build`
- `npm run preview`
- Validate contact form on preview build
- Verify no sensitive values in tracked files

## 6. Post-Deployment Verification
After Cloudflare deploy completes:
1. Open production URL and test all routes directly:
- `/`
- `/about`
- `/experiences`
- `/portfolio`
- `/contact`
2. Check response headers in browser DevTools or terminal:
- `content-security-policy`
- `x-content-type-options`
- `strict-transport-security`
- `referrer-policy`
- `permissions-policy`
3. Test contact form submission end-to-end.

## 7. Rollback
If a release fails:
1. Revert the problematic commit in GitHub.
2. Push to `main`.
3. Cloudflare triggers a new deployment automatically.
4. Optionally promote a previous successful deployment from Cloudflare Pages dashboard.

## 8. Ongoing Security Hygiene
- Run `npm audit --omit=dev --audit-level=high` regularly.
- Rotate Zoho endpoints/tokens periodically.
- Keep CSP in `public/_headers` updated when adding new external services.
- Keep dependencies up to date.
