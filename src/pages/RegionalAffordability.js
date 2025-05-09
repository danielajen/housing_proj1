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

const RegionalAffordability = () => {
  const [affordabilityData, setAffordabilityData] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (retries = 3) => {
    try {
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const targetUrl = "https://www150.statcan.gc.ca/t1/wds/rest/getDataFromCubePidCoord";

      const response = await axios.get(
        `${proxyUrl}${targetUrl}`,
        {
          params: {
            pid: '17100005', // Housing Economic Account
            coordinate: '1.1.1.1.1' // Specific coordinate for affordability data
          },
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "Origin": window.location.origin
          },
          timeout: 15000
        }
      );

      if (!response.data?.object) {
        throw new Error("API request failed");
      }

      const series = response.data.object.vectorDataPoint;
      setMetadata({
        title: response.data.object.cubeTitle.en,
        frequency: series[0]?.frequencyCode || "Annual",
        geography: "Canada by Province"
      });

      setAffordabilityData({
        labels: series.map(item => item.refPer),
        datasets: [{
          label: "Affordability Ratio (Income/Housing Costs)",
          data: series.map(item => Number(item.value)),
          borderColor: "#e63946",
          backgroundColor: "rgba(230, 57, 70, 0.1)",
          fill: true,
          tension: 0.3
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

  if (loading) return <div>Loading affordability data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!affordabilityData) return <div>No data available</div>;

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-start w-full h-[320px] bg-green-800 p-5">
        <div className="flex flex-col w-[90%] md:w-[50%] h-full justify-around text-center text-gray-100">
          <h1 className="text-4xl md:text-6xl tracking-tighter font-sans">
            Regional Housing Affordability
          </h1>
          <p className="text-gray-200">
            Comparing housing costs to incomes across Canadian regions
          </p>
        </div>
      </div>

      <div className="w-full bg-white py-10">
        <div className="max-w-5xl mx-auto">
          {metadata && (
            <div className="mb-8 p-4 bg-green-50 rounded-lg">
              <h4 className="font-bold">Dataset Information</h4>
              <p>Title: {metadata.title}</p>
              <p>Frequency: {metadata.frequency}</p>
              <p>Geography: {metadata.geography}</p>
            </div>
          )}

          <div className="bg-white p-6 rounded shadow-lg">
            <Line 
              data={affordabilityData}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: 'Housing Affordability Trends',
                    font: { size: 16 }
                  },
                },
                scales: {
                  y: {
                    beginAtZero: false,
                    title: {
                      display: true,
                      text: 'Affordability Ratio'
                    }
                  }
                }
              }}
            />
          </div>

          <section className="mt-8 p-6 bg-green-50 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Understanding Affordability</h3>
            <p className="mb-4">
              The affordability ratio compares median housing costs to median household incomes.
              Values below 1.0 indicate households spending more than 30% of income on housing,
              signaling affordability challenges in that region.
            </p>
            <footer className="text-sm text-gray-600">
              Source: Statistics Canada, {new Date().getFullYear()}.
            </footer>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RegionalAffordability;