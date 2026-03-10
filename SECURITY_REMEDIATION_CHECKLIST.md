# 🔐 Security Remediation Checklist

**Project:** Tech VA Portfolio  
**Date Started:** March 10, 2026  
**Target Deployment:** [Your target date]  

---

## 🔴 CRITICAL - Must Complete Before Going Live

### [ ] 1. Rotate Zoho Webhook/Endpoint

**Why:** Contact submission now uses a Zoho endpoint URL from environment variables.

**Steps:**
- [ ] Open your Zoho target (Zoho Flow webhook, Zoho Forms, or custom Zoho-backed API)
- [ ] Generate a new webhook/endpoint URL for production
- [ ] Restrict accepted methods to `POST`
- [ ] Restrict accepted origins to your production domain (if supported)
- [ ] Update destination routing to the correct mailbox/CRM owner
- [ ] Keep the endpoint URL private and rotate immediately if exposed

**Verify:**
```bash
# Test contact endpoint locally
npm run dev
# Test contact form submission
# Verify the submission appears in Zoho destination
```

**Status:** ⏳ Pending / ✅ Complete / ❌ On Hold

---

### [ ] 2. Update `.env.example` with Placeholders

**File:** `.env.example`

**Current (WRONG):**
```
VITE_ZOHO_WEBHOOK_URL=https://real-zoho-endpoint-should-not-be-committed
VITE_ZOHO_PAYLOAD_FORMAT=json
```

**New (CORRECT):**
```
VITE_ZOHO_WEBHOOK_URL=https://your-zoho-endpoint-here
VITE_ZOHO_PAYLOAD_FORMAT=json
```

**Verification Command:**
```bash
# Ensure expected Zoho keys are present
grep -E "VITE_ZOHO_WEBHOOK_URL|VITE_ZOHO_PAYLOAD_FORMAT" .env.example
# Should return both keys
```

**Status:** ⏳ Pending / ✅ Complete / ❌ On Hold

---

### [ ] 3. Update `.env.local` with Zoho Values

**Location:** `.env.local` (local machine only - NOT committed)

**Update to:**
```
VITE_ZOHO_WEBHOOK_URL=<your Zoho endpoint URL>
VITE_ZOHO_PAYLOAD_FORMAT=<json or form>
VITE_MAINTENANCE_MODE=false
```

**Verification:**
```bash
# Confirm file exists and is in .gitignore
ls -la .env.local
grep ".env.local" .gitignore  # Should return ".env.local"
```

**Status:** ⏳ Pending / ✅ Complete / ❌ On Hold

---

### [ ] 4. Update Cloudflare Pages Variables

**Location:** Cloudflare Dashboard → Workers & Pages → [project] → Settings → Variables and Secrets

**Steps:**
1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Update these variables:
  - `VITE_ZOHO_WEBHOOK_URL` → [production endpoint URL]
  - `VITE_ZOHO_PAYLOAD_FORMAT` → [`json` or `form`]
  - `VITE_MAINTENANCE_MODE` → [`false` unless maintenance mode is needed]

**Verification:**
```bash
# Trigger deployment after variable updates
git push origin main
```

**Status:** ⏳ Pending / ✅ Complete / ❌ On Hold

---

### [ ] 5. Test Contact Form After Zoho Setup

**Steps:**
1. Pull the latest code: `git pull origin main`
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Navigate to `/contact` page
5. Submit a test message with:
   - Name: "Test User"
   - Email: "your@email.com"
   - Subject: "Test Submission"
   - Message: "This is a test message"
6. Check Zoho destination (Flow execution, Form entries, CRM record, or routed email)
7. Verify no errors in browser console

**Status:** ⏳ Pending / ✅ Complete / ❌ On Hold

---

## 🟠 MAJOR - Strongly Recommended Before Deployment

### [ ] 6. Add Content Security Policy (CSP) Headers

**File to Update:** `index.html`

**Option A (Manual - Quick) - Add to `<head>`:**
```html
<meta 
  http-equiv="Content-Security-Policy" 
  content="
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: https:;
    connect-src 'self' https://*.zohopublic.com https://*.zoho.com https://www.googletagmanager.com https://www.google-analytics.com;
    frame-ancestors 'none';
  "
/>
```

Implement CSP directly in `index.html` and validate with preview build.

**Verification:**
```bash
# Check CSP is in HTML
grep "Content-Security-Policy" index.html
```

**Status:** ⏳ Pending / ✅ Complete / ❌ On Hold

---

### [ ] 7. Add Sub-Resource Integrity (SRI) to External Resources

**Files to Update:** `index.html`

