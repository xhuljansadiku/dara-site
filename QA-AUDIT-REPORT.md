# QA Audit Report — DARA Marketing Agency Website

**Data:** 19 Shkurt 2025  
**Auditor:** QA Engineer (analizë statike e kodit)  
**Scope:** Auditim i plotë — Functional, Localization, UI/UX, Technical, Security

---

## 1. Functional Testing

### 1.1 Formularët

| Formular | API | Validim client | Validim server | Honeypot |
|----------|-----|----------------|----------------|----------|
| Contact (5 hapa) | POST /api/leads | ✅ Emër ≥2, email regex, mesazh ≥10 | ✅ | ✅ (hp: "") |
| Newsletter | POST /api/newsletter | ✅ required, type="email" | ✅ | ✅ (hp: "") |
| Training Register | POST /api/leads | ✅ Emër ≥2, email, trajnim | ✅ | ✅ (hp: "") |

### 1.2 Probleme të identifikuara

#### **P1.1 — Gabime API të shfaqura si kode tek përdoruesi**
- **Severity:** Medium
- **Steps:** Dërgo formularin me të dhëna që kthejnë INVALID_NAME, INVALID_EMAIL, INVALID_MESSAGE ose SERVER_ERROR.
- **Expected:** Mesazh i lokalizuar për përdoruesin.
- **Actual:** Shfaqet kodi i gabimit (p.sh. "INVALID_EMAIL", "SERVER_ERROR").
- **Vendndodhje:** `contact/page.tsx` (rreth rreshtit 276), `trainings/register/page.tsx` (rreth rreshtit 132), `NewsletterForm.tsx` (rreth rreshtit 66).
- **Rregullim:** Harto map të gabimeve API → mesazhe të lokalizuara (sq/en/de) për çdo kod.

#### **P1.2 — Mesazh i përzier gjuhësh (sq)**
- **Severity:** Low
- **Steps:** Në formularin e kontaktit, në gjuhën shqip, shkakto një gabim rrjeti (p.sh. ndërpre internetin).
- **Expected:** "Gabim rrjeti. Provo prap."
- **Actual:** "Network error. Provo prap."
- **Vendndodhje:** `contact/page.tsx` rreshti 291.
- **Rregullim:** Zëvendëso "Network error" me "Gabim rrjeti" për locale "sq".

#### **P1.3 — /api/leads pa try/catch për req.json()**
- **Severity:** Medium
- **Steps:** Dërgo një request me body jo-JSON (p.sh. text/plain ose JSON i dëmtuar).
- **Expected:** Përgjigje 400 me mesazh të qartë.
- **Actual:** Server mund të hedhë exception, 500 SERVER_ERROR.
- **Vendndodhje:** `app/api/leads/route.ts` rreshti 33.
- **Rregullim:** Shto try/catch rreth `await req.json()` si në `/api/newsletter`.

#### **P1.4 — /api/leads pa validim Content-Type**
- **Severity:** Low
- **Steps:** Dërgo POST me Content-Type: text/plain ose application/x-www-form-urlencoded.
- **Expected:** 415 ose 400.
- **Actual:** Mund të përpiqet të parse si JSON dhe të dështojë.
- **Vendndodhje:** `app/api/leads/route.ts`.
- **Rregullim:** Shto kontroll Content-Type si në newsletter API.

#### **P1.5 — Honeypot pa fushë të fshehur**
- **Severity:** Low
- **Steps:** Bots që dërgojnë hp: "" kalojnë honeypot.
- **Expected:** Honeypot fshehur në DOM që bots ta plotësojnë.
- **Actual:** Nuk ka fushë hp në formular; vetëm hp: "" hardcoduar në payload.
- **Rregullim:** Shto input të fshehur `name="hp"` (CSS: display:none) dhe mos e përfshi në payload nëse është bosh — ose përdor vetëm reCAPTCHA si mbrojtje kryesore.

### 1.3 Edge cases të kontrolluara
- ✅ Emër bosh / < 2 karaktere — refuzohet
- ✅ Email i pavlefshëm — refuzohet
- ✅ Mesazh < 10 karaktere — refuzohet
- ⚠️ Input shumë i gjatë — `clean()` e pret server-side (max 2000/4000), por nuk ka maxLength në të gjitha fushat
- ⚠️ Karaktere speciale — emri filtrohet client-side; mesazhi dërgohet pa sanitizim për XSS në email (por escapeHtml përdoret në lib/email.ts)

