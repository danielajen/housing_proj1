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

const VacancyStats = () => {
  const [vacancyData, setVacancyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://www150.statcan.gc.ca/t1/wds/rest/getDataFromCubePidCoordAndLatestNPeriods?lang=en',
          [{
            productId: '3410013101',  // Correct productId for vacancy rates
            coordinate: '0.0.0.0.0.0.0.0.0.0',  // Example coordinate
            latestN: 5
          }]
        );

        const series = response.data[0].object.vectorDataPoint;
        const chartData = series.map(pt => ({
          x: pt.refPer,
          y: Number(pt.value),
        }));

        // Format the data for Chart.js
        const formattedData = {
          labels: chartData.map(item => item.x), // e.g., "2023-01"
          datasets: [
            {
              label: "Vacancy Rate",
              data: chartData.map(item => item.y),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
            },
          ],
        };

        setVacancyData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vacancy rate data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading vacancy rate data...</div>;
  if (!vacancyData || vacancyData.labels.length === 0) return <div>No data available</div>;

  return (
    <div>
      <h2>Vacancy Rate Stats: Last 5 Years</h2>
      <div style={{ width: "90%", maxWidth: "1000px", margin: "auto" }}>
        <Line data={vacancyData} />
      </div>

      <section style={{ marginTop: "40px", padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h3>Why This Data Matters</h3>
        <p>
          Vacancy rates are a crucial indicator of the health of the housing market. A high vacancy rate typically
          indicates an oversupply of housing, while a low vacancy rate can signal a housing shortage or high demand.
          Tracking this data helps us understand the dynamics of housing availability and informs policy decisions.
        </p>

        <h3>How to Use This Chart</h3>
        <p>
          Hover over any data point to see the vacancy rate for that specific period. Use this data to compare trends
          over time, identify patterns, and analyze changes in housing availability.
        </p>
      </section>
    </div>
  );
};

export default VacancyStats;
