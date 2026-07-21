(() => {
  const THEME_KEY = "dev-sops-theme";
  const CHECKLIST_KEY = "dev-sops-checklist-v1";
  const HUB = "";

  const SKILL_GROUPS = [
    {
      label: "Shared",
      skills: [
        { id: "grill-with-docs", label: "grill-with-docs", bml: "required", bug: "optional", update: "required" },
        { id: "grilling", label: "grilling", bml: "optional", bug: "optional", update: "optional" },
        { id: "tdd", label: "tdd", bml: "optional", bug: "required", update: "optional" },
        { id: "code-review", label: "code-review", bml: "optional", bug: "required", update: "optional" },
        { id: "wayfinder", label: "wayfinder", bml: "optional", bug: "optional", update: "optional" },
      ],
    },
    {
      label: "Build (BML / Update)",
      skills: [
        { id: "to-spec", label: "to-spec", bml: "required", bug: null, update: "required" },
        { id: "to-tickets", label: "to-tickets", bml: "required", bug: null, update: "required" },
        { id: "implement", label: "implement", bml: "required", bug: null, update: "required" },
        { id: "prototype", label: "prototype", bml: "optional", bug: null, update: null },
      ],
    },
    {
      label: "Bug",
      skills: [
        { id: "diagnosing-bugs", label: "diagnosing-bugs", bml: null, bug: "required", update: null },
        { id: "triage", label: "triage", bml: null, bug: "required", update: null },
      ],
    },
  ];

  const body = document.body;
  const pageId = body.dataset.page || "hub";
  const activeSkill = body.dataset.skill || "";
  const base = body.dataset.base || "";

  function href(path) {
    return `${base}${path}`;
  }

  function skillHref(id) {
    return href(`skills/${id}.html`);
  }

  function buildHubSidebar() {
    const skillsActive = pageId === "skills" || pageId === "skill-detail";
    const checkActive = pageId.startsWith("checklist");

    const skillNav = SKILL_GROUPS.map((group) => {
      const links = group.skills
        .map((s) => {
          const active = pageId === "skill-detail" && activeSkill === s.id ? " is-active" : "";
          return `<a class="nav-link skill-nav-link${active}" href="${skillHref(s.id)}"><span class="nav-num">/</span> ${s.label}</a>`;
        })
        .join("");
      return `<p class="nav-section-label">${group.label}</p>${links}`;
    }).join("");

    const skillsBlock =
      pageId === "skill-detail"
        ? `
        <p class="nav-section-label">Skills</p>
        <a class="nav-link" href="${href("skills.html")}"><span class="nav-num">←</span> All skills</a>
        ${skillNav}`
        : `<a class="nav-link${skillsActive ? " is-active" : ""}" href="${href("skills.html")}"><span class="nav-num">/</span> Skills</a>`;

    return `
      <a class="sidebar-brand" href="${href("index.html")}">
        <img src="${href("assets/practical-ai-mark.png")}" alt="" width="40" height="40" />
        <div class="sidebar-brand-text">
          <strong>Practical AI</strong>
          <span>Dev SOPs</span>
        </div>
      </a>
      <nav class="sidebar-nav">
        <p class="nav-section-label">SOPs</p>
        <a class="nav-link${pageId === "hub" ? " is-active" : ""}" href="${href("index.html")}"><span class="nav-num">⌂</span> Hub</a>
        <a class="nav-link" href="https://practical-office.github.io/bml-onboarding/"><span class="nav-num">1</span> Build-Measure-Learn</a>
        <a class="nav-link" href="https://practical-office.github.io/bug-handling-sop/"><span class="nav-num">2</span> Bug Handling</a>
        <a class="nav-link" href="https://practical-office.github.io/update-sop/"><span class="nav-num">3</span> Update Handling</a>
        <p class="nav-section-label">Reference</p>
        ${skillsBlock}
        <a class="nav-link${checkActive ? " is-active" : ""}" href="${href("checklists.html")}"><span class="nav-num">☑</span> Check List</a>
        <a class="nav-link" href="https://github.com/orgs/Practical-Office/projects/2" target="_blank" rel="noopener noreferrer"><span class="nav-num">#</span> Team Board</a>
      </nav>
      <div class="sidebar-footer">
        <button type="button" class="btn btn-ghost btn-sm" id="themeToggle" style="width:100%;margin-bottom:0.5rem">Toggle theme</button>
        <a href="https://github.com/Practical-Office/dev-sops" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>`;
  }

  function mountSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar || sidebar.dataset.built) return;
    sidebar.innerHTML = buildHubSidebar();
    sidebar.dataset.built = "1";
  }

  function bindTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "dark" || stored === "light") {
      document.documentElement.setAttribute("data-theme", stored);
    }
    const toggle = () => {
      const current = document.documentElement.getAttribute("data-theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const isDark = current === "dark" || (!current && prefersDark);
      const next = isDark ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem(THEME_KEY, next);
    };
    document.getElementById("themeToggle")?.addEventListener("click", toggle);
  }

  function bindMobileNav() {
    document.getElementById("menuBtn")?.addEventListener("click", () => {
      document.body.classList.toggle("nav-open");
    });
    document.getElementById("navOverlay")?.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
    });
    document.querySelectorAll(".sidebar a").forEach((a) => {
      a.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 900px)").matches) {
          document.body.classList.remove("nav-open");
        }
      });
    });
  }

  function loadChecklist() {
    try {
      return JSON.parse(localStorage.getItem(CHECKLIST_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function saveChecklist(state) {
    localStorage.setItem(CHECKLIST_KEY, JSON.stringify(state));
  }

  function bindChecklist() {
    const state = loadChecklist();
    document.querySelectorAll('input[type="checkbox"][data-checklist]').forEach((el) => {
      el.checked = Boolean(state[el.dataset.checklist]);
      el.closest("label")?.classList.toggle("is-checked", el.checked);
      el.addEventListener("change", () => {
        const s = loadChecklist();
        s[el.dataset.checklist] = el.checked;
        saveChecklist(s);
        el.closest("label")?.classList.toggle("is-checked", el.checked);
      });
    });
    document.getElementById("resetChecklist")?.addEventListener("click", () => {
      const ids = [...document.querySelectorAll("[data-checklist]")].map((el) => el.dataset.checklist);
      if (!confirm("Reset all checkboxes on this page?")) return;
      const s = loadChecklist();
      ids.forEach((id) => delete s[id]);
      saveChecklist(s);
      document.querySelectorAll("[data-checklist]").forEach((el) => {
        el.checked = false;
        el.closest("label")?.classList.toggle("is-checked", false);
      });
    });
  }

  mountSidebar();
  bindTheme();
  bindMobileNav();
  bindChecklist();
})();
