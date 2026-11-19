/**
 * StudySync Tracker - Frontend Client
 * Zero-delay instant load with persistent cloud sync
 * PIN Protected (Passcode: 4501)
 * Theme Modes: Light / Dark / Default
 */

const API_BASE = window.location.origin.startsWith('http') ? window.location.origin : 'http://localhost:3000';
const THEME_MODE_KEY = 'studysync_theme_mode';
const AUTH_STORAGE_KEY = 'studysync_auth_unlocked';
const PASSCODE = '4501';

// Seed syllabus fallback data for instant 0ms mobile & offline load
const DEFAULT_SYLLABUS = [
  {
    "id": "os",
    "name": "Operating System",
    "code": "OS",
    "color": "emerald",
    "totalUnits": 5,
    "units": [
      {
        "id": "os_u1",
        "subjectId": "os",
        "num": 1,
        "title": "Introduction to Operating Systems, Dual-Mode Operation & System Calls",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T15:30:00.000Z"
      },
      {
        "id": "os_u2",
        "subjectId": "os",
        "num": 2,
        "title": "Process Management, Threads, CPU Scheduling Algorithms & Multithreading",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T15:30:00.000Z"
      },
      {
        "id": "os_u3",
        "subjectId": "os",
        "num": 3,
        "title": "Process Synchronization, Critical Section Problem, Semaphores & Deadlocks",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T15:30:00.000Z"
      },
      {
        "id": "os_u4",
        "subjectId": "os",
        "num": 4,
        "title": "Memory Management, Paging, Segmentation, Page Replacement & Virtual Memory",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T15:30:00.000Z"
      },
      {
        "id": "os_u5",
        "subjectId": "os",
        "num": 5,
        "title": "Storage Management, File System Interface, Directory Structures & I/O Systems",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T15:30:00.000Z"
      }
    ]
  },
  {
    "id": "aiml",
    "name": "Artificial Intelligence & Machine Learning",
    "code": "AI & ML",
    "color": "indigo",
    "totalUnits": 5,
    "units": [
      {
        "id": "aiml_u1",
        "subjectId": "aiml",
        "num": 1,
        "title": "Intro to AI, Problem Formulation, State Spaces & Heuristic Search Algorithms",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T15:30:00.000Z"
      },
      {
        "id": "aiml_u2",
        "subjectId": "aiml",
        "num": 2,
        "title": "Knowledge Representation, Propositional Logic & First-Order Predicate Logic",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T15:30:00.000Z"
      },
      {
        "id": "aiml_u3",
        "subjectId": "aiml",
        "num": 3,
        "title": "Supervised Learning, Linear Regression, Logistic Regression & Decision Trees",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T15:30:00.000Z"
      },
      {
        "id": "aiml_u4",
        "subjectId": "aiml",
        "num": 4,
        "title": "Unsupervised Learning, K-Means Clustering, PCA & Intro to Neural Networks",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T15:30:00.000Z"
      },
      {
        "id": "aiml_u5",
        "subjectId": "aiml",
        "num": 5,
        "title": "Reinforcement Learning, Markov Decision Processes, AI Ethics & Applications",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T15:30:00.000Z"
      }
    ]
  },
  {
    "id": "toc",
    "name": "Theory of Computation",
    "code": "TOC",
    "color": "amber",
    "totalUnits": 5,
    "units": [
      {
        "id": "toc_u1",
        "subjectId": "toc",
        "num": 1,
        "title": "Finite Automata (DFA, NFA), Conversions & Regular Expressions",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T15:30:00.000Z"
      },
      {
        "id": "toc_u2",
        "subjectId": "toc",
        "num": 2,
        "title": "Regular Grammars, Pumping Lemma for Regular Languages & DFA Minimization",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T15:30:00.000Z"
      },
      {
        "id": "toc_u3",
        "subjectId": "toc",
        "num": 3,
        "title": "Context-Free Grammars (CFG), Ambiguity, CNF/GNF & Pushdown Automata (PDA)",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T15:30:00.000Z"
      },
      {
        "id": "toc_u4",
        "subjectId": "toc",
        "num": 4,
        "title": "Turing Machines (TM), Design Techniques, Multi-Tape TM & Church-Turing Thesis",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T15:30:00.000Z"
      },
      {
        "id": "toc_u5",
        "subjectId": "toc",
        "num": 5,
        "title": "Decidability, Halting Problem, Undecidable Problems & Complexity Classes (P, NP)",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T15:30:00.000Z"
      }
    ]
  },
  {
    "id": "cc",
    "name": "Cloud Computing",
    "code": "CC",
    "color": "sky",
    "totalUnits": 5,
    "units": [
      {
        "id": "cc_u1",
        "subjectId": "cc",
        "num": 1,
        "title": "Cloud Computing Architecture, Characteristics & Service Models (IaaS, PaaS, SaaS)",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T15:30:00.000Z"
      },
      {
        "id": "cc_u2",
        "subjectId": "cc",
        "num": 2,
        "title": "Virtualization Technologies, Type 1 & Type 2 Hypervisors & Resource Provisioning",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T15:30:00.000Z"
      },
      {
        "id": "cc_u3",
        "subjectId": "cc",
        "num": 3,
        "title": "Cloud Storage Architectures, Distributed File Systems, Cloud Security & IAM",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T15:30:00.000Z"
      },
      {
        "id": "cc_u4",
        "subjectId": "cc",
        "num": 4,
        "title": "Cloud Native Technologies, Docker Containers, Microservices & Kubernetes Orchestration",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T15:30:00.000Z"
      },
      {
        "id": "cc_u5",
        "subjectId": "cc",
        "num": 5,
        "title": "Cloud Monitoring, SLA, Cost Optimization, Disaster Recovery & Serverless",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T15:30:00.000Z"
      }
    ]
  },
  {
    "id": "ipr",
    "name": "IPR and Cyber Laws",
    "code": "IPR",
    "color": "rose",
    "totalUnits": 4,
    "units": [
      {
        "id": "ipr_u1",
        "subjectId": "ipr",
        "num": 1,
        "title": "Intellectual Property Rights: Patents, Copyrights, Trademarks, Designs & Trade Secrets",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T15:30:00.000Z"
      },
      {
        "id": "ipr_u2",
        "subjectId": "ipr",
        "num": 2,
        "title": "Cyber Laws Framework, Information Technology (IT) Act 2000 & Electronic Governance",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T15:30:00.000Z"
      },
      {
        "id": "ipr_u3",
        "subjectId": "ipr",
        "num": 3,
        "title": "Cyber Crimes, Hacking, Identity Theft, Phishing, Tampering & Digital Evidence",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T15:30:00.000Z"
      },
      {
        "id": "ipr_u4",
        "subjectId": "ipr",
        "num": 4,
        "title": "Data Protection, Privacy Regulations, E-Commerce Contracts, Jurisdiction & Liability",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T15:30:00.000Z"
      }
    ]
  },
  {
    "id": "medchem",
    "name": "Medicinal Chemistry 2",
    "code": "MC-II",
    "color": "teal",
    "totalUnits": 5,
    "units": [
      {
        "id": "medchem_u1",
        "subjectId": "medchem",
        "num": 1,
        "title": "Antihistaminic Agents (H1 & H2 Antagonists, Gastric PPIs) & Anti-neoplastic Agents",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T16:01:00.000Z"
      },
      {
        "id": "medchem_u2",
        "subjectId": "medchem",
        "num": 2,
        "title": "Cardiovascular Agents: Anti-anginal, Vasodilators & Diuretics (Carbonic anhydrase, Loop, Thiazides)",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T16:01:00.000Z"
      },
      {
        "id": "medchem_u3",
        "subjectId": "medchem",
        "num": 3,
        "title": "Anti-hypertensive Drugs, Anti-arrhythmic Agents & Anti-hyperlipidemic Drugs",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T16:01:00.000Z"
      },
      {
        "id": "medchem_u4",
        "subjectId": "medchem",
        "num": 4,
        "title": "Drugs Acting on Endocrine System: Sex Hormones, Thyroid & Anti-thyroid Drugs, Oral Contraceptives",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T16:01:00.000Z"
      },
      {
        "id": "medchem_u5",
        "subjectId": "medchem",
        "num": 5,
        "title": "Antidiabetic Agents (Insulin, Sulfonylureas, Biguanides) & Local Anesthetics (SAR of Benzoic acid derivatives)",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T16:01:00.000Z"
      }
    ]
  },
  {
    "id": "indpharm",
    "name": "Industrial Pharmacy 1",
    "code": "IP-I",
    "color": "blue",
    "totalUnits": 5,
    "units": [
      {
        "id": "indpharm_u1",
        "subjectId": "indpharm",
        "num": 1,
        "title": "Preformulation Studies: Physical & Chemical Properties of Drug Substances, BCS Classification",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T16:01:00.000Z"
      },
      {
        "id": "indpharm_u2",
        "subjectId": "indpharm",
        "num": 2,
        "title": "Tablets: Formulation, Granulation Techniques, Compression Tooling, Tablet Coating & Manufacturing Defects",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T16:01:00.000Z"
      },
      {
        "id": "indpharm_u3",
        "subjectId": "indpharm",
        "num": 3,
        "title": "Capsules: Hard Gelatin & Soft Gelatin Capsule Technology, Production Quality Controls & Pellets",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T16:01:00.000Z"
      },
      {
        "id": "indpharm_u4",
        "subjectId": "indpharm",
        "num": 4,
        "title": "Parenteral Products (Small & Large Volume Parenterals, Pyrogen Testing) & Ophthalmic Preparations",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T16:01:00.000Z"
      },
      {
        "id": "indpharm_u5",
        "subjectId": "indpharm",
        "num": 5,
        "title": "Cosmetics Formulation (Lipsticks, Shampoos, Creams), Pharmaceutical Aerosols & Packaging Materials",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T16:01:00.000Z"
      }
    ]
  },
  {
    "id": "pharmcol",
    "name": "Pharmacology 2",
    "code": "P-COL-II",
    "color": "fuchsia",
    "totalUnits": 5,
    "units": [
      {
        "id": "pharmcol_u1",
        "subjectId": "pharmcol",
        "num": 1,
        "title": "Pharmacology of Drugs Acting on CVS: Congestive Heart Failure, Anti-hypertensives & Anti-anginal Drugs",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T16:01:00.000Z"
      },
      {
        "id": "pharmcol_u2",
        "subjectId": "pharmcol",
        "num": 2,
        "title": "Anti-arrhythmic Drugs, Anti-hyperlipidemic Agents, Coagulants/Anticoagulants & Diuretics",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T16:01:00.000Z"
      },
      {
        "id": "pharmcol_u3",
        "subjectId": "pharmcol",
        "num": 3,
        "title": "Autocoids: Histamine, 5-HT, Prostaglandins, Leukotrienes, NSAIDs & Anti-gout Medications",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T16:01:00.000Z"
      },
      {
        "id": "pharmcol_u4",
        "subjectId": "pharmcol",
        "num": 4,
        "title": "Pharmacology of Endocrine System: Anterior Pituitary Hormones, Thyroid/Anti-thyroid, Diabetes & Steroids",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T16:01:00.000Z"
      },
      {
        "id": "pharmcol_u5",
        "subjectId": "pharmcol",
        "num": 5,
        "title": "Bioassay Principles, Types & Applications (Insulin, Digitalis, Histamine) & Molecular Pharmacology",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T16:01:00.000Z"
      }
    ]
  },
  {
    "id": "pharmacog",
    "name": "Pharmacognosy 2",
    "code": "P-COG-II",
    "color": "lime",
    "totalUnits": 5,
    "units": [
      {
        "id": "pharmacog_u1",
        "subjectId": "pharmacog",
        "num": 1,
        "title": "Metabolic Pathways in Higher Plants (Shikimic Acid & Mevalonic Acid Pathways) & Tracer Techniques",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T16:01:00.000Z"
      },
      {
        "id": "pharmacog_u2",
        "subjectId": "pharmacog",
        "num": 2,
        "title": "Isolation, Identification & Analysis of Phytoconstituents (Alkaloids, Glycosides, Terpenoids & Resins)",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T16:01:00.000Z"
      },
      {
        "id": "pharmacog_u3",
        "subjectId": "pharmacog",
        "num": 3,
        "title": "Industrial Production, Estimation & Utilization of Phytoconstituents (Forskolin, Sennosides, Artemisinin)",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T16:01:00.000Z"
      },
      {
        "id": "pharmacog_u4",
        "subjectId": "pharmacog",
        "num": 4,
        "title": "Modern Extraction Techniques: Microwave, Ultrasonic, Supercritical Fluid & Phytochemical Screening",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T16:01:00.000Z"
      },
      {
        "id": "pharmacog_u5",
        "subjectId": "pharmacog",
        "num": 5,
        "title": "Chromatography (TLC, Column, HPLC) & Spectroscopy (UV, IR, NMR) in Herbal Drug Analysis",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T16:01:00.000Z"
      }
    ]
  },
  {
    "id": "juris",
    "name": "Pharmaceutical Jurisprudence",
    "code": "PJ",
    "color": "violet",
    "totalUnits": 5,
    "units": [
      {
        "id": "juris_u1",
        "subjectId": "juris",
        "num": 1,
        "title": "Drugs & Cosmetics Act 1940 & Rules 1945: Objectives, Definitions, Legal Authorities & Advisory Boards (DTAB, DCC)",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T16:01:00.000Z"
      },
      {
        "id": "juris_u2",
        "subjectId": "juris",
        "num": 2,
        "title": "Manufacture, Sale, Labeling & Packaging of Drugs, Government Analysts, Drug Inspectors & Schedules under D&C Act",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T16:01:00.000Z"
      },
      {
        "id": "juris_u3",
        "subjectId": "juris",
        "num": 3,
        "title": "Pharmacy Act 1948, Medicinal & Toilet Preparations Act 1955, Narcotic Drugs & Psychotropic Substances (NDPS) Act 1985",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T16:01:00.000Z"
      },
      {
        "id": "juris_u4",
        "subjectId": "juris",
        "num": 4,
        "title": "Drugs & Magic Remedies Act 1954, Prevention of Cruelty to Animals Act 1960 & National Drug Price Control Order (DPCO)",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T16:01:00.000Z"
      },
      {
        "id": "juris_u5",
        "subjectId": "juris",
        "num": 5,
        "title": "Code of Pharmaceutical Ethics, Medical Termination of Pregnancy Act, Right to Information Act & Intellectual Property Rights",
        "status": "not_started",
        "completed": false,
        "notes": "",
        "revisions": 0,
        "updatedAt": "2026-11-14T16:01:00.000Z"
      }
    ]
  }
];

