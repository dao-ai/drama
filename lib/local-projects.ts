import type { EstimateInput } from "./estimate";

export type SavedProject = {
  id: string;
  name: string;
  createdAt: string;
  input: EstimateInput;
};

const KEY = "manju-projects-v1";
const MAX = 200;

export function loadProjects(): SavedProject[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as SavedProject[]) : [];
  } catch {
    return [];
  }
}

function persist(list: SavedProject[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX)));
  } catch {}
}

export function addProject(name: string, input: EstimateInput): SavedProject {
  const finalName = (name || input.project).slice(0, 60);
  const project: SavedProject = {
    id: Math.random().toString(36).slice(2, 10),
    name: finalName,
    createdAt: new Date().toISOString(),
    input: { ...input, project: finalName },
  };
  const list = loadProjects();
  persist([project, ...list]);
  return project;
}

export function removeProject(id: string) {
  persist(loadProjects().filter((p) => p.id !== id));
}
