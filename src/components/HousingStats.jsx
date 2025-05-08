// HousingStats.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

// Register chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const HousingStats = () => {
  const [housingData, setHousingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www150.statcan.gc.ca/t1/wds/rest/getDataFromCubePidAndLatestNPeriods",
          {
            params: {
              cubePid: "36100347", // Housing Starts
              nPeriods: 5,
            },
          }
        );

        const formattedData = formatData(response.data);
        setHousingData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching housing data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format data safely
  const formatData = (data) => {
    const dataArray = data?.object;

    if (!Array.isArray(dataArray)) {
      console.error("Unexpected API response format:", data);
      return {
        labels: [],
        datasets: [],
      };
    }

    const labels = dataArray.map((item) => item.period);
    const values = dataArray.map((item) => item.value);

    return {
      labels,
      datasets: [
        {
          label: "Housing Starts",
          data: values,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
      ],
    };
  };

  if (loading) return <div>Loading housing data...</div>;
  if (!housingData) return <div>No data available</div>;

  return (
    <div>
      <h2>Housing Stats - Housing Starts (Latest Data)</h2>
      <div style={{ width: "80%", margin: "auto" }}>
        <Line data={housingData} />
      </div>
    </div>
  );
};

export default HousingStats;
