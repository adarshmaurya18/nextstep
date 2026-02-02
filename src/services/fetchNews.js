export async function fetchTechNews() {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?category=technology&pageSize=5&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  const data = await res.json();
  return data.articles;
}
