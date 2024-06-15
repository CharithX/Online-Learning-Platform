// EnrollmentCard.js
import React from "react";

const EnrollmentCard = ({ enrollment }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-xl font-bold">{enrollment.name}</h3>
      <p className="text-gray-600">Enrolled On: {enrollment.date}</p>
    </div>
  );
};

export default EnrollmentCard;
