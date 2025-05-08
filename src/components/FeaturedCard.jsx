import React from "react";
import { useNavigate } from "react-router-dom";

const FeaturedCard = ({ raised, goal, title, img }) => {
  const nav = useNavigate();
  const perc = raised > 0 ? Math.min(Math.round((raised / goal) * 100), 100) : 0;

  return (
    <div className="border rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition duration-200">
      <div className="relative h-48 w-full bg-gray-200">
        <img src={img} alt={title} className="object-cover w-full h-full" />
        <div className="absolute bottom-0 left-0 w-full bg-red-100">
          <div className="h-2 bg-red-500" style={{ width: `${perc}%` }}></div>
        </div>
      </div>
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-2">
          Raised: ${raised.toLocaleString()} / Goal: ${goal.toLocaleString()}
        </div>
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <button
          onClick={() => nav("/causes")}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Donate Now
        </button>
      </div>
    </div>
  );
};

export default FeaturedCard;
