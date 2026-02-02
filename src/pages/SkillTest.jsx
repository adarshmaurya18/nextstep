import { useState } from "react";
import { SKILL_QUESTIONS } from "../data/skillQuestions";


const SkillTest = () => {
  const skills = Object.keys(SKILL_QUESTIONS);


  const [selectedSkill, setSelectedSkill] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  if (!selectedSkill) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          🧪 Skill Assessment Test
        </h1>

        <p className="text-gray-600 mb-6">
          Choose a skill and test your real-world understanding.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <button
              key={skill}
              onClick={() => setSelectedSkill(skill)}
              className="p-4 bg-white rounded-xl shadow hover:shadow-md font-semibold"
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const questions = SKILL_QUESTIONS[selectedSkill];
  const question = questions[currentQ];

  const handleNext = () => {
    if (selectedOption === question.correctIndex) {
      setScore((prev) => prev + 1);
    }

    setSelectedOption(null);

    if (currentQ + 1 < questions.length) {
      setCurrentQ((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
         // ✅ Save skill score
     const savedScores =
     JSON.parse(localStorage.getItem("skillScores")) || {};

       savedScores[selectedSkill] = percentage;

    sessionStorage.setItem(
    "skillScores",
      JSON.stringify(savedScores)
    );

  
       

    let level = "Beginner";
    if (percentage >= 70) level = "Advanced";
    else if (percentage >= 40) level = "Intermediate";

    return (
      <div className="p-8 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">
          🎯 Test Result
        </h2>

        <p className="text-xl mb-2">
          Skill: <span className="font-semibold">{selectedSkill}</span>
        </p>

        <p className="text-xl mb-2">
          Score: {score} / {questions.length}
        </p>

        <p className="text-2xl font-bold mt-4">
          Level: {level}
        </p>

        <button
          onClick={() => {
            setSelectedSkill(null);
            setCurrentQ(0);
            setScore(0);
            setShowResult(false);
          }}
          className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg"
        >
          Take Another Test
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <p className="text-sm text-gray-500 mb-2">
        {selectedSkill} • Question {currentQ + 1} / {questions.length}
      </p>

      <h2 className="text-xl font-semibold mb-6">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedOption(idx)}
            className={`w-full text-left p-4 rounded-lg border 
              ${
                selectedOption === idx
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-200"
              }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <button
        disabled={selectedOption === null}
        onClick={handleNext}
        className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
      >
        {currentQ + 1 === questions.length ? "Finish Test" : "Next"}
      </button>
    </div>
  );
};

export default SkillTest;