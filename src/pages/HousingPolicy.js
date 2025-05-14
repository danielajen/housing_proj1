import 'chartjs-adapter-date-fns';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LinearScale,
  PointElement,
} from "chart.js";

import { TimeScale, CategoryScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, LinearScale, PointElement, TimeScale, CategoryScale);

const HousingPolicy = () => {
  const [policyData, setPolicyData] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Toronto-specific vector IDs
  const TORONTO_VECTORS = [
    32164132, // Example: Toronto housing starts
    32164133, // Toronto building permits
    32164134  // Toronto housing completions
  ];

  const fetchData = async (retries = 3) => {
    try {
      const response = await axios.post(
        '/api/statcan', // Your proxy endpoint
        TORONTO_VECTORS.map(vectorId => ({
          vectorId: vectorId,
          latestN: 24 // Get last 24 months of data
        })),
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 15000
        }
      );

      if (!response.data || response.data.status !== "SUCCESS") {
        throw new Error("Failed to fetch data from StatCan");
      }

      // Process Toronto-specific data
      const processedData = {
        labels: response.data.object[0].vectorDataPoint.map(pt => 
          new Date(pt.refPer).toLocaleDateString('en-CA', { month: 'short', year: 'numeric' })
        ),
        datasets: response.data.object.map((series, idx) => ({
          label: series.vectorSymbolFr || `Series ${idx+1}`,
          data: series.vectorDataPoint.map(pt => ({
            x: new Date(pt.refPer).getTime(),
            y: Number(pt.value)
          })),
          backgroundColor: `rgba(${75 + idx*50}, ${192 - idx*30}, ${192 - idx*50}, 0.6)`,
          pointRadius: 6
        }))
      };

      setMetadata({
        title: "Toronto Housing Metrics",
        lastUpdated: response.data.object[0].modifiedDate,
        source: "Statistics Canada"
      });

      setPolicyData(processedData);
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
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <div>Loading Toronto housing data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!policyData) return <div>No data available</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Hero Section */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#1a365d",
          color: "white",
          padding: "80px 20px",
          backgroundImage: "url(/assets/main-banner.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundColor: "#1a365d", opacity: 0.7 }}></div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "20px" }}>
            Understanding Housing Policy in Canada
          </h1>
          <p style={{ fontSize: "1.25rem", marginBottom: "30px" }}>
            Learn how policies shape access to housing, who makes them, and what you can do to influence change.
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded shadow-lg">
        <Scatter 
          data={policyData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Toronto Housing Trends',
              },
            },
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'month',
                  displayFormats: {
                    month: 'MMM yyyy'
                  }
                },
                title: {
                  display: true,
                  text: 'Date'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Value'
                }
              }
            }
          }}
        />
      </div>

      {/* Policy Cards */}
      <div style={{ backgroundColor: "white", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold", marginBottom: "40px" }}>
            Housing Policy in Practice
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px"
          }}>
            {[{
              num: "01",
              title: "Federal & Provincial Roles",
              text: `Housing policy in Canada is shared between federal and provincial governments. CMHC handles funding and programs like the National Housing Strategy, while provinces manage rent regulation and zoning.`
            }, {
              num: "02",
              title: "Key Housing Programs",
              text: `The Canada Housing Benefit helps renters, while the Rapid Housing Initiative funds urgent builds. Ontario’s More Homes Built Faster Act 2023 promotes zoning reform for multi-unit buildings.`
            }, {
              num: "03",
              title: "Local Implementation & Challenges",
              text: `Municipalities approve developments, enforce building codes, and monitor homelessness. But red tape and affordability gaps slow real-world progress.`
            }].map((card, idx) => (
              <div key={idx} style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "24px", backgroundColor: "#fff" }}>
                <div style={{ fontSize: "2rem", color: "#dc2626", marginBottom: "12px" }}>{card.num}</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "10px" }}>{card.title}</h3>
                <p style={{ color: "#444" }}>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{ backgroundColor: "#f3f4f6", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold", marginBottom: "32px" }}>
            Frequently Asked Questions
          </h2>
          <div style={{ lineHeight: 1.7 }}>
            <div style={{ marginBottom: "30px" }}>
              <h4 style={{ fontWeight: "bold" }}>1. What is the National Housing Strategy?</h4>
              <p>The NHS is a 10-year, $82+ billion plan by CMHC to reduce homelessness and increase affordable housing. It includes funding for non-profits, co-ops, and municipalities.</p>
            </div>
            <div style={{ marginBottom: "30px" }}>
              <h4 style={{ fontWeight: "bold" }}>2. How does the Canada Housing Benefit work?</h4>
              <p>It provides direct rent support to eligible low-income households, delivered through provincial and territorial agreements.</p>
            </div>
            <div style={{ marginBottom: "30px" }}>
              <h4 style={{ fontWeight: "bold" }}>3. How can I participate in housing policy?</h4>
              <p>You can contact local representatives, attend city planning meetings, support tenant unions, or share housing data to raise awareness and push for evidence-based reform.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HousingPolicy;