// Subject SVG icons map
const SUBJECT_ICONS = {
  os: `<svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`,
  aiml: `<svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
  toc: `<svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>`,
  cc: `<svg class="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z"/></svg>`,
  ipr: `<svg class="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
  medchem: `<svg class="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>`,
  indpharm: `<svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>`,
  pharmcol: `<svg class="w-5 h-5 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>`,
  pharmacog: `<svg class="w-5 h-5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>`,
  juris: `<svg class="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>`
};

// Client State
let state = {
  subjects: [],
  stats: null,
  activeFilter: 'all',
  searchQuery: '',
  collapsedMap: {},
  activeNotesUnit: null,
  activeEditUnit: null,
  isServerConnected: false
};

let currentPin = '';

// API Helpers
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error ${response.status}: ${errorText}`);
  }
  return await response.json();
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

async function initApp() {
  setupTheme();
  setupAuthentication();
  bindGlobalEvents();
  loadInitialData();
  await loadDataFromBackend();
}

// --- PASSCODE AUTHENTICATION (PIN: 4501) ---
function setupAuthentication() {
  // Always clear any permanent unlock key from localStorage so reopening the link ALWAYS requires entering passcode
  localStorage.removeItem(AUTH_STORAGE_KEY);
  sessionStorage.removeItem(AUTH_STORAGE_KEY);

  // Always start in locked state when link/page is opened
  lockApp();

  // Keypad button clicks
  document.querySelectorAll('.num-key').forEach(btn => {
    btn.addEventListener('click', () => {
      const digit = btn.getAttribute('data-digit');
      if (digit !== null) {
        handlePinDigit(digit);
      }
    });
  });

  // Clear & Backspace
  document.getElementById('pinClearBtn')?.addEventListener('click', resetPinInput);
  document.getElementById('pinBackspaceBtn')?.addEventListener('click', handlePinBackspace);

  // Lock App Button
  document.getElementById('lockAppBtn')?.addEventListener('click', () => {
    lockApp();
  });

  // Global physical & software keyboard input
  window.addEventListener('keydown', (e) => {
    const overlay = document.getElementById('authLockOverlay');
    if (!overlay || overlay.classList.contains('auth-hidden')) return;

    if (e.key >= '0' && e.key <= '9') {
      handlePinDigit(e.key);
    } else if (e.key === 'Backspace') {
      handlePinBackspace();
    } else if (e.key === 'Escape') {
      resetPinInput();
    }
  });

  // Automatically clear unlock key when closing or navigating away from the link
  window.addEventListener('beforeunload', () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  });
  window.addEventListener('pagehide', () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  });
}

function handlePinDigit(digit) {
  if (currentPin.length >= 4) return;
  currentPin += digit;
  updatePinDots();

  if (currentPin.length === 4) {
    verifyPin();
  }
}

function handlePinBackspace() {
  if (currentPin.length === 0) return;
  currentPin = currentPin.slice(0, -1);
  updatePinDots();
  hidePinError();
}

function resetPinInput() {
  currentPin = '';
  updatePinDots();
  hidePinError();
}

function updatePinDots() {
  for (let i = 0; i < 4; i++) {
    const dot = document.getElementById(`pinDot${i}`);
    if (dot) {
      if (i < currentPin.length) {
        dot.classList.add('filled');
      } else {
        dot.classList.remove('filled', 'error', 'success');
      }
    }
  }
}

function showPinError() {
  const errorMsg = document.getElementById('authErrorMsg');
  const container = document.getElementById('pinDotsContainer');
  if (errorMsg) {
    errorMsg.classList.remove('opacity-0');
  }
  if (container) {
    container.classList.add('pin-shake');
  }
  for (let i = 0; i < 4; i++) {
    const dot = document.getElementById(`pinDot${i}`);
    dot?.classList.add('error');
  }
  if (navigator.vibrate) {
    try { navigator.vibrate([60, 40, 60]); } catch (e) {}
  }

  setTimeout(() => {
    if (container) container.classList.remove('pin-shake');
    resetPinInput();
  }, 500);
}

function hidePinError() {
  const errorMsg = document.getElementById('authErrorMsg');
  if (errorMsg) {
    errorMsg.classList.add('opacity-0');
  }
  for (let i = 0; i < 4; i++) {
    const dot = document.getElementById(`pinDot${i}`);
    dot?.classList.remove('error');
  }
}

function verifyPin() {
  if (currentPin === PASSCODE) {
    // PIN correct!
    for (let i = 0; i < 4; i++) {
      const dot = document.getElementById(`pinDot${i}`);
      dot?.classList.remove('error');
      dot?.classList.add('success');
    }
    const lockIcon = document.getElementById('authIconLock');
    const successIcon = document.getElementById('authIconSuccess');
    if (lockIcon && successIcon) {
      lockIcon.classList.add('hidden');
      successIcon.classList.remove('hidden');
    }

    if (navigator.vibrate) {
      try { navigator.vibrate([30, 40, 30]); } catch (e) {}
    }

    // Do NOT store in localStorage so that closing the link and reopening ALWAYS requires entering the passcode
    sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');

    setTimeout(() => {
      unlockApp(true);
    }, 300);
  } else {
    showPinError();
  }
}

function unlockApp(animate = true) {
  const overlay = document.getElementById('authLockOverlay');
  const container = document.getElementById('appContainer');

  if (animate) {
    overlay?.classList.add('auth-hidden');
    container?.classList.remove('app-locked');
  } else {
    overlay?.classList.add('auth-hidden');
    container?.classList.remove('app-locked');
  }
}

function lockApp() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  sessionStorage.removeItem(AUTH_STORAGE_KEY);

  const overlay = document.getElementById('authLockOverlay');
  const container = document.getElementById('appContainer');
  const lockIcon = document.getElementById('authIconLock');
  const successIcon = document.getElementById('authIconSuccess');

  if (lockIcon && successIcon) {
    lockIcon.classList.remove('hidden');
    successIcon.classList.add('hidden');
  }

  resetPinInput();
  overlay?.classList.remove('auth-hidden');
  container?.classList.add('app-locked');
}

// --- THEME MODES: LIGHT / DARK / DEFAULT ---
function setupTheme() {
  const savedMode = localStorage.getItem(THEME_MODE_KEY) || 'default';
  applyTheme(savedMode, false);

  // Listen to OS theme change when in 'default' mode
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', () => {
    const currentMode = localStorage.getItem(THEME_MODE_KEY) || 'default';
    if (currentMode === 'default') {
      applyTheme('default', false);
    }
  });

  // Dropdown toggle
  const menuBtn = document.getElementById('themeMenuBtn');
  const dropdown = document.getElementById('themeDropdownMenu');

  menuBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown?.classList.toggle('hidden');
  });

  // Options click
  dropdown?.querySelectorAll('button[data-theme-val]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const selected = btn.getAttribute('data-theme-val');
      applyTheme(selected, true);
      dropdown.classList.add('hidden');
    });
  });

  // Click outside closes dropdown
  document.addEventListener('click', (e) => {
    if (!dropdown?.contains(e.target) && e.target !== menuBtn) {
      dropdown?.classList.add('hidden');
    }
  });
}

function applyTheme(mode, persist = true) {
  if (persist) {
    localStorage.setItem(THEME_MODE_KEY, mode);
  }

  const html = document.documentElement;
  let effectiveTheme = mode;

  if (mode === 'default') {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    effectiveTheme = systemDark ? 'dark' : 'light';
  }

  if (effectiveTheme === 'light') {
    html.classList.remove('dark');
    html.classList.add('light');
  } else {
    html.classList.remove('light');
    html.classList.add('dark');
  }

  // Update theme button label & icon
  const labelEl = document.getElementById('themeCurrentLabel');
  const iconContainer = document.getElementById('themeCurrentIcon');

  const icons = {
    light: `<svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`,
    dark: `<svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`,
    default: `<svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`
  };

  const labelTexts = {
    light: 'Light',
    dark: 'Dark',
    default: 'Default'
  };

  if (labelEl) labelEl.textContent = labelTexts[mode] || 'Theme';
  if (iconContainer) iconContainer.innerHTML = icons[mode] || icons.default;

  // Update checkmarks in dropdown
  ['light', 'dark', 'default'].forEach(val => {
    const checkEl = document.querySelector(`.theme-check-${val}`);
    if (checkEl) {
      if (val === mode) {
        checkEl.classList.remove('hidden');
      } else {
        checkEl.classList.add('hidden');
      }
    }
  });
}

// --- DATA INITIALIZATION & HYDRATION ---
function loadInitialData() {
  // Load from local cache immediately (0ms delay) so mobile / cold-start is instant!
  const cachedProgress = localStorage.getItem('studysync_cloud_persistent_progress');
  if (cachedProgress) {
    try {
      const parsed = JSON.parse(cachedProgress);
      if (parsed && Array.isArray(parsed.subjects) && parsed.subjects.length > 0) {
        state.subjects = parsed.subjects;
        if (parsed.meta) state.stats = parsed.meta;
        render();
        return;
      }
    } catch (e) {}
  }

  const offlineCache = localStorage.getItem('studysync_offline_cache');
  if (offlineCache) {
    try {
      const parsed = JSON.parse(offlineCache);
      if (Array.isArray(parsed) && parsed.length > 0) {
        state.subjects = parsed;
        render();
        return;
      }
    } catch (e) {}
  }

  // Fallback to embedded default seed data
  state.subjects = JSON.parse(JSON.stringify(DEFAULT_SYLLABUS));
  render();
}

// Load Data from Backend REST API
async function loadDataFromBackend() {
  const serverBadge = document.getElementById('serverStatusBadge');
  const serverText = document.getElementById('serverStatusText');

  try {
    const [subjectsRes, statsRes] = await Promise.all([
      fetchAPI('/api/subjects'),
      fetchAPI('/api/stats')
    ]);

    let loadedSubjects = subjectsRes.data || [];
    let loadedStats = statsRes.data || null;

    // Auto-rehydrate cloud instance if container restarted empty
    const localBackupRaw = localStorage.getItem('studysync_cloud_persistent_progress');
    if (localBackupRaw) {
      try {
        const localBackup = JSON.parse(localBackupRaw);
        const serverHasProgress = loadedSubjects.some(s => s.units.some(u => u.completed || u.revisions > 0 || (u.notes && u.notes.trim())));
        const localHasProgress = localBackup.subjects && localBackup.subjects.some(s => s.units.some(u => u.completed || u.revisions > 0 || (u.notes && u.notes.trim())));

        if (!serverHasProgress && localHasProgress) {
          console.log("Restoring saved progress to cloud instance...");
          await fetchAPI('/api/import', {
            method: 'POST',
            body: JSON.stringify(localBackup)
          });
          const refreshed = await fetchAPI('/api/subjects');
          loadedSubjects = refreshed.data || loadedSubjects;
        }
      } catch (backupErr) {
        console.warn("Could not check local rehydration backup:", backupErr);
      }
    }

    state.subjects = loadedSubjects.length > 0 ? loadedSubjects : state.subjects;
    state.stats = loadedStats || state.stats;
    state.isServerConnected = true;

    if (serverBadge && serverText) {
      serverBadge.className = 'text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium flex items-center gap-1.5';
      serverText.textContent = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'Connected (localhost)' 
        : 'Live Cloud Sync • Connected';
    }

    render();
  } catch (err) {
    console.warn("Backend not reached immediately, working with local cache:", err);
    state.isServerConnected = false;

    if (serverBadge && serverText) {
      serverBadge.className = 'text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium flex items-center gap-1.5';
      serverText.textContent = 'Offline (Saved Locally)';
    }

    // Schedule background retry (for Render wake-up)
    setTimeout(() => {
      loadDataFromBackend();
    }, 8000);
  }
}

// Bind Global UI Listeners
function bindGlobalEvents() {
  document.getElementById('refreshBtn')?.addEventListener('click', async () => {
    const serverText = document.getElementById('serverStatusText');
    if (serverText) serverText.textContent = 'Syncing...';
    await loadDataFromBackend();
  });

  document.getElementById('searchInput')?.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.trim().toLowerCase();
    renderSubjects();
  });

  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active-filter', 'bg-indigo-600', 'text-white');
        b.classList.add('text-slate-400');
      });
      btn.classList.add('active-filter', 'bg-indigo-600', 'text-white');
      btn.classList.remove('text-slate-400');
      state.activeFilter = btn.dataset.filter;
      renderSubjects();
    });
  });

  document.getElementById('toggleAllAccordionBtn')?.addEventListener('click', toggleAllAccordions);
  document.getElementById('exportBtn')?.addEventListener('click', exportDatabase);
  document.getElementById('importFileInput')?.addEventListener('change', importDatabase);

  document.getElementById('resetAllBtn')?.addEventListener('click', () => openModal('resetConfirmModal'));
  document.getElementById('cancelResetBtn')?.addEventListener('click', () => closeModal('resetConfirmModal'));
  document.getElementById('confirmResetBtn')?.addEventListener('click', resetAllProgress);

  document.getElementById('closeNotesModalBtn')?.addEventListener('click', () => closeModal('notesModal'));
  document.getElementById('saveNotesBtn')?.addEventListener('click', saveActiveNote);

  document.getElementById('closeEditTitleModalBtn')?.addEventListener('click', () => closeModal('editTitleModal'));
  document.getElementById('cancelEditTitleBtn')?.addEventListener('click', () => closeModal('editTitleModal'));
  document.getElementById('saveEditTitleBtn')?.addEventListener('click', saveActiveUnitTitle);

  ['notesModal', 'editTitleModal', 'resetConfirmModal'].forEach(id => {
    const modal = document.getElementById(id);
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(id);
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      ['notesModal', 'editTitleModal', 'resetConfirmModal'].forEach(id => closeModal(id));
    }
  });
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('hidden');
  setTimeout(() => modal.classList.add('modal-open'), 10);
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('modal-open');
  setTimeout(() => modal.classList.add('hidden'), 200);
}

// Render UI & Metrics
function render() {
  updateMetrics();
  renderSubjects();
  try {
    const snapshot = {
      version: "1.0.0",
      timestamp: new Date().toISOString(),
      subjects: state.subjects,
      meta: {
        streak: state.stats ? state.stats.streak : null,
        lastUpdated: new Date().toISOString()
      }
    };
    localStorage.setItem('studysync_cloud_persistent_progress', JSON.stringify(snapshot));
    localStorage.setItem('studysync_offline_cache', JSON.stringify(state.subjects));
  } catch (e) {}
}

function updateMetrics() {
  let totalUnits = 0;
  let completedUnits = 0;
  let inProgressUnits = 0;
  let subjectsCompleted = 0;
  let subjectsInProgress = 0;
  let totalRevisions = 0;

  state.subjects.forEach(subject => {
    let subCompleted = 0;
    subject.units.forEach(unit => {
      totalUnits++;
      if (unit.completed || unit.status === 'completed') {
        completedUnits++;
        subCompleted++;
      } else if (unit.status === 'in_progress') {
        inProgressUnits++;
      }
      totalRevisions += (unit.revisions || 0);
    });

    if (subCompleted === subject.units.length && subject.units.length > 0) {
      subjectsCompleted++;
    } else if (subCompleted > 0 || subject.units.some(u => u.status === 'in_progress')) {
      subjectsInProgress++;
    }
  });

  const percentage = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;
  const remaining = totalUnits - completedUnits;

  const overallPercentage = document.getElementById('overallPercentage');
  if (overallPercentage) overallPercentage.textContent = `${percentage}%`;

  const overallUnitRatio = document.getElementById('overallUnitRatio');
  if (overallUnitRatio) overallUnitRatio.textContent = `${completedUnits} of ${totalUnits} units completed`;

  const circle = document.getElementById('overallCircleProgress');
  const circleText = document.getElementById('overallCircleText');
  if (circle) {
    const circumference = 2 * Math.PI * 32;
    const offset = circumference - (percentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }
  if (circleText) {
    circleText.textContent = `${percentage}%`;
  }

  const overallProgressBar = document.getElementById('overallProgressBar');
  if (overallProgressBar) {
    overallProgressBar.style.width = `${percentage}%`;
  }

  const motivationalMessage = document.getElementById('motivationalMessage');
  if (motivationalMessage) {
    if (percentage === 100) {
      motivationalMessage.innerHTML = `🎉 Mastered! All ${totalUnits} units completed! 100% Exam Ready!`;
    } else if (percentage >= 75) {
      motivationalMessage.innerHTML = '🔥 Final stretch! Over 75% of your syllabus is covered!';
    } else if (percentage >= 50) {
      motivationalMessage.innerHTML = '⚡ Halfway mark achieved! Keep the momentum high!';
    } else if (percentage >= 25) {
      motivationalMessage.innerHTML = '📈 Solid start! 1/4th of your curriculum mastered!';
    } else if (percentage > 0) {
      motivationalMessage.innerHTML = '🚀 Progress logged! Keep going step by step.';
    } else {
      motivationalMessage.innerHTML = 'Ready to begin your study journey! 🚀';
    }
  }

  const headerBadge = document.getElementById('subjectsHeaderBadge');
  if (headerBadge) {
    headerBadge.textContent = `${state.subjects.length} Subjects • ${totalUnits} Units`;
  }
  const allFilterBtn = document.querySelector('button[data-filter="all"]');
  if (allFilterBtn) {
    allFilterBtn.textContent = `All (${totalUnits})`;
  }

  const unitsRemainingText = document.getElementById('unitsRemainingText');
  if (unitsRemainingText) {
    unitsRemainingText.textContent = remaining === 0 ? 'All units finished!' : `${remaining} units remaining`;
  }

  const subjectsCompletedCount = document.getElementById('subjectsCompletedCount');
  if (subjectsCompletedCount) {
    subjectsCompletedCount.textContent = `${subjectsCompleted} / ${state.subjects.length}`;
  }

  const subjectsCompletedSubtext = document.getElementById('subjectsCompletedSubtext');
  if (subjectsCompletedSubtext) {
    if (subjectsCompleted === state.subjects.length && state.subjects.length > 0) {
      subjectsCompletedSubtext.textContent = `All ${state.subjects.length} subjects mastered! 🏆`;
    } else if (subjectsCompleted > 0) {
      subjectsCompletedSubtext.textContent = `${subjectsCompleted} of ${state.subjects.length} subjects at 100% completion`;
    } else {
      subjectsCompletedSubtext.textContent = 'No subjects finished yet';
    }
  }

  const subjectsInProgressCount = document.getElementById('subjectsInProgressCount');
  if (subjectsInProgressCount) {
    subjectsInProgressCount.textContent = `${subjectsInProgress} active`;
  }

  const totalRevisionsCount = document.getElementById('totalRevisionsCount');
  if (totalRevisionsCount) {
    totalRevisionsCount.textContent = totalRevisions;
  }

  const streakDays = document.getElementById('studyStreakDays');
  if (streakDays && state.stats && state.stats.streak) {
    streakDays.textContent = `${state.stats.streak.count || 1} day${state.stats.streak.count === 1 ? '' : 's'}`;
  }

  if (percentage === 100 && !state.hasTriggeredFullCelebration) {
    triggerCelebration(true);
    state.hasTriggeredFullCelebration = true;
  } else if (percentage < 100) {
    state.hasTriggeredFullCelebration = false;
  }
}

function renderSubjects() {
  const container = document.getElementById('subjectsContainer');
  if (!container) return;

  container.innerHTML = '';

  const { activeFilter, searchQuery } = state;

  state.subjects.forEach(subject => {
    const isCollapsed = !!state.collapsedMap[subject.id];
    const totalUnits = subject.units.length;
    const completedUnits = subject.units.filter(u => u.completed || u.status === 'completed').length;
    const subjectPercent = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;
    const isSubjectDone = completedUnits === totalUnits;

    const visibleUnits = subject.units.filter(unit => {
      if (activeFilter === 'completed' && !(unit.completed || unit.status === 'completed')) return false;
      if (activeFilter === 'in_progress' && unit.status !== 'in_progress') return false;
      if (activeFilter === 'not_started' && (unit.completed || unit.status !== 'not_started')) return false;

      if (searchQuery) {
        const matchesSubject = subject.name.toLowerCase().includes(searchQuery) || subject.code.toLowerCase().includes(searchQuery);
        const matchesUnit = unit.title.toLowerCase().includes(searchQuery) || `unit ${unit.num}`.includes(searchQuery);
        if (!matchesSubject && !matchesUnit) return false;
      }
      return true;
    });

    if (searchQuery && visibleUnits.length === 0 && !subject.name.toLowerCase().includes(searchQuery)) {
      return;
    }

    const card = document.createElement('div');
    card.className = `rounded-3xl bg-slate-900/80 border ${isSubjectDone ? 'border-emerald-500/30' : 'border-slate-800/80'} shadow-xl overflow-hidden backdrop-blur-xl transition duration-300`;

    const accentBorder = {
      emerald: 'from-emerald-500 to-teal-400',
      indigo: 'from-indigo-500 to-purple-500',
      amber: 'from-amber-500 to-yellow-400',
      sky: 'from-sky-500 to-cyan-400',
      rose: 'from-rose-500 to-pink-500',
      teal: 'from-teal-500 to-emerald-400',
      blue: 'from-blue-500 to-indigo-500',
      fuchsia: 'from-fuchsia-500 to-pink-500',
      lime: 'from-lime-500 to-emerald-500',
      violet: 'from-violet-500 to-purple-500'
    }[subject.color] || 'from-indigo-500 to-cyan-400';

    const accentText = {
      emerald: 'text-emerald-400',
      indigo: 'text-indigo-400',
      amber: 'text-amber-400',
      sky: 'text-sky-400',
      rose: 'text-rose-400',
      teal: 'text-teal-400',
      blue: 'text-blue-400',
      fuchsia: 'text-fuchsia-400',
      lime: 'text-lime-400',
      violet: 'text-violet-400'
    }[subject.color] || 'text-indigo-400';

    const iconSvg = SUBJECT_ICONS[subject.id] || SUBJECT_ICONS.os;

    card.innerHTML = `
      <div class="p-4 sm:p-6 border-b border-slate-800/60 bg-gradient-to-r from-slate-900/90 to-slate-900/40">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          
          <div class="flex items-center gap-3 sm:gap-3.5">
            <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center flex-shrink-0 shadow-inner">
              ${iconSvg}
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h2 class="text-base sm:text-xl font-bold text-white tracking-tight">${subject.name}</h2>
                <span class="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono font-medium border border-slate-700">
                  ${totalUnits} Units
                </span>
                ${isSubjectDone ? `
                  <span class="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1">
                    <span>✓</span> Done
                  </span>
                ` : ''}
              </div>
              <p class="text-xs text-slate-400 mt-0.5">
                ${completedUnits} of ${totalUnits} mastered • ${totalUnits - completedUnits} remaining
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-800/40">
            <div class="text-left sm:text-right">
              <span class="text-base sm:text-lg font-extrabold ${accentText}">${subjectPercent}%</span>
              <div class="w-24 sm:w-32 bg-slate-800 rounded-full h-2 overflow-hidden mt-1 p-0.5">
                <div class="h-full bg-gradient-to-r ${accentBorder} rounded-full transition-all duration-500 ease-out" style="width: ${subjectPercent}%"></div>
              </div>
            </div>

            <div class="flex items-center gap-1 pl-2 border-l border-slate-800">
              <button data-action="mark-subject-all" data-subject="${subject.id}" title="Mark all in ${subject.name} complete" class="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-xl transition">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              </button>
              <button data-action="reset-subject" data-subject="${subject.id}" title="Reset ${subject.name}" class="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              </button>
              <button data-action="toggle-accordion" data-subject="${subject.id}" title="Expand / Collapse" class="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition">
                <svg class="w-4 h-4 transform transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>

      <div id="accordion-${subject.id}" class="accordion-content ${isCollapsed ? 'collapsed' : ''}">
        <div class="p-3 sm:p-6 space-y-2.5 sm:space-y-3">
          ${visibleUnits.length === 0 ? `
            <div class="py-8 text-center text-sm text-slate-500">
              No units match the current filter or search query.
            </div>
          ` : ''}

          ${visibleUnits.map(unit => {
            const isDone = unit.completed || unit.status === 'completed';
            const statusClass = isDone ? 'status-completed' : unit.status === 'in_progress' ? 'status-in-progress' : 'status-not-started';
            const statusLabel = isDone ? 'Completed' : unit.status === 'in_progress' ? 'In Progress' : 'Not Started';
            const hasNotes = unit.notes && unit.notes.trim().length > 0;

            return `
              <div class="unit-card group flex flex-col md:flex-row md:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-950/60 border ${isDone ? 'border-emerald-500/20 bg-emerald-950/10' : 'border-slate-800/80 hover:border-slate-700/80'} transition-all duration-200">
                
                <div class="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                  <input 
                    type="checkbox" 
                    class="unit-checkbox mt-0.5 sm:mt-0" 
                    data-action="toggle-unit" 
                    data-subject="${subject.id}" 
                    data-unit="${unit.id}" 
                    ${isDone ? 'checked' : ''}
                    title="Mark complete / incomplete"
                  >

                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-slate-800 text-slate-300">
                        Unit ${unit.num}
                      </span>
                      <span class="status-pill text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusClass}">
                        ${statusLabel}
                      </span>
                      ${(unit.revisions || 0) > 0 ? `
                        <span class="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1">
                          🔄 ${unit.revisions} rev${unit.revisions > 1 ? 's' : ''}
                        </span>
                      ` : ''}
                      ${hasNotes ? `
                        <span class="text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center gap-1">
                          📝 Notes
                        </span>
                      ` : ''}
                    </div>

                    <div class="mt-1 flex items-center gap-2">
                      <h4 class="text-xs sm:text-sm font-medium ${isDone ? 'line-through text-slate-400' : 'text-slate-100'} truncate-2-lines transition">
                        ${unit.title}
                      </h4>
                      <button 
                        data-action="edit-title" 
                        data-subject="${subject.id}" 
                        data-unit="${unit.id}" 
                        title="Edit Unit Title" 
                        class="opacity-60 sm:opacity-0 group-hover:opacity-100 text-slate-500 hover:text-indigo-400 transition flex-shrink-0"
                      >
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-2 self-end md:self-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/40 w-full md:w-auto justify-between md:justify-end">
                  
                  <select 
                    data-action="change-status" 
                    data-subject="${subject.id}" 
                    data-unit="${unit.id}" 
                    class="text-xs px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer font-medium"
                  >
                    <option value="not_started" ${unit.status === 'not_started' && !unit.completed ? 'selected' : ''}>Not Started</option>
                    <option value="in_progress" ${unit.status === 'in_progress' ? 'selected' : ''}>In Progress</option>
                    <option value="completed" ${unit.status === 'completed' || unit.completed ? 'selected' : ''}>Completed</option>
                  </select>

                  <button 
                    data-action="increment-revision" 
                    data-subject="${subject.id}" 
                    data-unit="${unit.id}" 
                    title="Increment revision count" 
                    class="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/30 transition"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                    <span class="hidden sm:inline">Revise</span>
                    <span class="font-bold text-amber-400">+1</span>
                  </button>

                  <button 
                    data-action="open-notes" 
                    data-subject="${subject.id}" 
                    data-unit="${unit.id}" 
                    title="Study Notes for Unit ${unit.num}" 
                    class="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-xl ${hasNotes ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'} transition"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    <span class="hidden sm:inline">Notes</span>
                  </button>

                </div>

              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  bindSubjectCardEvents(container);
}

function bindSubjectCardEvents(container) {
  container.querySelectorAll('input[data-action="toggle-unit"]').forEach(chk => {
    chk.addEventListener('change', async (e) => {
      const subjectId = e.target.dataset.subject;
      const unitId = e.target.dataset.unit;
      const isChecked = e.target.checked;
      await updateUnitOnBackend(subjectId, unitId, { completed: isChecked });
    });
  });

  container.querySelectorAll('select[data-action="change-status"]').forEach(select => {
    select.addEventListener('change', async (e) => {
      const subjectId = e.target.dataset.subject;
      const unitId = e.target.dataset.unit;
      const newStatus = e.target.value;
      await updateUnitOnBackend(subjectId, unitId, { status: newStatus });
    });
  });

  container.querySelectorAll('button[data-action="increment-revision"]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const unitId = e.currentTarget.dataset.unit;
      const subjectId = e.currentTarget.dataset.subject;

      // Optimistic UI update
      const subject = state.subjects.find(s => s.id === subjectId);
      if (subject) {
        const unit = subject.units.find(u => u.id === unitId);
        if (unit) {
          unit.revisions = (unit.revisions || 0) + 1;
          render();
        }
      }

      try {
        await fetchAPI(`/api/units/${unitId}/revise`, { method: 'POST' });
        triggerMiniConfetti(e.clientX, e.clientY);
      } catch (err) {
        console.warn('Revise update saved locally (offline):', err);
      }
    });
  });

  container.querySelectorAll('button[data-action="open-notes"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const subjectId = e.currentTarget.dataset.subject;
      const unitId = e.currentTarget.dataset.unit;
      openNotesModal(subjectId, unitId);
    });
  });

  container.querySelectorAll('button[data-action="edit-title"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const subjectId = e.currentTarget.dataset.subject;
      const unitId = e.currentTarget.dataset.unit;
      openEditTitleModal(subjectId, unitId);
    });
  });

  container.querySelectorAll('button[data-action="toggle-accordion"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const subjectId = e.currentTarget.dataset.subject;
      toggleAccordion(subjectId);
    });
  });

  container.querySelectorAll('button[data-action="mark-subject-all"]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const subjectId = e.currentTarget.dataset.subject;
      await markSubjectAllComplete(subjectId);
    });
  });

  container.querySelectorAll('button[data-action="reset-subject"]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const subjectId = e.currentTarget.dataset.subject;
      await resetSubjectProgress(subjectId);
    });
  });
}

// Backend Update Helpers
async function updateUnitOnBackend(subjectId, unitId, changes) {
  const subject = state.subjects.find(s => s.id === subjectId);
  if (!subject) return;
  const unit = subject.units.find(u => u.id === unitId);
  if (!unit) return;

  if (changes.completed !== undefined) {
    unit.completed = changes.completed;
    unit.status = changes.completed ? 'completed' : 'not_started';
    if (changes.completed) triggerMiniCelebration();
  }
  if (changes.status !== undefined) {
    unit.status = changes.status;
    unit.completed = changes.status === 'completed';
    if (unit.completed) triggerMiniCelebration();
  }
  if (changes.notes !== undefined) {
    unit.notes = changes.notes;
  }
  if (changes.title !== undefined) {
    unit.title = changes.title;
  }

  render();

  try {
    await fetchAPI(`/api/units/${unitId}`, {
      method: 'PATCH',
      body: JSON.stringify(changes)
    });
  } catch (err) {
    console.warn('Update saved locally (offline):', err);
  }
}

async function markSubjectAllComplete(subjectId) {
  const subject = state.subjects.find(s => s.id === subjectId);
  if (!subject) return;

  subject.units.forEach(u => {
    u.completed = true;
    u.status = 'completed';
  });
  render();
  triggerCelebration(false);

  try {
    await fetchAPI(`/api/subjects/${subjectId}/mark-all`, {
      method: 'POST',
      body: JSON.stringify({ completed: true })
    });
  } catch (err) {
    console.warn('Mark all saved locally (offline):', err);
  }
}

async function resetSubjectProgress(subjectId) {
  const subject = state.subjects.find(s => s.id === subjectId);
  if (!subject) return;

  subject.units.forEach(u => {
    u.completed = false;
    u.status = 'not_started';
    u.revisions = 0;
  });
  render();

  try {
    for (const unit of subject.units) {
      await fetchAPI(`/api/units/${unit.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ completed: false, status: 'not_started', revisions: 0 })
      });
    }
  } catch (err) {
    console.warn('Reset saved locally (offline):', err);
  }
}

