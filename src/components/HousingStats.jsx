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

// Register the necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const HousingStats = () => {
  const [vacancyData, setVacancyData] = useState(null);  // State to store the chart data
  const [loading, setLoading] = useState(true);  // State to manage the loading status
  const [error, setError] = useState(null);  // State to handle errors

  // The fetchData function to get data from the API
  const fetchData = async () => {
    try {
      // Make an API request to get the vacancy data
      const response = await axios.post(
        'https://www150.statcan.gc.ca/t1/wds/rest/getDataFromCubePidCoordAndLatestNPeriods?lang=en',
        [{
          productId: '3410013101',  // Correct productId for vacancy rates
          coordinate: '0.0.0.0.0.0.0.0.0.0',  // Example coordinate
          latestN: 5  // Get the data for the last 5 periods
        }]
      );

      console.log(response);  // Log the response to check its structure

      // Ensure that the response data contains the expected information
      const series = response.data[0]?.object?.vectorDataPoint;

      // Check if the series data is available, otherwise handle the error
      if (!series || series.length === 0) {
        console.error("No vacancy data found");
        setVacancyData(null);  // Explicitly handle the case of no data
        setLoading(false);
        return;
      }

      // Map the response data to chart-friendly format
      const chartData = series.map(pt => ({
        x: pt.refPer,  // Reference period (e.g., date or year)
        y: Number(pt.value),  // Vacancy rate value
      }));

      // Format the data for Chart.js
      const formattedData = {
        labels: chartData.map(item => item.x),  // Labels for the X-axis (e.g., "2023-01")
        datasets: [
          {
            label: "Vacancy Rate",  // Label for the dataset
            data: chartData.map(item => item.y),  // Y-axis data (vacancy rates)
            borderColor: "rgba(75, 192, 192, 1)",  // Line color
            backgroundColor: "rgba(75, 192, 192, 0.2)",  // Background color
            fill: true,  // Fill the area under the line
          },
        ],
      };

      setVacancyData(formattedData);  // Set the chart data in state
      setLoading(false);  // Stop the loading state
    } catch (error) {
      console.error("Error fetching vacancy rate data:", error);  // Log any error that occurs
      setError("Error fetching data. Please try again later.");  // Set an error message
      setLoading(false);  // Stop the loading state
    }
  };

  // Fetch the data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);  // Empty dependency array means this will run once when the component mounts

  if (loading) return <div>Loading vacancy rate data...</div>;  // Show loading message while fetching data
  if (error) return <div>{error}</div>;  // Show error message if there's an error fetching data
  if (!vacancyData || vacancyData.labels.length === 0) return <div>No data available</div>;  // Handle case of no data

  return (
    <div>
      <h2>Vacancy Rate Stats: Last 5 Periods</h2>
      <div style={{ width: "90%", maxWidth: "1000px", margin: "auto" }}>
        {/* Render the chart using the data from the state */}
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

export default HousingStats;
