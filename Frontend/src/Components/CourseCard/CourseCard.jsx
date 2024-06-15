// CourseCard.js
import React, { useState } from "react";

const CourseCard = ({ course, onEnroll }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer"
      onClick={toggleExpand}
    >
      <h3 className="text-xl font-bold">{course.name}</h3>
      <p className="text-gray-600">{course.description}</p>

      {expanded && (
        <button
          onClick={() => onEnroll(course)}
          className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Enroll
        </button>
      )}
    </div>
  );
};

export default CourseCard;
