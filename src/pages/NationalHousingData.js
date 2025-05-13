// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   Title,
//   Tooltip,
//   Legend,
//   BarElement,
//   CategoryScale,
//   LinearScale,
// } from "chart.js";

// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// const NationalHousingData = () => {
//   const [housingData, setHousingData] = useState(null);
//   const [metadata, setMetadata] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchData = async (retries = 3) => {
//     try {
//       const proxyUrl = "https://cors-anywhere.herokuapp.com/";
//       const targetUrl = "https://www150.statcan.gc.ca/t1/wds/rest/getBulkVectorDataByRange";

//       const response = await axios.get(
//         `${proxyUrl}${targetUrl}`,
//         {
//           params: {
//             vectorIds: 'v12345678,v12345679,v12345680', // Actual vector IDs for housing starts
//             startDate: '2018-01-01',
//             endDate: '2023-01-01'
//           },
//           headers: {
//             "Content-Type": "application/json",
//             "X-Requested-With": "XMLHttpRequest",
//             "Origin": window.location.origin
//           },
//           timeout: 15000
//         }
//       );

//       if (!response.data) {
//         throw new Error("API request failed");
//       }

//       // Process response data
//       const processedData = response.data.map(item => ({
//         vectorId: item.vectorId,
//         data: item.vectorDataPoint.map(pt => ({
//           x: pt.refPer,
//           y: Number(pt.value)
//         }))
//       }));

//       setMetadata({
//         title: "National Housing Starts",
//         lastUpdated: new Date().toISOString().split('T')[0],
//         sources: "Statistics Canada, CMHC"
//       });

//       setHousingData({
//         labels: processedData[0].data.map(item => item.x),
//         datasets: processedData.map((series, idx) => ({
//           label: `Housing Type ${idx+1}`,
//           data: series.data.map(item => item.y),
//           backgroundColor: `rgba(${75 + idx*50}, ${192 - idx*30}, ${192 - idx*50}, 0.6)`,
//           borderColor: `rgba(${75 + idx*50}, ${192 - idx*30}, ${192 - idx*50}, 1)`,
//           borderWidth: 1
//         }))
//       });

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

//   if (loading) return <div>Loading national housing data...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!housingData) return <div>No data available</div>;

//   return (
//     <div className="flex flex-col">
//       <div className="flex justify-center items-start w-full h-[320px] bg-blue-800 p-5">
//         <div className="flex flex-col w-[90%] md:w-[50%] h-full justify-around text-center text-gray-100">
//           <h1 className="text-4xl md:text-6xl tracking-tighter font-sans">
//             National Housing Construction
//           </h1>
//           <p className="text-gray-200">
//             Tracking new housing starts across Canada
//           </p>
//         </div>
//       </div>

//       <div className="w-full bg-white py-10">
//         <div className="max-w-5xl mx-auto">
//           {metadata && (
//             <div className="mb-8 p-4 bg-blue-50 rounded-lg">
//               <h4 className="font-bold">Dataset Information</h4>
//               <p>Title: {metadata.title}</p>
//               <p>Last Updated: {metadata.lastUpdated}</p>
//               <p>Sources: {metadata.sources}</p>
//             </div>
//           )}

//           <div className="bg-white p-6 rounded shadow-lg">
//             <Bar 
//               data={housingData}
//               options={{
//                 responsive: true,
//                 plugins: {
//                   title: {
//                     display: true,
//                     text: 'Housing Starts by Type',
//                     font: { size: 16 }
//                   },
//                 },
//                 scales: {
//                   y: {
//                     beginAtZero: true,
//                     title: {
//                       display: true,
//                       text: 'Number of Units'
//                     }
//                   }
//                 }
//               }}
//             />
//           </div>

//           <section className="mt-8 p-6 bg-blue-50 rounded-lg">
//             <h3 className="text-xl font-bold mb-3">About Housing Starts</h3>
//             <p className="mb-4">
//               Housing starts represent the number of new residential construction projects begun each month.
//               This data helps identify whether housing supply is keeping pace with population growth and demand.
//             </p>
//             <footer className="text-sm text-gray-600">
//               Source: Statistics Canada, {new Date().getFullYear()}.
//             </footer>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NationalHousingData;



import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   Title,
//   Tooltip,
//   Legend,
//   BarElement,
//   CategoryScale,
//   LinearScale,
// } from "chart.js";

// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const NationalHousingData = () => {
  // API fetch and chart rendering to be implemented by teammate

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      {/* <div
        className="flex justify-center items-start w-full h-[320px] bg-blue-900 text-white p-5"
        style={{ backgroundImage: "url(/assets/main-banner.png)", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="flex flex-col w-[90%] md:w-[50%] h-full justify-around text-center">
          <h1 className="text-4xl md:text-6xl tracking-tighter font-sans">
            National Housing Construction
          </h1>
          <p className="text-blue-100">
            A national look at how many housing units are being built across Canada.
          </p>
        </div>
      </div> */}

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
  {/* Overlay */}
  <div style={{
    position: "absolute",
    inset: 0,
    backgroundColor: "#1a365d",
    opacity: 0.7
  }}></div>

  {/* Content */}
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


      {/* Info Section */}
      <div className="w-full bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">
            Tracking Canada's Housing Starts
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Housing starts are a key metric in understanding whether the construction of new homes
            is keeping up with the needs of the population. This data comes from Statistics Canada
            and CMHC, and includes single-detached homes, multi-unit buildings, and purpose-built rentals.
          </p>

          {/* Chart Placeholder */}
          <div className="bg-gray-100 p-8 rounded shadow-md mb-10">
            {/* TODO: Chart.js Bar graph will be inserted here */}
            <p className="text-gray-500">[Chart Placeholder ]</p>
          </div>

          {/* Summary Section */}
          <div className="p-6 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Why It Matters</h3>
            <p className="mb-3">
              New home construction is not only a sign of economic vitality, but it also reflects how cities are
              preparing for population growth, immigration, and affordability needs. Cities like Toronto and Vancouver
              have seen significant investment, yet demand still outpaces supply.
            </p>
            <p className="mb-3">
              This page will eventually display up-to-date construction figures by province and unit type, allowing you
              to compare development patterns over time.
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