function toggleAccordion(subjectId) {
  state.collapsedMap[subjectId] = !state.collapsedMap[subjectId];
  const content = document.getElementById(`accordion-${subjectId}`);
  if (content) {
    if (state.collapsedMap[subjectId]) {
      content.classList.add('collapsed');
    } else {
      content.classList.remove('collapsed');
    }
  }
  renderSubjects();
}

function toggleAllAccordions() {
  const allCollapsed = state.subjects.every(s => state.collapsedMap[s.id]);
  const shouldCollapse = !allCollapsed;

  state.subjects.forEach(s => {
    state.collapsedMap[s.id] = shouldCollapse;
  });

  const label = document.getElementById('accordionBtnLabel');
  const icon = document.getElementById('collapseIcon');
  if (label) label.textContent = shouldCollapse ? 'Expand All' : 'Collapse All';
  if (icon) icon.className = `w-4 h-4 transform transition-transform duration-300 ${shouldCollapse ? '' : 'rotate-180'}`;

  renderSubjects();
}

// Notes Handling
function openNotesModal(subjectId, unitId) {
  const subject = state.subjects.find(s => s.id === subjectId);
  if (!subject) return;
  const unit = subject.units.find(u => u.id === unitId);
  if (!unit) return;

  state.activeNotesUnit = { subjectId, unitId };

  const tag = document.getElementById('notesModalSubjectTag');
  const title = document.getElementById('notesModalUnitTitle');
  const textarea = document.getElementById('notesModalTextarea');

  if (tag) tag.textContent = `${subject.name} • Unit ${unit.num}`;
  if (title) title.textContent = unit.title;
  if (textarea) textarea.value = unit.notes || '';

  openModal('notesModal');
  textarea?.focus();
}

