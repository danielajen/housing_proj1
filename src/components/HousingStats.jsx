import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from "chart.js";

// Registering Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const HousingStats = () => {
  const [housingData, setHousingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Real API URL
        const response = await axios.get(
          'https://www150.statcan.gc.ca/t1/wds/rest/getDataFromCubePidAndLatestNPeriods',
          {
            params: {
              cubePid: "36100347", // Cube ID for Housing Starts, you can replace with any other cube ID
              nPeriods: 5, // Number of latest periods (e.g., last 5 periods)
            }
          }
        );

        const data = response.data; // Raw data from StatsCan API
        const formattedData = formatData(data); // Transform the data into something usable
        setHousingData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format the data for charting (simple example)
  const formatData = (data) => {
    const labels = data.dataSeries.map(item => item.period); // Get periods for the x-axis
    const values = data.dataSeries.map(item => item.value); // Get corresponding values for the y-axis

    return {
      labels,
      datasets: [
        {
          label: 'Housing Starts',
          data: values,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        }
      ]
    };
  };

  if (loading) {
    return <div>Loading housing data...</div>;
  }

  return (
    <div>
      <h2>Housing Stats - Housing Starts (Latest Data)</h2>
      <div style={{ width: '80%', margin: 'auto' }}>
        <Line data={housingData} />
      </div>
    </div>
  );
};

export default HousingStats;
