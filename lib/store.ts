import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { EstimateInput } from "./estimate";

export type SavedProject = {
  id: string;
  name: string;
  createdAt: string;
  input: EstimateInput;
};

const DIR = path.join(process.cwd(), "data");
const FILE = path.join(DIR, "estimates.json");
const MAX = 200;

async function readAll(): Promise<SavedProject[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SavedProject[]) : [];
  } catch {
    return [];
  }
}

async function writeAll(list: SavedProject[]) {
  await fs.mkdir(DIR, { recursive: true });
  const tmp = FILE + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(list, null, 2), "utf8");
  await fs.rename(tmp, FILE);
}

let queue: Promise<unknown> = Promise.resolve();
function serial<T>(fn: () => Promise<T>): Promise<T> {
  const next = queue.then(fn, fn);
  queue = next.catch(() => undefined);
  return next;
}

export function listProjects(): Promise<SavedProject[]> {
  return serial(async () => {
    const list = await readAll();
    return list.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  });
}

export function saveProject(
  name: string,
  input: EstimateInput
): Promise<SavedProject> {
  return serial(async () => {
    const list = await readAll();
    const finalName = (name || input.project).slice(0, 60);
    const project: SavedProject = {
      id: randomUUID().slice(0, 8),
      name: finalName,
      createdAt: new Date().toISOString(),
      input: { ...input, project: finalName },
    };
    list.unshift(project);
    await writeAll(list.slice(0, MAX));
    return project;
  });
}

export function deleteProject(id: string): Promise<boolean> {
  return serial(async () => {
    const list = await readAll();
    const next = list.filter((p) => p.id !== id);
    if (next.length === list.length) return false;
    await writeAll(next);
    return true;
  });
}
