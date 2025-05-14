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

const NationalHousingData = () => {
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
          body: JSON.stringify([{
            vectorId: 32164132,
            latestN: 12
          }])
        });
      
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const responseData = await response.json();
        
        if (!Array.isArray(responseData) || responseData[0]?.status !== "SUCCESS") {
          throw new Error('Invalid API response structure');
        }
      
        const { vectorDataPoint } = responseData[0].object;
        
        if (!vectorDataPoint?.length) {
          throw new Error('No housing data available');
        }
      
        const processedData = vectorDataPoint.reverse().map(item => ({
          date: new Date(item.refPer).toLocaleDateString('en-CA', {
            year: 'numeric',
            month: 'short'
          }),
          value: Number(item.value)
        }));
        
        setChartData({
          labels: processedData.map(d => d.date),
          datasets: [{
            label: 'Vancouver Housing Starts',
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
    }; // Added missing function closure

    fetchData();
  }, []);


  // Chart configuration
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Vancouver Monthly Housing Starts',
        font: { size: 18 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { 
          display: true, 
          text: 'Number of Units',
          font: { weight: 'bold' }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Reporting Period',
          font: { weight: 'bold' }
        }
      }
    }
  };

  return (
    <div className="flex flex-col">
      {/* Cleaned up hero section (remove duplicate) */}
      <div style={{
        width: "100%",
        backgroundColor: "#1a365d",
        color: "white",
        padding: "80px 20px",
        backgroundImage: "url(/assets/main-banner.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
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
            National Housing Construction
          </h1>
          <p style={{ fontSize: "1.25rem", lineHeight: "1.7" }}>
            A national look at how many housing units are being built across Canada.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">
            Tracking Canada's Housing Starts
          </h2>

          {/* Chart Section */}
          <div className="bg-gray-100 p-8 rounded shadow-md mb-10">
      {loading && <p className="text-gray-600 text-center">Loading housing data...</p>}
      {error && (
        <div className="text-red-500 text-center">
          <p>Error: {error}</p>
          <p className="text-sm mt-2">
            Please try refreshing the page or contact support
          </p>
        </div>
      )}
      
      {chartData && !error && (
        <div className="relative h-96">
          <Bar 
            data={chartData} 
            options={chartOptions}
          />
          <p className="text-sm text-gray-600 mt-4 text-center">
            Source: Statistics Canada - Vector ID 32164132 (Vancouver CMA)
          </p>
        </div>
      )}
    </div>


          {/* Summary Section */}
          <div className="p-6 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Why It Matters</h3>
            <p className="mb-3">
              New home construction reflects how cities are preparing for population growth and 
              affordability needs. Vancouver continues to see strong demand despite increased construction.
            </p>
            <p className="text-sm text-gray-600">
              Source: Statistics Canada & CMHC, {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NationalHousingData;