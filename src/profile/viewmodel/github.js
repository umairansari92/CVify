/**
 * GithubVM — Wraps raw GitHub stats and loading state.
 */
export function buildGithubVM(githubData, githubLoading) {
  return {
    data:    githubData    || null,
    loading: githubLoading || false,
  };
}
