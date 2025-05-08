import React from "react";

const FeaturedCard = ({ title, raised, goal, summary, img }) => {
  return (
    <div className="featured-card bg-white shadow-lg rounded-lg p-6">
      <img src={img} alt={title} className="w-full h-48 object-cover rounded-md mb-4" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{summary}</p> {/* Rendering the summary */}
      <div className="progress-bar mb-4">
        <div
          className="progress"
          style={{
            width: `${(raised / goal) * 100}%`,
          }}
        >
          <span className="text-sm font-semibold">{raised} / {goal}</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
