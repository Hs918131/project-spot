import octokit from "@/lib/octokit";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Extract the username from the query parameters
  const url = new URL(request.url);
  const username = url.searchParams.get("username") || "Hs918131";

  try {
    // Use the search.repos endpoint to find repositories with the 'project.spot' topic for the provided username or default to hs918131
    const { data } = await octokit.search.repos({
      q: `topic:project.spot user:${username}`,
      per_page: 100,
    });

    // Extract repositories from search results
    const repositories = data.items;

    // get user info
    const { data: user } = await octokit.users.getByUsername({ username });

    return NextResponse.json({ user, repositories });
  } catch (error) {
    console.error("Error fetching side projects for user:", username, error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
