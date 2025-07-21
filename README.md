# Financial Services Regulatory Framework (FSRF) Portal

A one-stop, self-service platform that guides financial-services innovators through Botswana’s complex regulatory landscape.  
The portal offers interactive tooling, document templates, and automated check-lists to help FinTechs, banks, insurers, and other regulated entities achieve and maintain compliance with the Bank of Botswana (BoB), NBFIRA, FIA, BURS, CIPA and allied authorities.

---

## ✨ Key Features

| Category | Capability |
|----------|------------|
| Compliance Roadmap | AI-driven wizard generates a 7-phase, milestone-based licensing journey with timelines, costs, priority tags, and document requirements. |
| Downloadable Checklists | One-click export of customised PDF/CSV check-lists for every regulatory phase. |
| Document Templates | Pre-approved template library for policies, AML / CFT programmes, risk frameworks, prospectuses, etc. |
| Real-time Analytics | Dashboard of compliance progress, task completion, and filing deadlines. |
| Role-Based Access | Admin, Compliance Officer, and General User roles with granular permission control. |
| Session Persistence | Secure local-storage session ID with multi-tab synchronisation. |
| Notifications | Toasts & email alerts for activation codes, checklist downloads, and deadline reminders. |
| Responsive UI | Mobile-first user experience built with Tailwind & shadcn-ui components. |

---

## 🛠 Technology Stack

* **Frontend**: Vite + React 18 (TypeScript)
* **UI Library**: shadcn-ui, Tailwind CSS 3
* **State / Auth**: React Context, LocalStorage
* **Icons**: Lucide
* **Tooling**: ESLint, Prettier, Husky (pre-commit)
* **Deployment**: Netlify (static) / Lovable dev environment

---

## 👥 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Administrator | `admin@bob.bw` | `password123` |
| Compliance Officer | `compliance.officer@fintech.co.bw` | `password123` |
| General User | `user@fintech.co.bw` | `password123` |

_Note: These accounts are mock users for exploration purposes only._

---

## ⚙️ Installation & Setup

```bash
# 1. Clone
git clone https://github.com/<your-org>/financial-services-regulatory-framework.git
cd financial-services-regulatory-framework

# 2. Install dependencies
npm install          # or: pnpm install / yarn

# 3. Environment
# For local mocks no .env is required, but you can copy .env.example if present.
cp .env.example .env.local   # edit as needed

# 4. Run dev server
npm run dev          # Vite auto-reload enabled
```

The app will be available at http://localhost:5173 (default Vite port).

---

## 🚀 Usage Guide

1. **Register / Login** using the demo credentials or create a new account (activation code delivered via on-screen alert for demo).
2. **Launch the Compliance Journey Wizard** from the dashboard.
3. Fill in **Company Information** & **Services** → generate personalised roadmap.
4. **Download Checklist** or export a full report.
5. Explore the **Knowledge Centre** for template downloads and regulatory guidance.
6. Review **Analytics** for progress and upcoming obligations.

---

## 📂 Project Structure

```
src/
 ├─ assets/              # Static images & icons
 ├─ components/
 │   ├─ ui/              # shadcn-ui wrapped components
 │   ├─ layout/          # Public & protected layouts
 │   └─ auth/            # Forms & guards
 ├─ contexts/            # React Context providers (Auth, Theme, etc.)
 ├─ pages/               # Route-level components
 ├─ lib/                 # Utility functions
 ├─ routes.tsx           # React-Router configuration
 └─ main.tsx             # Vite entry point
```

---

## 🧑‍💻 Development Workflow

* **Commit style**: Conventional Commits (`feat:`, `fix:`, `docs:`)  
* **Linting**: `npm run lint` (ESLint + TS)  
* **Formatting**: `npm run format` (Prettier)  
* **Tests**: _(planned)_ unit tests with Vitest + React Testing Library  
* **Git Hooks**: Husky blocks commits that fail lint / format

Run the full quality suite:

```bash
npm run lint && npm run format
```

---

## 🌐 Deployment

### 1. Lovable (recommended)

1. Open the project page → **Share → Publish**.  
2. Select **Netlify** or Lovable hosting and follow the prompts.

### 2. Netlify manual

```bash
npm run build          # Generates /dist
netlify deploy --prod -d dist
```

### 3. Custom Domain

In Lovable: **Project → Settings → Domains → Connect Domain**  
Follow the wizard to add DNS records and issue HTTPS certificates.

---

## 🤝 Contributing

1. Fork the repository and create a feature branch:
   ```
   git checkout -b feat/my-awesome-feature
   ```
2. Commit your changes following Conventional Commits.
3. Ensure `npm run lint` passes.
4. Push and open a Pull Request describing the change and linking to any relevant issue.

All contributions—code, documentation, and feedback—are welcome!

---

## 📄 License

This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for full text.

---