---

## 2. Localization (3 gjuhë: sq, en, de)

### 2.1 Konfigurim
- **Locales:** sq, en, de
- **Default:** sq (i18n.ts, middleware)
- **Fallback:** sq për locale të pavlefshme

### 2.2 Probleme të identifikuara

#### **P2.1 — LocaleLink përdor "en" kur params.locale mungon**
- **Severity:** Medium
- **Steps:** Përdor LocaleLink në kontekst ku useParams() nuk kthen locale (p.sh. faqe jashtë [locale]).
- **Expected:** Fallback në defaultLocale "sq".
- **Actual:** `params?.locale ?? "en"` — fallback në "en".
- **Vendndodhje:** `components/site/LocaleLink.tsx` rreshti 16.
- **Rregullim:** Zëvendëso me `params?.locale ?? defaultLocale` (importo defaultLocale nga i18n).

#### **P2.2 — Faqet Error dhe Not Found vetëm në anglisht**
- **Severity:** Medium
- **Steps:** Shkakto 404 ose error boundary.
- **Expected:** Tekst i lokalizuar sipas gjuhës së përdoruesit.
- **Actual:** "404", "Page not found", "Something went wrong", "Go to home" — të gjitha në anglisht.
- **Vendndodhje:** `app/not-found.tsx`, `app/error.tsx`, `app/global-error.tsx`.
- **Rregullim:** Shto lokalizim (p.sh. nga URL ose cookie) për këto faqe.

#### **P2.3 — Link "Go to home" i fiksuar në /sq**
- **Severity:** Low
- **Steps:** Përdoruesi në /de/contact merr error dhe klikon "Go to home".
- **Expected:** Kthehet në /de (ose në gjuhën e tij).
- **Actual:** Kthehet gjithmonë në /sq.
- **Vendndodhje:** `app/error.tsx`, `app/not-found.tsx`.
- **Rregullim:** Përdor locale nga pathname ose defaultLocale për linkun.

#### **P2.4 — Terminologji: "Service" në gjermanisht**
- **Severity:** Low
- **Steps:** Në formularin e kontaktit, gjuhë de, shiko etiketën "Shërbimi" / "Service".
- **Expected:** "Leistung" ose "Dienstleistung" në gjermanisht.
- **Actual:** "Service" (anglisht) — të pranueshme si fjalë huazimi, por jo konsistente me "Shërbimet" në sq.
- **Rregullim:** Vendos terminologji të qartë për të tre gjuhët.

### 2.3 Tekste të pambuluara
- Faqet error/404/global-error — të gjitha në anglisht
- JSON-LD në home page — përshkrimi në anglisht (pranueshme për SEO)
- Disa stringje të vogla në komponente — kontrollo manualisht për fallback në "en"

---

## 3. UI/UX & Responsive

### 3.1 Breakpoints (Tailwind)
- sm: 640px, md: 768px, lg: 1024px, xl: 1280px

### 3.2 Vëzhgime nga kodi
- ✅ Navbar: `md:flex` / `md:hidden` për desktop/mobile
- ✅ Contact: `md:grid-cols-5`, `sm:grid-cols-2` për grid
- ✅ Footer: grid responsive
- ✅ Mobile menu: `max-h-[calc(100vh-5rem)]` me overflow
- ⚠️ NewsletterForm: `sm:flex-row` — në mobile butoni mund të jetë i ngushtë
- ⚠️ Formularët e gjatë (contact 5 hapa) — kontrollo scroll dhe fokus në mobile

### 3.3 Rekomandime
- Testo manualisht në 375px, 768px, 1024px
- Kontrollo overflow tek tabela/lista të gjata
- Verifiko që butonat e floating (BackToTop, WhatsApp) nuk mbulojnë përmbajtje
- Kontrollo spacing kur ndërron gjuhën (tekste më të gjata në de)

---

## 4. Console & Technical Issues

### 4.1 Logging
- `console.warn` për RESEND_API_KEY të pamend, reCAPTCHA placeholder
- `console.error` për gabime API, RecaptchaProvider, error boundary
- **Rekomandim:** Në prod, konsidero log aggregation dhe mos ekspozo detaje të ndjeshme

