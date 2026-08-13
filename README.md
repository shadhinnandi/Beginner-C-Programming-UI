# Beginner C Programming UI 🚀

A comprehensive, interactive educational system designed to guide learners from fundamental computer system concepts to advanced problem-solving in C. This repository hosts the front-end user interface and chapter reader for the curriculum.

👉 **Live Demo:** [https://shadhinnandi.github.io/Beginner-C-Programming-UI/](https://shadhinnandi.github.io/Beginner-C-Programming-UI/)

---

## 🌟 Key Features

* **Interactive Chapter Reader**: Read and study curriculum modules dynamically parsed from Markdown files.
* **Syntax Highlighting**: Beautifully formatted code blocks powered by `highlight.js` with dark mode theme styling.
* **Academic Alignment**: Content structured specifically to support:
  * **Introduction to Computer Systems (ICS)**
  * **Structural Programming Language (SPL)**
  * **Data Structures & Algorithms (DSA)** pre-requisite preparation
* **Extensive Practice Bank**: Focuses on algorithmic logic with over 250 curated challenges categorized by difficulty level (Easy, Medium, Hard).
* **Keyboard Navigation**: Native controls including Arrow keys for next/previous chapters and Escape to exit reader modes.
* **Modern Fluid UI**: Glassmorphic elements, scroll indicators, and animations implemented using vanilla CSS variables.

---

## 🛠️ Technology Stack

* **Core**: HTML5, Vanilla JavaScript (ES Modules), Vanilla CSS
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Third-Party Libraries**:
  * [Marked](https://marked.js.org/) (Client-side Markdown parser)
  * [Highlight.js](https://highlightjs.org/) (Real-time code tokenization and styling)
* **Hosting**: GitHub Pages (automated via GitHub Actions workflows)

---

## 📂 Repository Structure

```text
├── .github/workflows/
│   └── deploy.yml        # CI/CD deployment configuration for GitHub Pages
├── public/
│   ├── content/          # Markdown curriculum files (Chapters 00 to 14)
│   └── vite.svg          # Application icon
├── index.html            # Core HTML layout & entry point
├── main.js               # Application state, modal control, and reader logic
├── style.css             # Fluid responsive layout styling
├── vite.config.js        # Vite configuration (subpath base configuration)
├── package.json          # Dependency and script manager
└── README.md             # Project documentation
```

---

## 💻 Local Setup & Development

Ensure you have [Node.js](https://nodejs.org/) installed, then follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shadhinnandi/Beginner-C-Programming-UI.git
   cd Beginner-C-Programming-UI
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open the local link in your browser (typically `http://localhost:5173`) to view the application locally with hot-module reloading enabled.

4. **Build for production**:
   ```bash
   npm run build
   ```
   This will bundle the assets and output them to the `/dist` directory.

---

## 📄 License & Attribution

This project is licensed under the **MIT License**.

### Copyright Notice
All curricular structure, progressive learning flows, problem sets, and educational content are the intellectual property of the author.

* **Author**: **Shadhin Nandi** ([github.com/shadhinnandi](https://github.com/shadhinnandi))
