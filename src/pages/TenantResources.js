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


const TenantResources = () => {
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
            Tenant Rights & Resources
          </h1>
          <p style={{ fontSize: "1.25rem", marginBottom: "30px" }}>
            Your guide to rental protections, support services, and data-driven advocacy in Canada.
          </p>
        </div>
      </div>

      {/* Section 1: Tenant Rights */}
      <div style={{ backgroundColor: "#ffffff", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", lineHeight: 1.7 }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>Know Your Rights</h2>
          <p>
            Tenants in Canada are protected under provincial and territorial laws. These laws establish rules around rent increases, evictions, repairs, and deposits.
            You are entitled to a safe and livable home, proper notice before inspections, and protection against discrimination.
          </p>
        </div>
      </div>

      {/* Section 2: Support Services */}
      <div style={{ backgroundColor: "#f3f4f6", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", lineHeight: 1.7 }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>Support Services Across Canada</h2>
          <p>
            If you are dealing with unsafe conditions, financial hardship, or landlord conflicts, here are some resources:
          </p>
          <ul style={{ paddingLeft: "20px" }}>
            <li>📞 Local Tenant Advocacy Centers</li>
            <li>🏘️ Rent Banks and Emergency Housing Aid</li>
            <li>📋 Municipal Housing Services and Benefits</li>
            <li>⚖️ Human Rights Commissions for Discrimination Cases</li>
          </ul>
        </div>
      </div>

      {/* Section 3: Take Action */}
      <div style={{ backgroundColor: "#ffffff", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", lineHeight: 1.7 }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>Take Action and Advocate</h2>
          <p>
            Whether you're challenging rent increases or pushing for inclusive housing policy, tenant voices matter.
            Start by joining local associations, staying informed, and using this platform's data tools to support your case.
          </p>
          <p>
            Keep detailed records of all communications with landlords and explore legal help early if issues arise. Collective action has historically shaped fairer housing systems in Canada.
          </p>
        </div>
      </div>

      {/* Chart.js Placeholder */}
      <div style={{ backgroundColor: "#f9fafb", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "15px" }}>Rental Trends & Eviction Data</h2>
          <p style={{ color: "#666", marginBottom: "30px" }}>Visualizing regional tenant challenges over time using open housing datasets.</p>
          {/* TODO: Chart.js chart will be inserted here (e.g. eviction rates, rent burden) */}
          <div style={{ backgroundColor: "#e5e7eb", padding: "40px", borderRadius: "8px" }}>
            <p style={{ color: "#999" }}>[Chart Placeholder]</p>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div style={{ backgroundColor: "#ffffff", padding: "40px 20px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "0.9rem", color: "#666" }}>
            Sources: CMHC, Statistics Canada, Provincial Tenancy Acts (2023–2025)
          </p>
        </div>
      </div>
    </div>
  );
};

export default TenantResources;