### 4.2 Potenciale
- **Hydration:** `suppressHydrationWarning` në html dhe body për shtesat e shfletuesit (ColorZilla) — e adresuar
- **dangerouslySetInnerHTML:** Përdoret vetëm për JSON-LD me `JSON.stringify` — i sigurt (të dhëna statike)
- **Performance:** Nuk u identifikuan request të panevojshme nga analiza e kodit

---

## 5. Basic Security Checks

### 5.1 Të implementuara
- ✅ reCAPTCHA v3 (score ≥ 0.5)
- ✅ Honeypot (hp) në API
- ✅ `escapeHtml()` për të gjitha fushat në email
- ✅ `clean()` për input — trim, slice max length
- ✅ Validim email server-side
- ✅ Content-Type dhe JSON parse të sigurt në /api/newsletter

### 5.2 Mungesa
- ❌ **Rate limiting** — nuk ka limit për /api/leads dhe /api/newsletter (rrezik spam/abuse)
- ❌ **CSRF** — nuk ka token (Next.js API routes janë same-origin; rreziku varet nga deployment)
- ⚠️ **Leads API** — mungon try/catch për req.json(), Content-Type check
- ⚠️ **Honeypot** — nuk ka fushë të fshehur në formular

### 5.3 Rekomandime
1. Shto rate limiting (p.sh. 5 requests/minutë për IP në /api/leads dhe /api/newsletter)
2. Shto try/catch dhe Content-Type validation në /api/leads
3. Konsidero honeypot të vërtetë me fushë të fshehur

---

## 6. Përmbledhje e problemeve

| ID | Titulli | Severity |
|----|---------|----------|
| P1.1 | Gabime API të shfaqura si kode | Medium |
| P1.2 | Mesazh "Network error" në shqip | Low |
| P1.3 | /api/leads pa try/catch për JSON | Medium |
| P1.4 | /api/leads pa Content-Type check | Low |
| P1.5 | Honeypot pa fushë të fshehur | Low |
| P2.1 | LocaleLink fallback "en" në vend të "sq" | Medium |
| P2.2 | Error/404 vetëm në anglisht | Medium |
| P2.3 | Link "Go to home" i fiksuar në /sq | Low |
| P2.4 | Terminologji "Service" në de | Low |

---

## 7. Vlerësim dhe rekomandime

### Vlerësim i përgjithshëm
- **Cilësia e kodit:** 7.5/10 — strukturë e mirë, disa gabime të vogla
- **Localization:** 6/10 — përmbajtja kryesore e përkthyer, por error/404 dhe disa edge case jo
- **Security:** 6.5/10 — reCAPTCHA dhe sanitizim OK, mungon rate limiting
- **UX:** 7/10 — formularët funksionalë, por mesazhet e gabimit jo të lokalizuara

### Lista prioritare për rregullim
1. **Prioritet i lartë:** P1.1 (mesazhe gabimi të lokalizuara), P1.3 (try/catch në leads API)
2. **Prioritet mesatar:** P2.1 (LocaleLink fallback), P2.2 (error/404 të lokalizuara), rate limiting
3. **Prioritet i ulët:** P1.2, P1.4, P1.5, P2.3, P2.4

### Status rekomandimi për release
**Ready** ✅ — Të gjitha problemet e identifikuara janë rregulluar (19 Shkurt 2025).

---

## Rregullimet e bëra (post-audit)

| ID | Rregullim |
|----|-----------|
| P1.1 | `lib/api-errors.ts` — mesazhe të lokalizuara për të gjitha kodet e gabimit; Contact, Training, Newsletter përdorin `getApiErrorMessage()` |
| P1.2 | `NETWORK_ERROR_MESSAGES` — "Gabim rrjeti" për sq |
| P1.3 | `/api/leads` — try/catch për `req.json()`, validim body |
| P1.4 | `/api/leads` — kontroll Content-Type |
| P1.5 | Honeypot — fushë e fshehur `name="hp"` në Contact, Training, Newsletter |
| P2.1 | `LocaleLink` — fallback `defaultLocale` (sq) në vend të "en" |
| P2.2 | `lib/error-copy.ts` — Error, NotFound, GlobalError të lokalizuara (sq/en/de) |
| P2.3 | Link "Go to home" — dinamik nga pathname (`/${locale}`) |
| P2.4 | Contact form — "Leistung" për de në vend të "Service" |
| — | Rate limiting — `lib/rate-limit.ts`, 10 req/min për IP në /api/leads dhe /api/newsletter |