**Google Analytics SRI:**
1. Visit [https://www.srihash.org/](https://www.srihash.org/)
2. Enter: `https://www.googletagmanager.com/gtag/js?id=G-MD3PL91M9G`
3. Copy the `integrity="sha384-..."` value
4. Add to script tag:
```html
<script 
  async 
  src="https://www.googletagmanager.com/gtag/js?id=G-MD3PL91M9G"
  integrity="sha384-..."
  crossorigin="anonymous"
></script>
```

**Google Fonts SRI:**
- Similar process for any external font links
- Usually fonts don't support SRI, so this is optional

**Verification:**
```bash
grep 'integrity=' index.html
```

**Status:** ⏳ Pending / ✅ Complete / ❌ On Hold

---

### [ ] 8. Add Rate Limiting to Contact Form

**File to Update:** `src/pages/Contact.jsx`

**Steps:**
1. Add rate limiting code directly into `Contact.jsx`
2. Test with rapid submissions and cooldown feedback
3. Test rapid submissions (should be blocked)
4. Verify error messages show "Please wait X seconds"

**Configuration:**
```javascript
const RATE_LIMIT_WINDOW = 5000 // 5 seconds
const MAX_SUBMISSIONS_PER_HOUR = 5 // 5 submissions per hour
```

**Adjust if needed:**
- `RATE_LIMIT_WINDOW`: Cooldown between submissions (milliseconds)
- `MAX_SUBMISSIONS_PER_HOUR`: Max submissions per 60-minute window

**Test:**
```bash
npm run dev
# Open Contact form
# Try submitting multiple times quickly
# Verify blocked after 1st submission for 5 seconds
```

**Status:** ⏳ Pending / ✅ Complete / ❌ On Hold

---

### [ ] 9. Add Dependency Audit to CI/CD

**File to Update:** `.github/workflows/deploy.yml`

**Add after `npm ci`:**
```yaml
- name: Audit dependencies for vulnerabilities
  run: npm audit --audit-level=moderate

- name: Check for outdated packages
  run: npm outdated
```

**Full updated step:**
```yaml
- name: Install dependencies
  run: npm ci

- name: Audit dependencies
  run: npm audit --audit-level=moderate
```

**Test locally first:**
```bash
npm audit --audit-level=moderate
npm outdated
```

**Status:** ⏳ Pending / ✅ Complete / ❌ On Hold

---

## 🟡 MINOR - Nice to Have

### [ ] 10. Set Up Error Monitoring (Optional)

**Services to consider:**
- [Sentry](https://sentry.io/) - Free tier available
- [LogRocket](https://logrocket.com/) - Session replay + analytics
- [Rollbar](https://rollbar.com/) - Error tracking

**Your ErrorBoundary already has comments for this:**
```javascript
// Could send to error tracking service here (Sentry, LogRocket, etc.)
```

**Status:** ⏳ Pending / ✅ Complete / ❌ On Hold

---

### [ ] 11. Document Security Setup (Private Wiki/README)

**Create:** `SECURITY_SETUP.md` (Private - not in public repo)

**Include:**
- How to rotate credentials
- Emergency procedures if credentials leak
- Contact form limits and configuration
- Rate limiting exceptions (if any)
- Monitoring and alerts setup

**Status:** ⏳ Pending / ✅ Complete / ❌ On Hold

---

### [ ] 12. Set Up Monthly Dependency Updates

**Create a schedule:**
- [ ] 1st of each month: Run `npm outdated` and `npm audit`
- [ ] Review and update if needed
- [ ] Test changes locally
- [ ] Deploy to staging before production

**Automation option (Optional):**
- Use [Dependabot](https://dependabot.com/) for auto-updates
- GitHub has built-in support

**Status:** ⏳ Pending / ✅ Complete / ❌ On Hold

---

## ✅ Verification Checklist

Before going to production, confirm:

- [ ] Zoho endpoint rotated and tested
- [ ] `.env.example` has placeholders, not real credentials
- [ ] `.env.local` updated with new credentials
- [ ] Cloudflare Pages variables updated
- [ ] Contact form test successful
- [ ] CSP headers added to HTML
- [ ] SRI hashes added to external scripts
- [ ] Rate limiting on contact form working
- [ ] `npm audit` passing (no critical/high vulnerabilities)
- [ ] `npm run build` completes without warnings
- [ ] `npm run preview` works and loads correctly
- [ ] Contact form submits successfully in preview build
- [ ] Error handling works (test by breaking something)
- [ ] No sensitive data in build output: `grep -r "password\|token\|key" dist/`

---

## 🚀 Deployment Steps

### Prerequisites
- [ ] All CRITICAL items completed
- [ ] All MAJOR items completed
- [ ] Verification checklist passed

### Deploy to Cloudflare Pages
```bash
# 1. Ensure all changes committed
git status  # Should be clean

# 2. Push to main (Cloudflare Pages production branch)
git push origin main

# 3. Monitor deployment
# Go to: Cloudflare Dashboard -> Workers & Pages -> [project] -> Deployments

# 4. Verify live
# Check: https://www.devlabstudios.com/
```

### Post-Deployment Checklist
- [ ] Site loads without HTTPS warnings
- [ ] Contact form works on live site
- [ ] No console errors
- [ ] All pages accessible
- [ ] Images load correctly
- [ ] Responsive on mobile

---

## 📞 Support & Questions

- **Zoho Endpoint Issues?** Check your Zoho Flow/Form/API logs and endpoint configuration
- **Security Questions?** See `SECURITY_AUDIT_REPORT.md`
- **GitHub Actions Help?** See `.github/workflows/deploy.yml`
- **Rate Limiting Tuning?** Use section 8 in this checklist as the baseline

---

## 📋 Sign-Off

**Completed By:** ________________  
**Date:** ________________  
**Reviewed By:** ________________  
**Date:** ________________  
**Deployed To Production:** ________________  

---

**Next Review Date:** ________________  
**Password Rotation Due:** [3-6 months from deployment]
