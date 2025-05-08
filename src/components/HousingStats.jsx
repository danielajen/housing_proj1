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
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (retries = 3) => {
    try {
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const targetUrl = "https://www150.statcan.gc.ca/t1/wds/rest/getDataFromVectorsAndLatestNPeriods";

      const response = await axios.post(
        `${proxyUrl}${targetUrl}`,
        [{
          vectorId: '111955442',
          latestN: 5
        }],
        {
          headers: {
            "Content-Type": "application/json",
            "apikey": "00000000-0000-0000-0000-000000000000",
            // Required for Heroku CORS Anywhere:
            "X-Requested-With": "XMLHttpRequest",
            "Origin": window.location.origin
          },
          timeout: 15000
        }
      );

      

      if (response.data?.[0]?.status !== "SUCCESS") {
        throw new Error(response.data?.[0]?.error || "API request failed");
      }

      const { vectorDataPoint: series, vector: vectorInfo } = response.data[0].object;

      setMetadata({
        frequency: vectorInfo.frequencyCode,
        geography: vectorInfo.geographyEn,
        lastUpdated: series[0]?.refPer || "N/A"
      });

      const chartData = series.map(pt => ({
        x: pt.refPer.length === 6 ? 
           pt.refPer.replace(/(\d{4})(\d{2})/, "$1-Q$2") : 
           pt.refPer,
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
      if (error.response?.status === 429 && retries > 0) {
        setError(`Rate limited - retrying in 2 seconds (${retries} left)`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        return fetchData(retries - 1);
      }
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, []);

  if (loading) return <div>Loading vacancy rate data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!vacancyData) return <div>No data available</div>;

  return (
    <div>
      <h2>Vacancy Rate Stats: Last {vacancyData.labels.length} Periods</h2>
      
      {metadata && (
        <div style={{ margin: "20px 0", padding: "15px", backgroundColor: "#f0f8ff", borderRadius: "8px" }}>
          <h4>Dataset Information</h4>
          <p>Frequency: {metadata.frequency}</p>
          <p>Geography: {metadata.geography}</p>
          <p>Last Update: {metadata.lastUpdated}</p>
        </div>
      )}

      <div style={{ width: "90%", maxWidth: "1000px", margin: "auto" }}>
        <Line 
          data={vacancyData}
          options={{
            plugins: {
              title: { 
                display: true, 
                text: "Vacancy Rate Trend",
                font: { size: 16 }
              },
              legend: {
                position: 'top'
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Percentage (%)'
                }
              }
            }
          }}
        />
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
          over time, identify patterns, and analyze changes in housing availability. Click and drag to zoom in on
          specific time periods, and double-click to reset the view.
        </p>
      </section>

      <footer style={{ 
        marginTop: "20px", 
        padding: "10px",
        fontSize: "0.9em", 
        color: "#666",
        borderTop: "1px solid #ddd"
      }}>
        Source: Statistics Canada, Rental Market Survey, {new Date().getFullYear()}. 
        This reproduction is a copy of an official work that is published by Statistics Canada and 
        has not been produced in affiliation with, or with the endorsement of Statistics Canada.
      </footer>
    </div>
  );
};

export default HousingStats;