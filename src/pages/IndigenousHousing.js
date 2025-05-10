import React from "react";
// import axios from "axios";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   Title,
//   Tooltip,
//   Legend,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
// } from "chart.js";

// ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);


const IndigenousHousing = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            Indigenous Housing in Canada
          </h1>
          <p style={{ fontSize: "1.25rem", marginBottom: "30px" }}>
            Understanding the challenges, data gaps, and solutions surrounding Indigenous housing.
          </p>
        </div>
      </div>

      {/* Context Section */}
      <div style={{ backgroundColor: "#ffffff", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", lineHeight: 1.7 }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>Why Focus on Indigenous Housing?</h2>
          <p>
            Indigenous Peoples in Canada—First Nations, Inuit, and Métis—face unique housing challenges both on- and off-reserve. These challenges include overcrowding, poor infrastructure, lack of affordable options, and jurisdictional gaps in funding and policy. The 2021 Census noted over 1 in 5 Indigenous people live in homes needing major repairs.
          </p>
        </div>
      </div>

      {/* Card Grid Section */}
      <div style={{ backgroundColor: "#f3f4f6", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "30px", textAlign: "center" }}>
            Key Issues in Indigenous Housing
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px"
          }}>
            {[{
              title: "Overcrowding & Repairs",
              text: "Indigenous households are 3x more likely to experience overcrowding and require urgent repairs compared to the non-Indigenous population."
            }, {
              title: "On- vs Off-Reserve Disparities",
              text: "On-reserve housing is federally funded, while off-reserve housing falls under provincial/municipal systems—creating funding gaps."
            }, {
              title: "Urban Indigenous Housing",
              text: "More than half of Indigenous people live in urban areas. Many struggle to access culturally appropriate, affordable housing."
            }].map((item, idx) => (
              <div key={idx} style={{ backgroundColor: "#fff", padding: "24px", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "12px", color: "#1a365d" }}>{item.title}</h3>
                <p style={{ color: "#444" }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div style={{ backgroundColor: "#ffffff", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "15px" }}>
            Data Visualization Coming Soon
          </h2>
          <p style={{ color: "#666", marginBottom: "30px" }}>
            Our team will display housing adequacy rates, overcrowding stats, and regional breakdowns for Indigenous communities.
          </p>
          {/* TODO: Chart.js bar or map will be inserted here */}
          <div style={{ backgroundColor: "#e5e7eb", padding: "40px", borderRadius: "8px" }}>
            <p style={{ color: "#999" }}>[Chart Placeholder]</p>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div style={{ backgroundColor: "#f9fafb", padding: "40px 20px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "0.9rem", color: "#666" }}>
            Sources: CMHC, Indigenous Services Canada, Statistics Canada Census (2021–2025)
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndigenousHousing;
