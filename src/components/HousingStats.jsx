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
              nPeriods: 36, // Last 3 years of monthly data
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

  // Format the data for the chart
  const formatData = (data) => {
    const series = data?.object?.dataSeries;

    if (!Array.isArray(series)) {
      console.error("Unexpected API response format:", data);
      return {
        labels: [],
        datasets: [],
      };
    }

    const labels = series.map((item) => item.refPer); // e.g., "2023-01"
    const values = series.map((item) => item.value);

    return {
      labels,
      datasets: [
        {
          label: "Monthly Housing Starts (Canada)",
          data: values,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
      ],
    };
  };

  if (loading) return <div>Loading housing data...</div>;
  if (!housingData || housingData.labels.length === 0) return <div>No data available</div>;

  return (
    <div>
      <h2>Housing Stats: Monthly Housing Starts (Last 3 Years)</h2>
      <div style={{ width: "90%", maxWidth: "1000px", margin: "auto" }}>
        <Line data={housingData} />
      </div>

      <section style={{ marginTop: "40px", padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h3>Why This Data Matters</h3>
        <p>
          Housing starts represent the number of new residential construction projects begun over a given period.
          Tracking this indicator helps reveal trends in housing supply, economic health, and regional development
          activity. By using real-time data from Statistics Canada, we aim to provide actionable insight into
          Canada’s housing challenges and progress.
        </p>

        <h3>How to Use This Chart</h3>
        <p>
          Hover over any data point to see the number of housing starts in that specific month. Use this data to
          compare trends over time, identify spikes or declines in development, and inform policy or investment decisions.
        </p>
      </section>
    </div>
  );
};

export default HousingStats;
