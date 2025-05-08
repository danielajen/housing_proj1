import axios from "axios";
import React, { useEffect, useState } from "react";
import FeaturedCard from "./FeaturedCard";

const FeaturedCauses = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getCauses = async () => {
      const res = await axios.get("http://localhost:8000/causes");
      setData(res.data);
    };
    getCauses();
  }, []);

  return (
    <section className="feature-section mb-20 px-6 md:px-16">
      <div className="text-4xl font-bold mb-6 text-center">
        FEATURED <span className="text-red-500">CAUSES</span>
      </div>

      <p className="text-lg text-gray-700 mb-6 text-center max-w-4xl mx-auto">
        Canada’s housing crisis is not just about a shortage of units—it’s a
        deeper problem of affordability, data transparency, and inequality. Many
        dashboards are behind paywalls or ignore Indigenous, disabled, and
        racialized communities. We’re building a free, open, and regularly
        updated housing tool that bridges data and lived experience.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {data.map((cause) => (
          <FeaturedCard
            key={cause.title}
            title={cause.title}
            summary={cause.summary}
            img={cause.photourl}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedCauses;
