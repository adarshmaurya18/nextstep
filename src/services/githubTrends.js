export async function fetchGithubTrends() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(
      "https://api.github.com/search/repositories?q=stars:>5000&sort=stars&order=desc&per_page=10",
      { signal: controller.signal }
    );

    if (!response.ok) {
      throw new Error("GitHub API limit reached");
    }

    const data = await response.json();
    return data.items;
  } catch (err) {
    throw new Error(
      err.name === "AbortError"
        ? "GitHub request timed out"
        : err.message
    );
  } finally {
    clearTimeout(timeout);
  }
}
