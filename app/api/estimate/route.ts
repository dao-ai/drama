import { NextRequest } from "next/server";
import { estimate, parseInput, toCsv } from "@/lib/estimate";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const input = parseInput(
    Object.fromEntries(sp.entries()) as Record<string, string>
  );
  const result = estimate(input);

  if (sp.get("format") === "csv") {
    const csv = toCsv(input, result);
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition":
          'attachment; filename="manju-estimate.csv"; filename*=UTF-8\'\'%E6%BC%AB%E5%89%A7%E6%8A%A5%E4%BB%B7.csv',
        "Cache-Control": "no-store",
      },
    });
  }

  return Response.json(
    { input, result },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(req: Request) {
  let raw: Record<string, unknown> = {};
  try {
    raw = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }
  const sp: Record<string, string> = {};
  Object.entries(raw).forEach(([k, v]) => {
    if (typeof v === "string" || typeof v === "number") sp[k] = String(v);
  });
  const input = parseInput(sp);
  return Response.json({ input, result: estimate(input) });
}
