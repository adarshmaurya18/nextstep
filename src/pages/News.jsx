const News = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">
        📰 Tech & Career Updates
      </h2>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">
          🔥 Last Month Highlights
        </h3>
        <ul className="list-disc ml-6 text-gray-700">
          <li>AI hiring increased across product companies</li>
          <li>Frontend demand remained stable</li>
          <li>More focus on full-stack skills</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">
          🔮 What’s Coming Next
        </h3>
        <ul className="list-disc ml-6 text-gray-700">
          <li>More AI-assisted developer roles</li>
          <li>Higher expectations for real projects</li>
          <li>Skill-based hiring over degrees</li>
        </ul>
      </section>
    </div>
  );
};

export default News;