async function saveActiveNote() {
  if (!state.activeNotesUnit) return;
  const { subjectId, unitId } = state.activeNotesUnit;
  const textarea = document.getElementById('notesModalTextarea');
  const notes = textarea ? textarea.value : '';

  await updateUnitOnBackend(subjectId, unitId, { notes });
  closeModal('notesModal');
}

// Custom Unit Title Handling
function openEditTitleModal(subjectId, unitId) {
  const subject = state.subjects.find(s => s.id === subjectId);
  if (!subject) return;
  const unit = subject.units.find(u => u.id === unitId);
  if (!unit) return;

  state.activeEditUnit = { subjectId, unitId };

  const input = document.getElementById('editTitleInput');
  if (input) input.value = unit.title;

  openModal('editTitleModal');
  input?.focus();
}

async function saveActiveUnitTitle() {
  if (!state.activeEditUnit) return;
  const { subjectId, unitId } = state.activeEditUnit;
  const input = document.getElementById('editTitleInput');
  const newTitle = input ? input.value.trim() : '';

  if (newTitle) {
    await updateUnitOnBackend(subjectId, unitId, { title: newTitle });
  }
  closeModal('editTitleModal');
}

// Reset Entire Database
async function resetAllProgress() {
  closeModal('resetConfirmModal');

  state.subjects.forEach(subject => {
    subject.units.forEach(u => {
      u.completed = false;
      u.status = 'not_started';
      u.revisions = 0;
    });
  });
  render();

  try {
    await fetchAPI('/api/reset', { method: 'POST' });
  } catch (err) {
    console.warn('Reset applied locally:', err);
  }
}

