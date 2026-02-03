import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" }
  }
};

const RoleCard = ({ role, onSelect }) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.05,
        y: -6,
        boxShadow: "0px 12px 30px rgba(79,70,229,0.25)"
      }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(role)}
      className="cursor-pointer bg-white rounded-xl p-5 border border-gray-100"
    >
      {/* ROLE TITLE */}
      <h2 className="text-xl font-bold text-gray-800">
        {role.title}
      </h2>

      {/* META INFO */}
      <div className="mt-2 space-y-1">
        <p className="text-sm text-gray-600">
          Demand:{" "}
          <span className="font-semibold text-gray-800">
            {role.demand}
          </span>
        </p>

        <p className="text-sm text-gray-600">
          Trend:{" "}
          <span className="font-semibold text-gray-800">
            {role.trend}
          </span>
        </p>

        <p className="text-sm text-gray-600">
          Salary:{" "}
          <span className="font-semibold text-gray-800">
            {role.avgSalary}
          </span>
        </p>
      </div>

      {/* SKILLS */}
      <motion.div
        className="mt-4 flex flex-wrap gap-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.05 }
          }
        }}
      >
        {role.skills.map((skill, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0 }
            }}
            className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full"
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RoleCard;
