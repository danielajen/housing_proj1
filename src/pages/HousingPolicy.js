// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Scatter } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   Title,
//   Tooltip,
//   Legend,
//   LinearScale,
//   PointElement,
// } from "chart.js";

// ChartJS.register(Title, Tooltip, Legend, LinearScale, PointElement);

// const HousingPolicy = () => {
//   const [policyData, setPolicyData] = useState(null);
//   const [metadata, setMetadata] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchData = async (retries = 3) => {
//     try {
//       const proxyUrl = "https://cors-anywhere.herokuapp.com/";
//       const targetUrl = "https://www150.statcan.gc.ca/t1/wds/rest/getFullTableDownloadCSV";

//       const response = await axios.get(
//         `${proxyUrl}${targetUrl}`,
//         {
//           params: {
//             pid: '36100434', // Policy impact dataset
//             fileName: 'policy-data.csv'
//           },
//           headers: {
//             "Content-Type": "application/json",
//             "X-Requested-With": "XMLHttpRequest",
//             "Origin": window.location.origin
//           },
//           responseType: 'blob',
//           timeout: 15000
//         }
//       );

//       // Process CSV data (simplified example)
//       const processedData = {
//         labels: ['Policy A', 'Policy B', 'Policy C', 'Policy D'],
//         datasets: [{
//           label: 'Policy Impact',
//           data: [
//             { x: 10, y: 15 },
//             { x: 15, y: 12 },
//             { x: 8, y: 18 },
//             { x: 20, y: 8 }
//           ],
//           backgroundColor: 'rgba(75, 192, 192, 0.6)'
//         }]
//       };

//       setMetadata({
//         title: "Housing Policy Impact Analysis",
//         lastUpdated: new Date().toISOString().split('T')[0],
//         description: "Measures effectiveness of housing policies"
//       });

//       setPolicyData(processedData);
//       setLoading(false);
//     } catch (error) {
//       if (error.response?.status === 429 && retries > 0) {
//         setError(`Rate limited - retrying in 2 seconds (${retries} left)`);
//         await new Promise(resolve => setTimeout(resolve, 2000));
//         return fetchData(retries - 1);
//       }
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => { 
//     fetchData(); 
//   }, []);

//   if (loading) return <div>Loading policy impact data...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!policyData) return <div>No data available</div>;

//   return (
//     <div className="flex flex-col">
//       <div className="flex justify-center items-start w-full h-[320px] bg-purple-800 p-5">
//         <div className="flex flex-col w-[90%] md:w-[50%] h-full justify-around text-center text-gray-100">
//           <h1 className="text-4xl md:text-6xl tracking-tighter font-sans">
//             Housing Policy Impact
//           </h1>
//           <p className="text-gray-200">
//             Evaluating effectiveness of government housing policies
//           </p>
//         </div>
//       </div>

//       <div className="w-full bg-white py-10">
//         <div className="max-w-5xl mx-auto">
//           {metadata && (
//             <div className="mb-8 p-4 bg-purple-50 rounded-lg">
//               <h4 className="font-bold">Dataset Information</h4>
//               <p>Title: {metadata.title}</p>
//               <p>Last Updated: {metadata.lastUpdated}</p>
//               <p>Description: {metadata.description}</p>
//             </div>
//           )}

//           <div className="bg-white p-6 rounded shadow-lg">
//             <Scatter 
//               data={policyData}
//               options={{
//                 responsive: true,
//                 plugins: {
//                   title: {
//                     display: true,
//                     text: 'Policy Investment vs. Affordability Improvement',
//                     font: { size: 16 }
//                   },
//                 },
//                 scales: {
//                   x: {
//                     title: {
//                       display: true,
//                       text: 'Investment (Millions $)'
//                     }
//                   },
//                   y: {
//                     title: {
//                       display: true,
//                       text: 'Affordability Improvement (%)'
//                     }
//                   }
//                 }
//               }}
//             />
//           </div>

//           <section className="mt-8 p-6 bg-purple-50 rounded-lg">
//             <h3 className="text-xl font-bold mb-3">Policy Effectiveness</h3>
//             <p className="mb-4">
//               This analysis compares government spending on housing policies with their measurable impact on affordability.
//               Effective policies appear in the top-left quadrant (lower cost, higher impact), while less effective policies
//               appear in the bottom-right.
//             </p>
//             <footer className="text-sm text-gray-600">
//               Source: Canada Mortgage and Housing Corporation, {new Date().getFullYear()}.
//             </footer>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HousingPolicy;

import React from "react";

const HousingPolicy = () => {
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
            Understanding Housing Policy in Canada
          </h1>
          <p style={{ fontSize: "1.25rem", marginBottom: "30px" }}>
            Learn how policies shape access to housing, who makes them, and what you can do to influence change.
          </p>
        </div>
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

