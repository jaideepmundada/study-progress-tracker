# 🚀 StudySync - Full-Stack Syllabus & Unit Progress Tracker

A full-stack web application designed to track unit-wise syllabus completion with a responsive **Frontend UI**, a zero-dependency **Node.js REST API Backend**, and a **Persistent Database**.

---

## 🎯 Configured Subjects & Units (10 Subjects • 49 Units Total)

| # | Subject Name | Code | Units | Focus / Syllabus Overview |
|---|--------------|:----:|:-----:|---------------------------|
| 1 | **Operating System** | `OS` | **5 Units** | Intro & System Calls, Process Management & Scheduling, Synchronization & Deadlocks, Memory Management & Virtual Memory, File Systems & I/O Protection |
| 2 | **Artificial Intelligence & Machine Learning** | `AI & ML` | **5 Units** | AI Fundamentals & Search, Knowledge & First-Order Logic, Supervised Learning, Unsupervised Learning & Neural Nets, Reinforcement Learning & Ethics |
| 3 | **Theory of Computation** | `TOC` | **5 Units** | Automata (DFA/NFA) & RegEx, Regular Grammars & Pumping Lemma, Context-Free Grammars & PDA, Turing Machines, Decidability & P vs NP |
| 4 | **Cloud Computing** | `CC` | **5 Units** | Cloud Architecture & Service Models, Virtualization & Resource Management, Cloud Storage & Security, Containers & Kubernetes, Monitoring & Serverless |
| 5 | **IPR and Cyber Laws** | `IPR` | **4 Units** | Fundamentals of IPR (Patents, Copyrights, Trademarks), Cyber Law Framework & IT Act, Cyber Crimes & Digital Evidence, Data Protection & Privacy Laws |
| 6 | **Medicinal Chemistry 2** | `MC-II` | **5 Units** | Antihistaminic & Antineoplastic, Cardiovascular Agents & Diuretics, Anti-hypertensive & Anti-arrhythmics, Endocrine Drugs & Hormones, Antidiabetic & Local Anesthetics |
| 7 | **Industrial Pharmacy 1** | `IP-I` | **5 Units** | Preformulation Studies, Tablets Formulation & Coating Defects, Capsules & Pellets, Parenteral & Ophthalmic Preparations, Cosmetics & Packaging Materials |
| 8 | **Pharmacology 2** | `P-COL-II` | **5 Units** | Drugs Acting on CVS, Anti-arrhythmic & Diuretics, Autocoids & NSAIDs, Endocrine Pharmacology, Bioassays & Molecular Pharmacology |
| 9 | **Pharmacognosy 2** | `P-COG-II` | **5 Units** | Metabolic Pathways in Plants (Shikimic & Mevalonic), Isolation of Phytoconstituents, Industrial Production of Herbal Drugs, Modern Extraction Techniques, Chromatography & Spectroscopy |
| 10 | **Pharmaceutical Jurisprudence** | `PJ` | **5 Units** | Drugs & Cosmetics Act 1940 & Rules 1945, Manufacture & Schedules under D&C Act, Pharmacy Act & NDPS Act 1985, Drugs & Magic Remedies & DPCO, Code of Ethics & Patent Laws |

> **Total Units across all subjects**: **49 Units**

---

## ⚡ How to Run on `localhost`

### 1-Click Launch (Recommended for Windows)
Double-click [`start.bat`](start.bat). It starts the backend server on port 3000 and automatically opens `http://localhost:3000` in your browser.

### Via Command Line
```powershell
node server.js
```
Then navigate to: **[http://localhost:3000](http://localhost:3000)**

---

## 💾 Database & REST API Features

- **Instant Persistence**: Any checked unit, revision counter increment, or custom note is saved directly into `database.json`.
- **Zero-Dependency Architecture**: No `npm install` needed; runs on native Node.js.
- **REST Endpoints**:
  - `GET /api/subjects`: Fetches all 10 subjects and their units.
  - `PATCH /api/units/:unitId`: Updates completion status.
  - `POST /api/units/:unitId/revise`: Increments revision count.
  - `PUT /api/units/:unitId/notes`: Saves study notes.
  - `PUT /api/units/:unitId/title`: Edits custom unit syllabus topics.
  - `POST /api/subjects/:id/mark-all`: Marks all units in a subject complete or resets.
  - `POST /api/reset`: Resets all units.
  - `GET /api/export` & `POST /api/import`: Full database backup & restore.
