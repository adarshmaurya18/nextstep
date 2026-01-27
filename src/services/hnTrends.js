export async function fetchHNTrends() {
  const idsRes = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );

  if (!idsRes.ok) {
    throw new Error("Failed to fetch HN stories");
  }

  const ids = await idsRes.json();
  const topIds = ids.slice(0, 10);

  const stories = await Promise.all(
    topIds.map(async (id) => {
      const res = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      return res.json();
    })
  );

  return stories;
}
