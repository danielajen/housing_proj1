import React from "react";

const FeaturedCard = ({ title, summary, img }) => {
  return (
    <div className="featured-card bg-white shadow-lg rounded-lg p-6">
      <img
        src={img}
        alt={title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p
        className="text-gray-600 mb-4"
        style={{ fontSize: "0.875rem", lineHeight: "1.4", color: "#333" }}
      >
        {summary}
      </p> {/* Rendering the summary */}
    </div>
  );
};

export default FeaturedCard;