// Export Database JSON
async function exportDatabase() {
  try {
    const data = {
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      subjects: state.subjects,
      meta: {
        lastExported: new Date().toISOString()
      }
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `studysync_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Export error:', err);
  }
}

// Import Database JSON
function importDatabase(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (event) => {
    try {
      const parsed = JSON.parse(event.target.result);
      if (parsed && Array.isArray(parsed.subjects)) {
        state.subjects = parsed.subjects;
        render();

        try {
          await fetchAPI('/api/import', {
            method: 'POST',
            body: JSON.stringify(parsed)
          });
        } catch (apiErr) {
          console.warn('Import saved locally:', apiErr);
        }

        alert('Syllabus progress imported successfully!');
      } else {
        alert('Invalid backup file format.');
      }
    } catch (parseErr) {
      alert('Error parsing JSON backup file.');
    }
    e.target.value = '';
  };
  reader.readAsText(file);
}

// Confetti Animations
function triggerMiniCelebration() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10b981', '#6366f1', '#06b6d4']
    });
  }
}

function triggerMiniConfetti(x, y) {
  if (typeof confetti === 'function') {
    const originX = x ? x / window.innerWidth : 0.5;
    const originY = y ? y / window.innerHeight : 0.5;
    confetti({
      particleCount: 15,
      spread: 45,
      origin: { x: originX, y: originY },
      colors: ['#f59e0b', '#ec4899', '#8b5cf6']
    });
  }
}

function triggerCelebration(isFull = false) {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: isFull ? 150 : 60,
      spread: isFull ? 100 : 70,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#a855f7', '#06b6d4', '#10b981', '#f59e0b']
    });
  }
}
