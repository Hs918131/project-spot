"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserSideProjects } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { RepoStatsModal } from "./repo-stats-modal";
import { ProfileHeader } from "./profile-header";
import { Link } from "next-view-transitions";

const fetchSideProjects = async (
  username: string
): Promise<UserSideProjects> => {
  const response = await fetch(`/api/side-projects?username=${username}`);
  return response.json();
};

export default function SideProjects({ username }: { username?: string }) {
  const {
    data: userSideProjects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sideProjects", username],
    queryFn: () => fetchSideProjects(username ?? ""),
  });

  if (error) return <div className="text-red-500">Error fetching projects</div>;

  return (
    <div className="bg-background text-foreground mt-8">
      {!isLoading && userSideProjects?.user && (
        <ProfileHeader owner={userSideProjects.user} />
      )}

      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-lg text-muted-foreground animate-pulse">
            Loading {username}&apos;s side projects...
          </p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {userSideProjects?.repositories?.map((project) => (
            <Card key={project.name} className="bg-card">
              <CardHeader className="pb-2">
                <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center w-full gap-2">
                  <Link
                    href={`/${username}/${project.name}`}
                    className="text-lg text-muted-foreground hover:text-primary truncate max-w-full xs:max-w-[70%]"
                  >
                    {project.name}
                  </Link>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <RepoStatsModal
                      stargazersUrl={project.stargazers_url}
                      forksUrl={project.forks_url}
                      type="stars"
                      count={project.stargazers_count}
                    />
                    <RepoStatsModal
                      stargazersUrl={project.stargazers_url}
                      forksUrl={project.forks_url}
                      type="forks"
                      count={project.forks_count}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-nowrap items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
                  <Badge
                    variant="outline"
                    className="px-2 py-1 rounded-full text-xs shrink-0"
                  >
                    {project.language}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {project.topics.map((topic) => (
                      <Badge
                        key={topic}
                        variant="secondary"
                        className="px-2 py-1 rounded-full text-xs whitespace-nowrap shrink-0"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
