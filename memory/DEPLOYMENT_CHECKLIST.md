# BugZero.ai Production Deployment Checklist

## 1. Environment Variables (Netlify → Site Settings → Environment Variables)

Set ALL of these before deploying:

| Variable | Where to get it | Required |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Project Settings → API | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Project Settings → API | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Project Settings → API | ✅ |
| `MONGO_URL` | MongoDB Atlas → Connect → Drivers | ✅ |
| `NEXTAUTH_URL` | Set to `https://bugzero.solutions` exactly | ✅ |
| `NEXTAUTH_SECRET` | Run: `openssl rand -hex 32` | ✅ |
| `ADMIN_EMAIL` | Your admin email | ✅ |
| `ADMIN_PASSWORD` | Strong password (min 12 chars) | ✅ |
| `RAZORPAY_KEY_ID` | Razorpay Dashboard → Settings → API Keys | ✅ (for VAPT) |
| `RAZORPAY_KEY_SECRET` | Razorpay Dashboard → Settings → API Keys | ✅ (for VAPT) |
| `OPENROUTER_API_KEY` | https://openrouter.ai | Optional (chat AI) |

## 2. Supabase Setup

- [ ] Run migration: `supabase/migrations/20240103000000_create_vapt_tables.sql`
- [ ] Ensure `vapt_orders` and `vapt_scans` tables exist
- [ ] Check RLS policies on `contact_requests` allow anonymous inserts
- [ ] Supabase project must be on a **paid plan** or ensure free tier limits won't be hit

## 3. Razorpay Setup

- [ ] Use **Live keys** in production (not test keys)
- [ ] In Razorpay Dashboard → Payment Pages: set success redirect to `https://bugzero.solutions/vapt-dashboard`
- [ ] Webhook: optional but recommended for payment failure recovery

## 4. Netlify Setup

- [ ] Plugin `@netlify/plugin-nextjs` is installed (already in `netlify.toml`)
- [ ] Node version set to 18 (already in `netlify.toml`)
- [ ] Domain: `bugzero.solutions` pointing to Netlify
- [ ] HTTPS: Auto-enabled by Netlify (Let's Encrypt)
- [ ] Build command: `npm run build`
- [ ] Publish directory: `.next`

## 5. DNS (Namecheap / Cloudflare / etc.)

- [ ] `bugzero.solutions` → Netlify DNS or A record pointing to Netlify IP
- [ ] `www.bugzero.solutions` → CNAME → `<site>.netlify.app`
- [ ] Wait 24-48h for DNS propagation after first setup

## 6. Post-Deploy Verification

### Mobile Chrome Test
- [ ] Open `https://bugzero.solutions` on Android Chrome
- [ ] Navigation links all work
- [ ] VAPT ₹999 page loads: `https://bugzero.solutions/vapt-basic-999`
- [ ] Razorpay checkout opens (no CSP error in console)
- [ ] Contact form submits
- [ ] Chatbot works

### Desktop Chrome/Safari Test
- [ ] All service pages load (`/services/web-application-vapt` etc.)
- [ ] Blog loads
- [ ] Free security scan works: `/free-security-scan`
- [ ] Admin login works: `/admin/login`

### API Health Check
- [ ] `https://bugzero.solutions/api/health` returns `{"status":"ok"}`
- [ ] `https://bugzero.solutions/api/vapt/create-order` returns `503` with `fallback_url` if Razorpay not configured

## 7. Known Configurations That Break Cross-Device Access

| Issue | Fix |
|---|---|
| Razorpay blocked by CSP | Fixed in `next.config.js` — Razorpay domains added to CSP |
| `NEXTAUTH_URL` not set | Set to `https://bugzero.solutions` in Netlify env vars |
| `SUPABASE_SERVICE_ROLE_KEY` missing | VAPT payment flow will throw a clear error, not silently fail |
| `MONGO_URL` missing | Chat, admin, contact will throw a clear error |
| Razorpay test keys in production | Payment page loads but all payments fail |

## 8. Testing Payment Flow (Step by Step)

1. Go to `https://bugzero.solutions/vapt-basic-999` on mobile
2. Enter name + email → Click "Pay ₹999 & Start Scan"
3. Razorpay checkout popup opens (NOT a redirect)
4. Complete payment with Razorpay test card: `4111 1111 1111 1111`, CVV: `123`, OTP: `1234`
5. After payment → redirected to `/vapt-dashboard`
6. Enter target URL → check authorization box → click "Start VAPT Scan"
7. Wait 10-30 seconds → scan results appear
8. Click "View Full Report & Download PDF" → PDF downloads

## 9. Common Debug Commands

```bash
# Check build locally
npm run build

# Check for TypeScript/lint errors
npx next lint

# Test API health
curl https://bugzero.solutions/api/health
```

## 10. If Site Still Doesn't Load on Other Devices

1. **Check DNS**: `nslookup bugzero.solutions` — should return Netlify IP
2. **Check HTTPS**: Visit with `https://` prefix explicitly
3. **Check Netlify deploy logs**: Netlify Dashboard → Deploys → Latest deploy → View log
4. **Check browser console**: F12 → Console → Look for CSP errors or 404s
5. **Check Netlify env vars**: Ensure no trailing spaces in values
