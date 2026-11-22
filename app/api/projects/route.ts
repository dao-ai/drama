import { NextRequest } from "next/server";
import { parseInput } from "@/lib/estimate";
import { deleteProject, listProjects, saveProject } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const projects = await listProjects();
  return Response.json({ projects }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }

  const sp: Record<string, string> = {};
  Object.entries(body).forEach(([k, v]) => {
    if (typeof v === "string" || typeof v === "number") sp[k] = String(v);
  });

  const input = parseInput(sp);
  const name = typeof body.name === "string" ? body.name : input.project;
  const project = await saveProject(name, input);
  return Response.json({ project }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return Response.json({ error: "missing id" }, { status: 400 });
  const ok = await deleteProject(id);
  return Response.json({ ok }, { status: ok ? 200 : 404 });
}
