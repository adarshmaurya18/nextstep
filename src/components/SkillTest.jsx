import { useState } from "react";
import { SKILL_QUESTIONS } from "../data/skillQuestions";

const SkillTest = ({ skill, onClose }) => {
  const questions = SKILL_QUESTIONS[skill] || [];
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  if (!questions.length) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        No test available for {skill} yet.
      </div>
    );
  }

  const handleAnswer = (index) => {
    const updated = [...answers];
    updated[current] = index;
    setAnswers(updated);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const score = answers.filter(
    (ans, i) => ans === questions[i].correctIndex
  ).length;

  if (finished) {
    const percent = Math.round(
      (score / questions.length) * 100
    );

    return (
      <div className="p-6 bg-white rounded-xl shadow">
        <h3 className="text-xl font-bold mb-2">
          {skill} Skill Readiness
        </h3>

        <p className="text-3xl font-bold text-indigo-600 mb-4">
          {percent}%
        </p>

        <p className="text-gray-600 mb-4">
          You answered {score} out of {questions.length} correctly.
        </p>

        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Close
        </button>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h3 className="font-semibold mb-4">
        {q.question}
      </h3>

      <div className="space-y-2">
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            className="block w-full text-left px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            {opt}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-4">
        Question {current + 1} of {questions.length}
      </p>
    </div>
  );
};

export default SkillTest;
