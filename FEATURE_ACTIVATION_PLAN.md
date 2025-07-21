# Feature Activation Plan  
_Botswana Financial Services Regulatory Framework – Hackathon Readiness_

This document enumerates every major feature area in the application, states its current status after the latest code push, and lists the specific tasks required to reach “fully-activated, demo-ready” quality.

| # | Feature Area | Current Status | Activation Tasks to Finish |
|---|--------------|----------------|----------------------------|
| 1 | **Home Page Features & CTAs** | Core hero section + 3 CTA buttons rendered, only “Get Started” wired; testimonials & newsletter placeholder. | • Link all CTAs to correct routes (`/register`, `/documents`, `/contacts`) <br>• Enable newsletter signup (store email → toast + mock API) <br>• Add scrolling marquee of regulators’ logos (static assets ready, needs render) |
| 2 | **Navigation & Routing** | Top nav/side nav visible; some links disabled behind “#”. | • Remove `#` placeholders, route to real pages (`/analytics`, `/alerts`, `/profile`) <br>• Mobile menu: hook burger icon to open/close state <br>• Highlight active link via `NavLink` styling |
| 3 | **Dashboard Functionality** | Layout + info cards visible, graphs empty. | • Connect cards to live counts from React-Query mock endpoints (documents, users, alerts) <br>• Render mini-charts with dummy data (Recharts already installed) |
| 4 | **Forms & Submissions** | Registration, login, upload, verify-email working; other forms stubbed. | • Activate profile edit form (PUT mock) <br>• Activate “Create Alert” form inside Alerts page <br>• Validate Contact Us form (see #9) |
| 5 | **Analytics & Reporting** | Route exists, table & chart placeholders. | • Build 3 KPI widgets (uploads/week, downloads/week, active users) <br>• Load sample data via mock service <br>• Enable CSV export (generate on client, trigger download) |
| 6 | **Profile Management** | Read-only view shows demo data. | • Add “Edit” mode with controlled inputs <br>• Persist changes to localStorage mock <br>• Avatar upload (accept image, store as Base64) |
| 7 | **Compliance Tools** | Compliance Wizard route exists, steps empty. | • Implement 4-step wizard (Select Regulator → Choose Obligation → Upload Evidence → Review) <br>• Persist wizard progress in context <br>• Success screen with shareable PDF summary |
| 8 | **Search & Filtering** | Documents page search + filters active; global top search bar inert. | • Hook global search to `/search` route with query param <br>• Display aggregated results (documents, alerts, knowledge) <br>• Add debounced auto-suggest dropdown |
| 9 | **Contact Forms** | Contact page UI exists, submit is `console.log`. | • Add form validation (name, email, message) <br>• Mock POST to /api/contact then toast success <br>• Clear form after send |
|10| **Business Pages** | Static content, CTA buttons dead. | • Link “Request Demo” → open modal with contact form (reuse #9 logic) <br>• Add FAQ accordion (data array ready) |
|11| **Developer Resources** | Page skeleton, code snippets missing. | • Populate REST & GraphQL endpoint examples <br>• Add “Copy” buttons with clipboard API <br>• Provide Postman collection download |
|12| **Knowledge Base** | Public browsing enabled, categories list shows but article view placeholder. | • Render markdown articles using `react-markdown` <br>• Add breadcrumb nav <br>• Enable category/tag filtering in sidebar |
|13| **Alert Systems** | Alert list renders; create/edit/delete disabled. | • Enable “Create Alert” modal (#4) <br>• Implement in-table toggle for active/inactive <br>• Toast notifications for alert events |
|14| **Settings & Configuration** | Settings page route exists, empty panel. | • Provide toggles for dark mode, email notifications, privacy <br>• Save preferences in localStorage <br>• Add “Reset Demo Data” button calling `resetMockStore()` |

---

### Prioritisation Order
1. Navigation fixes  
2. Remaining forms (Profile, Alert, Contact)  
3. Compliance Wizard & Analytics widgets  
4. Knowledge Base article rendering  
5. Developer resources / Business demo extras  
6. Settings polish & optional enhancements

### Time Estimate
| Priority | Hours |
|----------|-------|
| 1 | 2 |
| 2 | 4 |
| 3 | 6 |
| 4 | 3 |
| 5 | 3 |
| 6 | 2 |
_Total_: **~20 hours developer effort**

### Acceptance Criteria
• Every link or button presents a visible action with feedback (navigation, toast, modal, or download).  
• No console errors in browser dev tools.  
• Demo script can flow through registration → activation → login → dashboard → compliance wizard → analytics → alerts → profile edit → download document → contact form without dead ends.
