<p align="center">
  <img src="https://raw.githubusercontent.com/gijs-hulsebos/gijs-hulsebos/main/GijsHulsebos.banner.png" alt="Gijs Hulsebos AI Automation" width="100%" />
</p>

<p align="center">
  <a href="https://gijshulsebos.com">
    <img src="https://img.shields.io/badge/gijshulsebos.com-121212?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Website" />
  </a>
  &nbsp;
  <a href="https://www.linkedin.com/in/gijs-hulsebos">
    <img src="https://img.shields.io/badge/LinkedIn-121212?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
</p>

---

### 🤖 Gijs Hulsebos — Portfolio

The source code behind **[gijshulsebos.com](https://gijshulsebos.com)**: a multilingual portfolio bringing together my projects, applications, workflows, tools, experiments, and technical certificates.

Built around an interactive **bento grid**, expandable project cards, and a portrait and certificate carousel. Available in **English, Dutch, and German**.

---

### 🚀 Explore the Portfolio

* **Interactive project index:** Open cards in place to explore project descriptions, implementation details, technology stacks, videos, and links.
* **Featured projects:** Dedicated presentations for **Tarvos** and **Aegix**, with their own branding, video players, and hackathon information.
* **Project categories:** Browse Projects, Standalone Apps, Workflows, Tools, and Experiments on the projects page.
* **Technical credentials:** Explore certificates through the animated carousel and a searchable certificate library.
* **Language support:** Switch between English, Dutch, and German throughout the interface.

> [!NOTE]
> This repository contains the portfolio website. The individual projects it presents have their own repositories or websites where available. Some client work and private projects do not expose their source code or a public application.

---

### 🛠️ Technical Stack

| Layer | Technologies | Purpose |
| :--- | :--- | :--- |
| **Application** | Next.js, React, TypeScript | Pages, components, and interactive project views |
| **Styling** | CSS, Tailwind CSS, Lucide React | Dark theme, responsive layouts, and interface icons |
| **Motion** | Motion, Web Animations API | Card transitions and certificate carousel animation |
| **Certificate processing** | Python, pypdfium2, Pillow | Import certificate metadata and generate PDF previews |
| **Automation & hosting** | GitHub Actions, Vercel | Certificate synchronization, validation, and deployment |

---

### 🎓 Certificate Synchronization

Certificates are sourced from **[gijs-hulsebos/Certificates](https://github.com/gijs-hulsebos/Certificates)**.

The **[Sync certificate previews](https://github.com/gijs-hulsebos/ai-automation-demo/actions/workflows/sync-certificates.yml)** workflow checks for updates on a schedule and supports manual runs and repository dispatch events. It:

1. Runs the Python tests and imports certificate data.
2. Generates preview images and updates the certificate manifest.
3. Builds the website before publishing changed assets.
4. Checks the production carousel and its certificate detail links.

Generated metadata lives in `data/certificates.json`; preview assets live in `public/certificates/`.

---

### 💻 Run Locally

Use **Node.js 22** to match the GitHub Actions environment.

```sh
npm ci
npm run dev
```

Open **[localhost:3000](http://localhost:3000)**. No API keys are required to browse the portfolio locally.

To build and run the production version:

```sh
npm run build
npm start
```

To run the code checks:

```sh
npm run lint
npx tsc --noEmit
```

<details>
<summary><strong>Optional: synchronize certificates locally</strong></summary>

Use Python 3.12 to match the workflow environment:

```sh
python -m pip install -r scripts/requirements-certificates.txt
python -m unittest discover -s scripts -p "test_*.py"
python scripts/sync_certificates.py
```

This updates the generated certificate manifest and preview assets in the working tree.

</details>

---

### 📂 Repository Structure

| Directory | Contents |
| :--- | :--- |
| `app/` | Next.js routes and global styles |
| `components/` | Bento cards, project details, certificate views, and shared interface components |
| `context/`, `hooks/`, `lib/` | Shared state, hooks, and supporting logic |
| `data/` | Project content, translations, and certificate metadata |
| `public/` | Logos, videos, category icons, and certificate previews |
| `scripts/` | Certificate synchronization, tests, and production verification |
| `.github/workflows/` | GitHub Actions automation |

---

### 📈 Design & Interaction

* **Content in context:** Compact project cards reveal extended information when opened.
* **Responsive composition:** An asymmetric grid adapts to the available space.
* **Accessible interaction:** Keyboard controls and reduced-motion preferences are supported.
* **Shared content:** Project information and translations support the homepage and project overview.

> [!NOTE]
> The learning trajectory page is currently **coming soon**. The chat widget is a local interface and does not send messages to a backend.

---

### 🌐 Let's Connect

* **Website:** [gijshulsebos.com](https://gijshulsebos.com)
* **LinkedIn:** [Gijs Hulsebos](https://www.linkedin.com/in/gijs-hulsebos)
* **Email:** [gijs@gijshulsebos.com](mailto:gijs@gijshulsebos.com)

---

<p align="center">
  <img src="https://raw.githubusercontent.com/gijs-hulsebos/gijs-hulsebos/main/readme.md.banner.png" alt="Gijs Hulsebos AI Automation Footer" width="100%" />
</p>
