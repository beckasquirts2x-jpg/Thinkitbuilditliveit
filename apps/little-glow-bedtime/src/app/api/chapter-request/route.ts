import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: { storyId?: string; storyTitle?: string; idea?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const idea = String(body.idea ?? "").trim().slice(0, 400);
  const storyTitle = String(body.storyTitle ?? "Unknown book").slice(0, 120);
  if (!idea) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const token = process.env.GITHUB_REQUESTS_TOKEN?.trim();
  const repo = process.env.GITHUB_REQUESTS_REPO?.trim();
  if (token && repo) {
    try {
      await fetch(`https://api.github.com/repos/${repo}/issues`, {
        method: "POST",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
        body: JSON.stringify({
          title: `Chapter wish: ${storyTitle}`,
          body: idea,
          labels: ["chapter-wish"],
        }),
      });
    } catch {
      /* client still saved locally */
    }
  }

  return NextResponse.json({ ok: true });
}
