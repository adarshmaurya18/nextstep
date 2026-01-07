const SkillSelector = ({ skills, selectedSkills, setSelectedSkills }) => {
  const toggleSkill = (skillName) => {
    if (selectedSkills.includes(skillName)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skillName));
    } else {
      setSelectedSkills([...selectedSkills, skillName]);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">
        Select skills you already know
      </h3>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <button
            key={skill.name}
            onClick={() => toggleSkill(skill.name)}
               className={`px-3 py-1 rounded-full border text-sm transition active:scale-95 ${
                 selectedSkills.includes(skill.name)
                 ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white hover:bg-gray-100"
                }`}
          >
            {skill.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SkillSelector;
