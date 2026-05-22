const projectList = document.querySelector("#resume-projects-list");
const projectStatus = document.querySelector("#resume-projects-status");

const fallbackMarkup = projectList ? projectList.innerHTML : "";

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[character];
  });
}

function normalizeResumeProjects(payload) {
  if (!Array.isArray(payload)) return [];

  return payload
    .filter((project) => project && typeof project.title === "string")
    .slice(0, 3)
    .map((project) => ({
      title: project.title.trim(),
      summary:
        Array.isArray(project.resumeBullets) && typeof project.resumeBullets[0] === "string"
          ? project.resumeBullets[0].trim()
          : typeof project.summary === "string"
            ? project.summary.trim()
            : ""
    }))
    .filter((project) => project.title && project.summary);
}

function renderResumeProjects(projects) {
  if (!projectList) return;

  projectList.innerHTML = projects
    .map(
      (project) => `
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.summary)}</p>
      `
    )
    .join("");
}

async function hydrateResumeProjects() {
  if (!projectList || window.location.protocol === "file:") {
    return;
  }

  try {
    const response = await fetch("./data/projects.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Resume manifest request failed with ${response.status}`);
    }

    const projects = normalizeResumeProjects(await response.json());
    if (projects.length === 0) {
      throw new Error("Resume manifest payload was empty.");
    }

    renderResumeProjects(projects);

    if (projectStatus) {
      projectStatus.textContent = "Showing project bullets from the shared portfolio manifest.";
    }
  } catch (error) {
    console.warn("Falling back to bundled resume project summaries.", error);

    if (projectList) {
      projectList.innerHTML = fallbackMarkup;
    }

    if (projectStatus) {
      projectStatus.textContent = "Showing bundled resume project summaries.";
    }
  }
}

hydrateResumeProjects();
