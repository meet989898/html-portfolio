const fallbackProjects = [
  {
    title: "SIMBA",
    subtitle: "Scalable Similarity Search Benchmarking Architecture",
    summary:
      "A chess decision-space retrieval system using FAISS-style nearest-neighbor search, evaluation-aware embeddings, and systems benchmarks for large position corpora.",
    status: "Live GitHub project",
    tags: ["ml", "retrieval", "backend", "data"],
    metrics: ["10M position target", "Sub-second retrieval goal", "Ranking evaluation"],
    repo: "https://github.com/meet989898/SIMBA",
    demo: "#timeline"
  },
  {
    title: "Pharmacy Document Intelligence",
    subtitle: "Public-safe rebuild in progress",
    summary:
      "A synthetic-document ML platform for semantic search, hybrid retrieval, reranking, explainable evidence views, and production-style FastAPI workflows.",
    status: "Next project",
    tags: ["ml", "retrieval", "backend"],
    metrics: ["Transformer retrieval", "Hybrid ranking", "Docker + CI"],
    repo: "#timeline",
    demo: "#timeline"
  },
  {
    title: "Poker Behavior Modeling",
    subtitle: "Predictive strategy analytics",
    summary:
      "A modeling and visualization system for poker action prediction, player behavior features, calibration, simulation, and interactive decision analysis.",
    status: "Planned upgrade",
    tags: ["ml", "data", "backend"],
    metrics: ["Behavior features", "Action prediction", "Interactive dashboard"],
    repo: "https://github.com/meet989898/Poker-Stats",
    demo: "#timeline"
  },
  {
    title: "Augmented KGE Research",
    subtitle: "Knowledge graph embedding evaluation",
    summary:
      "Research pipeline for knowledge graph embeddings, negative sampling, link prediction, and IR-style relevance metrics including MRR, Hits@K, nDCG, and MAP.",
    status: "Research signal",
    tags: ["ml", "retrieval", "data"],
    metrics: ["KGE models", "IR metrics", "PyTorch pipelines"],
    repo: "https://github.com/meet989898/Augmented_KGE_meet",
    demo: "#systems"
  }
];

const grid = document.querySelector("#project-grid");
const filters = document.querySelectorAll(".filter");
const status = document.querySelector("#project-status");
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

let projects = fallbackProjects;

function renderProjects(filter = "all") {
  const visibleCount = projects.filter((project) => filter === "all" || project.tags.includes(filter)).length;

  grid.innerHTML = projects
    .map((project) => {
      const hidden = filter !== "all" && !project.tags.includes(filter);
      const tags = project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
      const metrics = project.metrics.map((metric) => `<span class="tag">${metric}</span>`).join("");

      return `
        <article
          class="project-card${hidden ? " hidden" : ""}"
          data-tags="${project.tags.join(" ")}"
          ${hidden ? 'aria-hidden="true"' : ""}
        >
          <header>
            <p class="project-meta">${project.status}</p>
            <h3>${project.title}</h3>
            <p>${project.subtitle}</p>
          </header>
          <p>${project.summary}</p>
          <div class="tag-row" aria-label="Project tags">${tags}</div>
          <div class="tag-row" aria-label="Project metrics">${metrics}</div>
          <div class="project-links">
            <a href="${project.repo}">Repository</a>
            <a href="${project.demo}">Demo</a>
          </div>
        </article>
      `;
    })
    .join("");

  status.textContent =
    filter === "all"
      ? `Showing all ${visibleCount} projects.`
      : `Showing ${visibleCount} ${filter} project${visibleCount === 1 ? "" : "s"}.`;
}

function mapManifestProject(project) {
  return {
    title: project.title,
    subtitle: project.subtitle || project.cardStatus || project.status,
    summary: project.summary,
    status: project.cardStatus || project.status,
    tags: Array.isArray(project.portfolioTags) && project.portfolioTags.length ? project.portfolioTags : ["ml"],
    metrics: project.metrics,
    repo: project.repoUrl || "#timeline",
    demo: project.demoUrl || "#timeline"
  };
}

async function hydrateProjects() {
  if (window.location.protocol === "file:") {
    renderProjects();
    return;
  }

  try {
    const response = await fetch("./data/projects.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Project manifest request failed with ${response.status}`);

    const manifestProjects = await response.json();
    if (!Array.isArray(manifestProjects) || manifestProjects.length === 0) {
      throw new Error("Project manifest payload was empty.");
    }

    projects = manifestProjects.map(mapManifestProject);
  } catch (error) {
    console.warn("Falling back to bundled project cards.", error);
    projects = fallbackProjects;
  }

  renderProjects();
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    renderProjects(button.dataset.filter);
  });
});

hydrateProjects();

const canvas = document.querySelector("#signal-field");
const ctx = canvas.getContext("2d");
let width;
let height;
let nodes;
let animationFrameId = 0;

function stopAnimation() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = 0;
  }
  ctx.clearRect(0, 0, width, height);
}

function resize() {
  width = canvas.width = window.innerWidth * window.devicePixelRatio;
  height = canvas.height = window.innerHeight * window.devicePixelRatio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  const count = Math.min(90, Math.max(42, Math.floor(window.innerWidth / 18)));
  nodes = Array.from({ length: count }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * (0.28 + (index % 3) * 0.04),
    vy: (Math.random() - 0.5) * (0.28 + (index % 4) * 0.04),
    radius: (index % 5 === 0 ? 2.6 : 1.5) * window.devicePixelRatio
  }));
}

function tick() {
  if (reduceMotionQuery.matches) return;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(79, 209, 197, 0.78)";
  ctx.strokeStyle = "rgba(246, 200, 95, 0.16)";
  ctx.lineWidth = window.devicePixelRatio;

  for (const node of nodes) {
    node.x += node.vx * window.devicePixelRatio;
    node.y += node.vy * window.devicePixelRatio;

    if (node.x < 0 || node.x > width) node.vx *= -1;
    if (node.y < 0 || node.y > height) node.vy *= -1;

    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const a = nodes[i];
      const b = nodes[j];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      const limit = 150 * window.devicePixelRatio;
      if (distance < limit) {
        ctx.globalAlpha = 1 - distance / limit;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  }

  animationFrameId = requestAnimationFrame(tick);
}

resize();
window.addEventListener("resize", resize);

function syncMotionPreference() {
  if (reduceMotionQuery.matches) {
    canvas.setAttribute("data-motion", "reduced");
    stopAnimation();
    return;
  }

  canvas.removeAttribute("data-motion");
  if (!animationFrameId) tick();
}

syncMotionPreference();
reduceMotionQuery.addEventListener("change", syncMotionPreference);
