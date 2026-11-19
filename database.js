/**
 * Database Layer for StudySync Tracker
 * Manages persistent storage for subjects, units, notes, revisions, and study streaks.
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
let DB_FILE = process.env.DB_FILE || path.join(__dirname, 'database.json');
try {
  if (process.env.DB_FILE) {
    DB_FILE = process.env.DB_FILE;
  } else if (fs.existsSync(DATA_DIR) && fs.existsSync(path.join(DATA_DIR, 'database.json'))) {
    DB_FILE = path.join(DATA_DIR, 'database.json');
  }
} catch (e) {
  DB_FILE = path.join(__dirname, 'database.json');
}

// Default Seed Data
const INITIAL_DATABASE = {
  version: "1.0.0",
  meta: {
    appName: "StudySync Tracker",
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    streak: {
      count: 1,
      lastDate: new Date().toISOString().split('T')[0]
    }
  },
  subjects: [
    {
      id: "os",
      name: "Operating System",
      code: "OS",
      color: "emerald",
      totalUnits: 5,
      units: [
        { id: "os_u1", subjectId: "os", num: 1, title: "Introduction to Operating Systems, Dual-Mode Operation & System Calls", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "os_u2", subjectId: "os", num: 2, title: "Process Management, Threads, CPU Scheduling Algorithms & Multithreading", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "os_u3", subjectId: "os", num: 3, title: "Process Synchronization, Critical Section Problem, Semaphores & Deadlocks", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "os_u4", subjectId: "os", num: 4, title: "Memory Management, Paging, Segmentation, Page Replacement & Virtual Memory", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "os_u5", subjectId: "os", num: 5, title: "Storage Management, File System Interface, Directory Structures & I/O Systems", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() }
      ]
    },
    {
      id: "aiml",
      name: "Artificial Intelligence & Machine Learning",
      code: "AI & ML",
      color: "indigo",
      totalUnits: 5,
      units: [
        { id: "aiml_u1", subjectId: "aiml", num: 1, title: "Intro to AI, Problem Formulation, State Spaces & Heuristic Search Algorithms", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "aiml_u2", subjectId: "aiml", num: 2, title: "Knowledge Representation, Propositional Logic & First-Order Predicate Logic", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "aiml_u3", subjectId: "aiml", num: 3, title: "Supervised Learning, Linear Regression, Logistic Regression & Decision Trees", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "aiml_u4", subjectId: "aiml", num: 4, title: "Unsupervised Learning, K-Means Clustering, PCA & Intro to Neural Networks", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "aiml_u5", subjectId: "aiml", num: 5, title: "Reinforcement Learning, Markov Decision Processes, AI Ethics & Applications", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() }
      ]
    },
    {
      id: "toc",
      name: "Theory of Computation",
      code: "TOC",
      color: "amber",
      totalUnits: 5,
      units: [
        { id: "toc_u1", subjectId: "toc", num: 1, title: "Finite Automata (DFA, NFA), Conversions & Regular Expressions", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "toc_u2", subjectId: "toc", num: 2, title: "Regular Grammars, Pumping Lemma for Regular Languages & DFA Minimization", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "toc_u3", subjectId: "toc", num: 3, title: "Context-Free Grammars (CFG), Ambiguity, CNF/GNF & Pushdown Automata (PDA)", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "toc_u4", subjectId: "toc", num: 4, title: "Turing Machines (TM), Design Techniques, Multi-Tape TM & Church-Turing Thesis", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "toc_u5", subjectId: "toc", num: 5, title: "Decidability, Halting Problem, Undecidable Problems & Complexity Classes (P, NP)", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() }
      ]
    },
    {
      id: "cc",
      name: "Cloud Computing",
      code: "CC",
      color: "sky",
      totalUnits: 5,
      units: [
        { id: "cc_u1", subjectId: "cc", num: 1, title: "Cloud Computing Architecture, Characteristics & Service Models (IaaS, PaaS, SaaS)", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "cc_u2", subjectId: "cc", num: 2, title: "Virtualization Technologies, Type 1 & Type 2 Hypervisors & Resource Provisioning", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "cc_u3", subjectId: "cc", num: 3, title: "Cloud Storage Architectures, Distributed File Systems, Cloud Security & IAM", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "cc_u4", subjectId: "cc", num: 4, title: "Cloud Native Technologies, Docker Containers, Microservices & Kubernetes Orchestration", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "cc_u5", subjectId: "cc", num: 5, title: "Cloud Monitoring, SLA, Cost Optimization, Disaster Recovery & Serverless", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() }
      ]
    },
    {
      id: "ipr",
      name: "IPR and Cyber Laws",
      code: "IPR",
      color: "rose",
      totalUnits: 4,
      units: [
        { id: "ipr_u1", subjectId: "ipr", num: 1, title: "Intellectual Property Rights: Patents, Copyrights, Trademarks, Designs & Trade Secrets", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "ipr_u2", subjectId: "ipr", num: 2, title: "Cyber Laws Framework, Information Technology (IT) Act 2000 & Electronic Governance", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "ipr_u3", subjectId: "ipr", num: 3, title: "Cyber Crimes, Hacking, Identity Theft, Phishing, Tampering & Digital Evidence", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "ipr_u4", subjectId: "ipr", num: 4, title: "Data Protection, Privacy Regulations, E-Commerce Contracts, Jurisdiction & Liability", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() }
      ]
    },
    {
      id: "medchem",
      name: "Medicinal Chemistry 2",
      code: "MC-II",
      color: "teal",
      totalUnits: 5,
      units: [
        { id: "medchem_u1", subjectId: "medchem", num: 1, title: "Antihistaminic Agents (H1 & H2 Antagonists, Gastric PPIs) & Anti-neoplastic Agents", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "medchem_u2", subjectId: "medchem", num: 2, title: "Cardiovascular Agents: Anti-anginal, Vasodilators & Diuretics (Carbonic anhydrase, Loop, Thiazides)", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "medchem_u3", subjectId: "medchem", num: 3, title: "Anti-hypertensive Drugs, Anti-arrhythmic Agents & Anti-hyperlipidemic Drugs", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "medchem_u4", subjectId: "medchem", num: 4, title: "Drugs Acting on Endocrine System: Sex Hormones, Thyroid & Anti-thyroid Drugs, Oral Contraceptives", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "medchem_u5", subjectId: "medchem", num: 5, title: "Antidiabetic Agents (Insulin, Sulfonylureas, Biguanides) & Local Anesthetics", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() }
      ]
    },
    {
      id: "indpharm",
      name: "Industrial Pharmacy 1",
      code: "IP-I",
      color: "blue",
      totalUnits: 5,
      units: [
        { id: "indpharm_u1", subjectId: "indpharm", num: 1, title: "Preformulation Studies: Physical & Chemical Properties of Drug Substances, BCS Classification", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "indpharm_u2", subjectId: "indpharm", num: 2, title: "Tablets: Formulation, Granulation Techniques, Compression Tooling, Tablet Coating & Manufacturing Defects", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "indpharm_u3", subjectId: "indpharm", num: 3, title: "Capsules: Hard Gelatin & Soft Gelatin Capsule Technology, Production Quality Controls & Pellets", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "indpharm_u4", subjectId: "indpharm", num: 4, title: "Parenteral Products (Small & Large Volume Parenterals, Pyrogen Testing) & Ophthalmic Preparations", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "indpharm_u5", subjectId: "indpharm", num: 5, title: "Cosmetics Formulation (Lipsticks, Shampoos, Creams), Pharmaceutical Aerosols & Packaging Materials", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() }
      ]
    },
    {
      id: "pharmcol",
      name: "Pharmacology 2",
      code: "P-COL-II",
      color: "fuchsia",
      totalUnits: 5,
      units: [
        { id: "pharmcol_u1", subjectId: "pharmcol", num: 1, title: "Pharmacology of Drugs Acting on CVS: Congestive Heart Failure, Anti-hypertensives & Anti-anginal Drugs", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "pharmcol_u2", subjectId: "pharmcol", num: 2, title: "Anti-arrhythmic Drugs, Anti-hyperlipidemic Agents, Coagulants/Anticoagulants & Diuretics", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "pharmcol_u3", subjectId: "pharmcol", num: 3, title: "Autocoids: Histamine, 5-HT, Prostaglandins, Leukotrienes, NSAIDs & Anti-gout Medications", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "pharmcol_u4", subjectId: "pharmcol", num: 4, title: "Pharmacology of Endocrine System: Anterior Pituitary Hormones, Thyroid/Anti-thyroid, Diabetes & Steroids", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "pharmcol_u5", subjectId: "pharmcol", num: 5, title: "Bioassay Principles, Types & Applications (Insulin, Digitalis, Histamine) & Molecular Pharmacology", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() }
      ]
    },
    {
      id: "pharmacog",
      name: "Pharmacognosy 2",
      code: "P-COG-II",
      color: "lime",
      totalUnits: 5,
      units: [
        { id: "pharmacog_u1", subjectId: "pharmacog", num: 1, title: "Metabolic Pathways in Higher Plants (Shikimic Acid & Mevalonic Acid Pathways) & Tracer Techniques", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "pharmacog_u2", subjectId: "pharmacog", num: 2, title: "Isolation, Identification & Analysis of Phytoconstituents (Alkaloids, Glycosides, Terpenoids & Resins)", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "pharmacog_u3", subjectId: "pharmacog", num: 3, title: "Industrial Production, Estimation & Utilization of Phytoconstituents (Forskolin, Sennosides, Artemisinin)", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "pharmacog_u4", subjectId: "pharmacog", num: 4, title: "Modern Extraction Techniques: Microwave, Ultrasonic, Supercritical Fluid & Phytochemical Screening", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "pharmacog_u5", subjectId: "pharmacog", num: 5, title: "Chromatography (TLC, Column, HPLC) & Spectroscopy (UV, IR, NMR) in Herbal Drug Analysis", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() }
      ]
    },
    {
      id: "juris",
      name: "Pharmaceutical Jurisprudence",
      code: "PJ",
      color: "violet",
      totalUnits: 5,
      units: [
        { id: "juris_u1", subjectId: "juris", num: 1, title: "Drugs & Cosmetics Act 1940 & Rules 1945: Objectives, Definitions, Legal Authorities & Advisory Boards", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "juris_u2", subjectId: "juris", num: 2, title: "Manufacture, Sale, Labeling & Packaging of Drugs, Government Analysts, Drug Inspectors & Schedules under D&C Act", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "juris_u3", subjectId: "juris", num: 3, title: "Pharmacy Act 1948, Medicinal & Toilet Preparations Act 1955, Narcotic Drugs & Psychotropic Substances (NDPS) Act 1985", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "juris_u4", subjectId: "juris", num: 4, title: "Drugs & Magic Remedies Act 1954, Prevention of Cruelty to Animals Act 1960 & DPCO (Drug Price Control Order)", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() },
        { id: "juris_u5", subjectId: "juris", num: 5, title: "Code of Pharmaceutical Ethics, Medical Termination of Pregnancy Act, Right to Information Act & Intellectual Property Rights", status: "not_started", completed: false, notes: "", revisions: 0, updatedAt: new Date().toISOString() }
      ]
    }
  ]
};

class Database {
  constructor() {
    this.memoryData = null;
    this.ensureInitialized();
  }

  ensureInitialized() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        this.memoryData = JSON.parse(raw);

        // Ensure newly added subjects are merged in
        let hasNewSubjects = false;
        INITIAL_DATABASE.subjects.forEach(initialSub => {
          if (!this.memoryData.subjects.some(s => s.id === initialSub.id)) {
            this.memoryData.subjects.push(JSON.parse(JSON.stringify(initialSub)));
            hasNewSubjects = true;
          }
        });
        if (hasNewSubjects) {
          this.persist();
        }
      } else {
        this.memoryData = JSON.parse(JSON.stringify(INITIAL_DATABASE));
        this.persist();
      }
    } catch (err) {
      console.warn('Database initialization warning, using in-memory defaults:', err.message);
      this.memoryData = JSON.parse(JSON.stringify(INITIAL_DATABASE));
    }
  }

  persist() {
    try {
      this.memoryData.meta.lastUpdated = new Date().toISOString();
      fs.writeFileSync(DB_FILE, JSON.stringify(this.memoryData, null, 2), 'utf8');
    } catch (err) {
      // In restricted environments, in-memory updates continue to work seamlessly
      console.error('Database write error (persisted in memory):', err.message);
    }
  }

  updateStreak() {
    const today = new Date().toISOString().split('T')[0];
    if (!this.memoryData.meta.streak) {
      this.memoryData.meta.streak = { count: 1, lastDate: today };
      return;
    }

    const last = new Date(this.memoryData.meta.streak.lastDate);
    const cur = new Date(today);
    const diffDays = Math.floor((cur - last) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      this.memoryData.meta.streak.count += 1;
      this.memoryData.meta.streak.lastDate = today;
    } else if (diffDays > 1) {
      this.memoryData.meta.streak.count = 1;
      this.memoryData.meta.streak.lastDate = today;
    }
  }

  getAllSubjects() {
    return this.memoryData.subjects.map(subject => {
      const totalUnits = subject.units.length;
      const completedUnits = subject.units.filter(u => u.completed || u.status === 'completed').length;
      const inProgressUnits = subject.units.filter(u => u.status === 'in_progress').length;
      const percentage = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;

      return {
        ...subject,
        stats: {
          totalUnits,
          completedUnits,
          inProgressUnits,
          remainingUnits: totalUnits - completedUnits,
          percentage,
          isCompleted: completedUnits === totalUnits
        }
      };
    });
  }

  getSubject(subjectId) {
    const subject = this.memoryData.subjects.find(s => s.id === subjectId);
    if (!subject) return null;
    return subject;
  }

  findUnit(unitId) {
    for (const subject of this.memoryData.subjects) {
      const unit = subject.units.find(u => u.id === unitId);
      if (unit) return { subject, unit };
    }
    return null;
  }

  updateUnit(unitId, fields) {
    const found = this.findUnit(unitId);
    if (!found) return null;

    const { unit, subject } = found;

    if (typeof fields.completed === 'boolean') {
      unit.completed = fields.completed;
      unit.status = fields.completed ? 'completed' : 'not_started';
      if (fields.completed && (!unit.revisions || unit.revisions === 0)) {
        unit.revisions = 1;
      }
    }

    if (fields.status) {
      unit.status = fields.status;
      unit.completed = (fields.status === 'completed');
      if (unit.completed && (!unit.revisions || unit.revisions === 0)) {
        unit.revisions = 1;
      }
    }

    if (typeof fields.revisions === 'number') {
      unit.revisions = Math.max(0, fields.revisions);
    }

    if (typeof fields.notes === 'string') {
      unit.notes = fields.notes;
    }

    if (typeof fields.title === 'string' && fields.title.trim()) {
      unit.title = fields.title.trim();
    }

    unit.updatedAt = new Date().toISOString();
    this.updateStreak();
    this.persist();

    return { subject, unit };
  }

  incrementUnitRevision(unitId) {
    const found = this.findUnit(unitId);
    if (!found) return null;

    const { unit } = found;
    unit.revisions = (unit.revisions || 0) + 1;
    unit.updatedAt = new Date().toISOString();
    this.updateStreak();
    this.persist();
    return unit;
  }

  updateUnitNotes(unitId, notes) {
    const found = this.findUnit(unitId);
    if (!found) return null;

    const { unit } = found;
    unit.notes = notes || '';
    unit.updatedAt = new Date().toISOString();
    this.persist();
    return unit;
  }

  updateUnitTitle(unitId, title) {
    const found = this.findUnit(unitId);
    if (!found) return null;

    const { unit } = found;
    if (title && title.trim()) {
      unit.title = title.trim();
      unit.updatedAt = new Date().toISOString();
      this.persist();
    }
    return unit;
  }

  markSubjectAll(subjectId, shouldComplete) {
    const subject = this.memoryData.subjects.find(s => s.id === subjectId);
    if (!subject) return null;

    subject.units.forEach(unit => {
      unit.completed = shouldComplete;
      unit.status = shouldComplete ? 'completed' : 'not_started';
      if (shouldComplete && (!unit.revisions || unit.revisions === 0)) {
        unit.revisions = 1;
      }
      unit.updatedAt = new Date().toISOString();
    });

    if (shouldComplete) this.updateStreak();
    this.persist();
    return subject;
  }

  resetAllProgress() {
    this.memoryData.subjects.forEach(subject => {
      subject.units.forEach(unit => {
        unit.completed = false;
        unit.status = 'not_started';
        unit.revisions = 0;
        unit.updatedAt = new Date().toISOString();
      });
    });
    this.persist();
    return true;
  }

  getOverallStats() {
    let totalUnits = 0;
    let completedUnits = 0;
    let inProgressUnits = 0;
    let totalRevisions = 0;
    let subjectsCompleted = 0;
    let subjectsInProgress = 0;

    this.memoryData.subjects.forEach(subject => {
      const subTotal = subject.units.length;
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

      if (subCompleted === subTotal && subTotal > 0) {
        subjectsCompleted++;
      } else if (subCompleted > 0 || subject.units.some(u => u.status === 'in_progress')) {
        subjectsInProgress++;
      }
    });

    const percentage = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;

    return {
      totalUnits,
      completedUnits,
      inProgressUnits,
      remainingUnits: totalUnits - completedUnits,
      percentage,
      totalSubjects: this.memoryData.subjects.length,
      subjectsCompleted,
      subjectsInProgress,
      totalRevisions,
      streak: this.memoryData.meta.streak || { count: 1, lastDate: new Date().toISOString().split('T')[0] },
      lastUpdated: this.memoryData.meta.lastUpdated
    };
  }

  exportData() {
    return this.memoryData;
  }

  importData(imported) {
    if (!imported || !Array.isArray(imported.subjects)) {
      throw new Error('Invalid format: subjects array required');
    }

    this.memoryData.subjects = imported.subjects;
    if (imported.meta) {
      this.memoryData.meta = { ...this.memoryData.meta, ...imported.meta };
    }
    this.persist();
    return true;
  }
}

const db = new Database();
module.exports = db;
