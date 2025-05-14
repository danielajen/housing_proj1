import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RegionalAffordability = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/statcan", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify([
            { vectorId: 128597, latestN: 1 }, // Vancouver CMA
            { vectorId: 128598, latestN: 1 }, // Toronto CMA
            { vectorId: 128599, latestN: 1 }, // Montreal CMA
            { vectorId: 128600, latestN: 1 }  // Halifax CMA
          ])
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const responseData = await response.json();

        if (!Array.isArray(responseData) || responseData.some(d => d.status !== "SUCCESS")) {
          throw new Error('Invalid API response structure');
        }

        const cityNames = ["Vancouver CMA", "Toronto CMA", "Montreal CMA", "Halifax CMA"];

        const processedData = responseData.map((item, index) => {
          const point = item.object.vectorDataPoint?.[0];
          return {
            city: cityNames[index],
            value: point ? Number(point.value) : 0
          };
        });

        setChartData({
          labels: processedData.map(d => d.city),
          datasets: [{
            label: 'Shelter-cost-to-income ratio (median)',
            data: processedData.map(d => d.value),
            backgroundColor: 'rgba(26, 52, 93, 0.7)',
            borderColor: 'rgba(26, 52, 93, 1)',
            borderWidth: 1
          }]
        });
      } catch (err) {
        setError(err.message);
        console.error('Data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Median Shelter-Cost-to-Income Ratio by CMA',
        font: { size: 18 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { 
          display: true, 
          text: 'Shelter-Cost-to-Income Ratio (%)',
          font: { weight: 'bold' }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Census Metropolitan Area (CMA)',
          font: { weight: 'bold' }
        }
      }
    }
  };

  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div style={{
        width: "100%",
        backgroundColor: "#1a365d",
        color: "white",
        padding: "80px 20px",
        backgroundImage: "url(/assets/main-banner.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative"
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#1a365d",
          opacity: 0.7
        }}></div>

        <div style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1000px",
          margin: "0 auto",
          textAlign: "center"
        }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "20px" }}>
            Regional Housing Affordability
          </h1>
          <p style={{ fontSize: "1.25rem", lineHeight: "1.7" }}>
            Comparing housing costs to incomes across Canadian provinces and territories.
          </p>
        </div>
      </div>

      <div className="w-full bg-white py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">
            Visualizing Affordability Trends
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            This page will feature interactive charts comparing regional housing affordability
            based on current data from Statistics Canada and CMHC.
            Data will reflect affordability ratios (housing cost vs household income) over time.
          </p>

          {/* Chart Integration */}
          <div className="bg-gray-100 p-8 rounded shadow-md mb-10">
            <div style={{ position: "relative", width: "100%", height: "400px" }}>
              {loading ? (
                <p className="text-gray-500">Loading chart...</p>
              ) : error ? (
                <p className="text-red-500">Error: {error}</p>
              ) : (
                <Bar data={chartData} options={chartOptions} />
              )}
            </div>
          </div>

          <section className="text-left bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Why Regional Affordability Matters</h3>
            <p className="mb-4">
              Affordability differs widely between regions. A city like Vancouver may show affordability ratios above 0.35,
              while Atlantic provinces may show lower pressure. Understanding this helps:
            </p>
            <ul className="list-disc ml-5 text-gray-700 space-y-2">
              <li>Track how housing prices evolve compared to income.</li>
              <li>Support policy and zoning decisions at the local level.</li>
              <li>Provide tools for advocacy in high-pressure markets.</li>
            </ul>
            <p className="text-sm text-gray-600 mt-6">
              Source: CMHC & Statistics Canada ({new Date().getFullYear()})
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RegionalAffordability;
