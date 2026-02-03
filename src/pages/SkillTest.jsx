import { useState } from "react";
import { motion } from "framer-motion";
import { SKILL_QUESTIONS } from "../data/skillQuestions";

const SkillTest = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!selectedSkill) {
    return (
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">
          Choose a skill to test
        </h2>

        <div className="grid gap-3">
          {Object.keys(SKILL_QUESTIONS).map((skill) => (
            <motion.button
              key={skill}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedSkill(skill)}
              className="p-3 border rounded-lg hover:bg-gray-50"
            >
              {skill}
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  const questions = SKILL_QUESTIONS[selectedSkill];
  const q = questions[current];

  const handleAnswer = (idx) => {
    if (idx === q.correctIndex) setScore(score + 1);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const percentage = Math.round(
        ((idx === q.correctIndex ? score + 1 : score) /
          questions.length) *
          100
      );

      const saved =
        JSON.parse(sessionStorage.getItem("skillScores")) || {};

      saved[selectedSkill] = percentage;
      sessionStorage.setItem("skillScores", JSON.stringify(saved));
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow text-center"
      >
        <h2 className="text-2xl font-bold mb-2">
          {selectedSkill} Score
        </h2>
        <p className="text-4xl font-bold text-indigo-600">
          {Math.round((score / questions.length) * 100)}%
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={current}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow"
    >
      <h2 className="text-lg font-semibold mb-4">
        {selectedSkill} · Question {current + 1}
      </h2>

      <p className="mb-4 font-medium">{q.question}</p>

      <div className="grid gap-3">
        {q.options.map((opt, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleAnswer(idx)}
            className="p-3 border rounded-lg hover:bg-indigo-50 text-left"
          >
            {opt}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillTest;