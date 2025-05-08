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

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const HousingStats = () => {
  const [vacancyData, setVacancyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      // Use CORS proxy to avoid network errors
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const apiUrl = "https://www150.statcan.gc.ca/t1/wds/rest/getDataFromVector?lang=en";
      
      const response = await axios.post(
        proxyUrl + apiUrl,
        [{
          vectorId: "v111955442", // Toronto-specific vacancy rate
          latestN: 5 // Match the "Last 5 Periods" title
        }],
        {
          headers: {
            "Content-Type": "application/json",
            "apikey": "00000000-0000-0000-0000-000000000000" // Public demo key
          }
        }
      );

      // Validate response structure
      if (!response.data?.[0]?.object?.vectorDataPoint) {
        throw new Error("Invalid API response structure");
      }

      const series = response.data[0].object.vectorDataPoint;

      // Transform data
      const chartData = series.map(pt => ({
        x: pt.refPer.replace(/(\d{4})(\d{2})/, "$1-Q$2"), // Format date as YYYY-QQ
        y: Number(pt.value)
      }));

      setVacancyData({
        labels: chartData.map(item => item.x),
        datasets: [{
          label: "Toronto Rental Vacancy Rate (%)",
          data: chartData.map(item => item.y),
          borderColor: "#4bc0c0",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
          tension: 0.4
        }]
      });
      
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Keep original return structure
  if (loading) return <div>Loading vacancy rate data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!vacancyData) return <div>No data available</div>;

  return (
    <div>
      <h2>Vacancy Rate Stats: Last {vacancyData.labels.length} Periods</h2>
      <div style={{ width: "90%", maxWidth: "1000px", margin: "auto" }}>
        <Line 
          data={vacancyData}
          options={{
            plugins: {
              legend: { position: "top" },
              tooltip: { enabled: true }
            },
            scales: {
              y: { beginAtZero: true }
            }
          }}
        />
      </div>

      {/* Maintain existing info section */}
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

      {/* Required attribution */}
      <footer style={{ marginTop: "20px", fontSize: "0.9em", color: "#666" }}>
        Source: Statistics Canada, Rental Market Survey, {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default HousingStats;