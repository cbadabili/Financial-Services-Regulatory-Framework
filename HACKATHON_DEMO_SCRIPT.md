# Botswana Financial Services Regulatory Framework  
## **Hackathon Demo Script (7 minutes total)**  

### 0. Prep Checklist (before you go on stage)
- Local dev server running: `npm run dev` → http://localhost:8080  
- Admin account credentials handy (e.g. **admin / P@ssw0rd!**)  
- Sample PDF for upload (e.g. `Capital_Adequacy_Guideline.pdf`)  
- Browser tabs pre-opened:  
  1. Home (`/`) 2. Documents (`/documents`) 3. Search (`/search`)  
- Backup screenshots in a slide deck (in case Wi-Fi fails).

---

## 1 – Opening (0:00 – 0:30)
**Slide / Talking points**
```
“Good day judges!  
We present Botswana’s Financial Services Regulatory Framework – a one-stop portal that makes compliance simple, searchable and collaborative.”
```
**No live action yet.**

---

## 2 – Public Experience (0:30 – 1:30)

1. **Home page**  
   - Point at gold-shield logo ➜ “trust & authority branding”.  
   - Click **Compliance Roadmap** in nav → `/compliance-roadmap`.  
   - Scroll hero & phase cards briefly – shows 8+ authorities and 7-phase journey.  

2. **Public Knowledge**  
   - Click **Documents** in nav.  
   - Emphasise **no login required**: “Anyone can browse 300+ live acts & guidelines.”  
   - Run a quick filter (Regulator = BoB, Category = Banking) to show instant results.

---

## 3 – Smart Search & Checklist (1:30 – 2:30)

1. Navigate to `/search`.  
2. Ask voice-query: type **“capital requirements for banks”** → *Search*.  
3. Show:  
   - Smart Answer card with confidence badge.  
   - Filters panel (open → pick “High Risk Level > 60”).  
4. Click **Generate Checklist** → choose **Commercial Bank** template → *Generate*, then **Export PDF**.  
   - “15 seconds to a personalised compliance roadmap.”

---

## 4 – ***Star Use-Case*** – Admin Upload Workflow (2:30 – 4:30)

> “Let’s add a brand-new directive and watch it appear live for the public.”

1. **Sign In**  
   - Click **Sign In** → enter admin creds → redirected to `/documents` (button *Upload Documents* now visible).  

2. **Open Upload Modal**  
   - Click *Upload Documents* → modal appears.  
   - Fill:  
     - Title = **“Capital Adequacy Guideline 2025”**  
     - Regulator = **BoB**  
     - Category = **Banking Regulation**  
     - File = select `Capital_Adequacy_Guideline.pdf`  
   - Click **Save & Upload**  

3. **Success Feedback**  
   - Toast: “Document uploaded”.  
   - The new document appears at the **top of list** with today’s date, correct size, status = Active.  
   - Click **View** ➜ preview modal.  
   - Click **Download** ➜ PDF opens in new tab (valid file).

**Judge validation**: ask them to type title in search bar – result shows instantly (state synced).

---

## 5 – Analytics & Compliance Journey (4:30 – 5:30)

1. Navigate to **Dashboard** (requires login) – quick glance at compliance progress, recent uploads log contains the new guideline.  
2. Go to **Compliance Wizard** – demo first step (business type, regulator matrix) then stop → “full flow available”.

---

## 6 – Technical Excellence (5:30 – 6:00)

- React + TypeScript + Vite, Tailwind, shadcn-ui.  
- Gold-shield favicon & SVG logo (no more Loveable).  
- 100 % Lighthouse a11y score.  
- Tiny in-house PDF generator → zero heavy libs.  
- Modular auth (public vs private routes).

---

## 7 – Impact & Close (6:00 – 7:00)

```
“Result: 30 % of judging weight (advanced search & checklist) PLUS real-time document management, 8 regulators, full compliance roadmap, public transparency.  
We turn months of legal confusion into minutes of clarity.” 
```
Call-to-action: **“Try uploading your own document!”**

Bow & thank the judges.  
