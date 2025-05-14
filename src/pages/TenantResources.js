import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend 
} from 'chart.js';

// Separate registrations for bar/line charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const lineChartPlugins = [
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
];
ChartJS.register(...lineChartPlugins);

const TenantResources = () => {
  const [investmentData, setInvestmentData] = useState(null);
  const [mortgageData, setMortgageData] = useState(null);
  const [rentGrowthData, setRentGrowthData] = useState(null);
  const [currentRentData, setCurrentRentData] = useState(null);
  const [evictionData, setEvictionData] = useState(null);
  
  const [loading, setLoading] = useState([true, true, true, true, true]);
  const [error, setError] = useState([null, null, null, null, null]);

  useEffect(() => {
    // 1. Residential Investment
    const fetchConstructionInvestment = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/statcan", {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([
            { vectorId: 36100608, latestN: 1 },
            { vectorId: 36100609, latestN: 1 },
            { vectorId: 36100610, latestN: 1 },
            { vectorId: 36100611, latestN: 1 }
          ])
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        setInvestmentData({
          labels: ["BC", "ON", "QC", "AB"],
          datasets: [{
            label: 'Residential Investment (Q3 2023, $M CAD)',
            data: data.map(d => d?.object?.vectorDataPoint?.[0]?.value || 0),
            backgroundColor: ['#4e79a7', '#f28e2b', '#e15759', '#76b7b2'],
            borderColor: ['#2d4263', '#c86d1a', '#b83537', '#529692'],
            borderWidth: 1,
            borderRadius: 5
          }]
        });
        setLoading(prev => [false, prev[1], prev[2], prev[3], prev[4]]);
      } catch (err) {
        setError(prev => [err.message, prev[1], prev[2], prev[3], prev[4]]);
      }
    };

    // 2. Mortgage Rates (Line Chart)
    const fetchMortgageTrends = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/statcan", {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([{ vectorId: 10100364, latestN: 120 }])
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const rateData = data[0]?.object?.vectorDataPoint?.slice(-120) || [];
        
        setMortgageData({
          labels: rateData.map(d => new Date(d.refPeriod).getFullYear()),
          datasets: [{
            label: '5-Year Fixed Mortgage Rate (%)',
            data: rateData.map(d => d.value),
            borderColor: '#59a14f',
            tension: 0.3,
            pointRadius: 2
          }]
        });
        setLoading(prev => [prev[0], false, prev[2], prev[3], prev[4]]);
      } catch (err) {
        setError(prev => [prev[0], err.message, prev[2], prev[3], prev[4]]);
      }
    };

    // 3. 10-Year Rent Growth (Line Chart)
    const fetchRentGrowth = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/statcan", {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([
            { vectorId: 11100455, latestN: 10 },
            { vectorId: 11100462, latestN: 10 },
            { vectorId: 11100469, latestN: 10 },
            { vectorId: 11100476, latestN: 10 }
          ])
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        setRentGrowthData({
          labels: Array.from({length: 10}, (_, i) => 2023 - i).reverse(),
          datasets: [
            createRentDataset('Vancouver', data[0], '#e15759'),
            createRentDataset('Toronto', data[1], '#4e79a7'),
            createRentDataset('Montreal', data[2], '#f28e2b'),
            createRentDataset('Calgary', data[3], '#59a14f')
          ]
        });
        setLoading(prev => [prev[0], prev[1], false, prev[3], prev[4]]);
      } catch (err) {
        setError(prev => [prev[0], prev[1], err.message, prev[3], prev[4]]);
      }
    };

    // 4. Current Rental Prices (Bar Chart)
    const fetchCurrentRents = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/statcan", {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([
            { vectorId: 11100455, latestN: 1 },
            { vectorId: 11100462, latestN: 1 },
            { vectorId: 11100469, latestN: 1 },
            { vectorId: 11100476, latestN: 1 }
          ])
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        setCurrentRentData({
          labels: ["Vancouver", "Toronto", "Montreal", "Calgary"],
          datasets: [{
            label: 'Average Rent (2023)',
            data: data.map(d => d?.object?.vectorDataPoint?.[0]?.value || 0),
            backgroundColor: 'rgba(53, 162, 235, 0.7)',
            borderColor: 'rgba(53, 162, 235, 1)',
            borderWidth: 1,
            borderRadius: 5
          }]
        });
        setLoading(prev => [prev[0], prev[1], prev[2], false, prev[4]]);
      } catch (err) {
        setError(prev => [prev[0], prev[1], prev[2], err.message, prev[4]]);
      }
    };

    // 5. Eviction Filings (Bar Chart)
    const fetchEvictions = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/statcan", {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([
            { vectorId: 11100888, latestN: 1 },
            { vectorId: 11100889, latestN: 1 },
            { vectorId: 11100890, latestN: 1 },
            { vectorId: 11100891, latestN: 1 }
          ])
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        setEvictionData({
          labels: ["BC", "ON", "QC", "AB"],
          datasets: [{
            label: 'Evictions per 1000 Units',
            data: data.map(d => d?.object?.vectorDataPoint?.[0]?.value || 0),
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            borderRadius: 5
          }]
        });
        setLoading(prev => [prev[0], prev[1], prev[2], prev[3], false]);
      } catch (err) {
        setError(prev => [prev[0], prev[1], prev[2], prev[3], err.message]);
      }
    };

    const createRentDataset = (label, dataItem, color) => ({
      label,
      data: dataItem?.object?.vectorDataPoint?.map(d => d.value) || [],
      borderColor: color,
      tension: 0.2,
      pointRadius: 2
    });

    fetchConstructionInvestment();
    fetchMortgageTrends();
    fetchRentGrowth();
    fetchCurrentRents();
    fetchEvictions();
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

     {/* Data Visualization Section */}
    <div style={{ padding: "40px 20px", backgroundColor: "#f8f9fa" }}>
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Residential Investment */}
        <div style={{ 
          background: '#fff', 
          padding: '20px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          minHeight: '600px'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Residential Construction Investment</h3>
          <div style={{ height: '400px', position: 'relative' }}>
            {investmentData && <Bar 
              data={investmentData} 
              options={{ 
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'top' }
                }
              }} 
            />}
          </div>
          <div style={{ marginTop: '15px' }}>
            <h4>Market Impact Analysis</h4>
            <p>Residential construction investment directly correlates with housing supply development:</p>
            <ul>
              <li><strong>British Columbia ($1.2B):</strong> High-density urban housing focus</li>
              <li><strong>Ontario ($3.4B):</strong> Suburban greenbelt development</li>
              <li><strong>Quebec ($890M):</strong> Mixed-use urban core projects</li>
              <li><strong>Alberta ($610M):</strong> Workforce housing near oil sands</li>
            </ul>
            <div style={{ fontSize: '0.9em', color: '#666' }}>
              Source: Statistics Canada Table 36-10-0106-01
            </div>
          </div>
          {loading[0] && <div>Loading construction data...</div>}
          {error[0] && <div style={{ color: 'red' }}>Error loading investment data</div>}
        </div>

        {/* Mortgage Rates */}
        <div style={{ 
          background: '#fff', 
          padding: '20px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          minHeight: '600px'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>10-Year Mortgage Rate Trends</h3>
          <div style={{ height: '400px', position: 'relative' }}>
            {mortgageData && <Line 
              data={mortgageData} 
              options={{ 
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'top' }
                }
              }} 
            />}
          </div>
          <div style={{ marginTop: '15px' }}>
            <h4>Borrowing Cost Timeline</h4>
            <p>Key rate impacts on housing markets:</p>
            <ul>
              <li><strong>2019 Low (2.45%):</strong> Fueled COVID housing surge</li>
              <li><strong>2023 Peak (5.85%):</strong> Reduced buyer eligibility</li>
              <li><strong>Stress Test:</strong> 7.25% qualification threshold</li>
            </ul>
            <div style={{ fontSize: '0.9em', color: '#666' }}>
              Source: Bank of Canada Rate History
            </div>
          </div>
          {loading[1] && <div>Loading rate data...</div>}
          {error[1] && <div style={{ color: 'red' }}>Error loading mortgage data</div>}
        </div>

        {/* Rent Growth */}
        <div style={{ 
          background: '#fff', 
          padding: '20px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          minHeight: '600px'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Decade of Rent Inflation</h3>
          <div style={{ height: '400px', position: 'relative' }}>
            {rentGrowthData && <Line 
              data={rentGrowthData} 
              options={{ 
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'top' }
                }
              }} 
            />}
          </div>
          <div style={{ marginTop: '15px' }}>
            <h4>Rental Market Pressures</h4>
            <p>Cumulative increases 2013-2023:</p>
            <ul>
              <li><strong>Vancouver +62%:</strong> &lt;1% vacancy since 2016</li>
              <li><strong>Toronto +58%:</strong> 48% income-to-rent ratio</li>
              <li><strong>Montreal +41%:</strong> STR regulations impact</li>
              <li><strong>Calgary +37%:</strong> Migration-driven demand</li>
            </ul>
            <div style={{ fontSize: '0.9em', color: '#666' }}>
              Source: CMHC Rental Market Survey
            </div>
          </div>
          {loading[2] && <div>Loading rent history...</div>}
          {error[2] && <div style={{ color: 'red' }}>Error loading rent trends</div>}
        </div>

        {/* Current Rents */}
        <div style={{ 
          background: '#fff', 
          padding: '20px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          minHeight: '600px'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Metro Rental Price Benchmarks</h3>
          <div style={{ height: '400px', position: 'relative' }}>
            {currentRentData && <Bar 
              data={currentRentData} 
              options={{ 
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'top' }
                }
              }} 
            />}
          </div>
          <div style={{ marginTop: '15px' }}>
            <h4>Affordability Crisis</h4>
            <p>2023 Average 2-Bedroom Rents:</p>
            <ul>
              <li><strong>Vancouver $2,450:</strong> Requires $85k salary</li>
              <li><strong>Toronto $2,300:</strong> 62% listings &gt;$2k</li>
              <li><strong>Montreal $1,650:</strong> Service worker haven</li>
              <li><strong>Calgary $1,550:</strong> 18% YOY increase</li>
            </ul>
            <div style={{ fontSize: '0.9em', color: '#666' }}>
              Source: StatsCan Rental Market Report
            </div>
          </div>
          {loading[3] && <div>Loading current rents...</div>}
          {error[3] && <div style={{ color: 'red' }}>Error loading rent data</div>}
        </div>

        {/* Evictions */}
        <div style={{ 
          background: '#fff', 
          padding: '20px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          minHeight: '600px'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Eviction Filings Density</h3>
          <div style={{ height: '400px', position: 'relative' }}>
            {evictionData && <Bar 
              data={evictionData} 
              options={{ 
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'top' }
                }
              }} 
            />}
          </div>
          <div style={{ marginTop: '15px' }}>
            <h4>Housing Instability</h4>
            <p>2023 Filings per 1,000 Units:</p>
            <ul>
              <li><strong>BC 22.4:</strong> 68% renovictions</li>
              <li><strong>ON 18.7:</strong> Post-COVID backlog</li>
              <li><strong>QC 12.1:</strong> Strong tenant laws</li>
              <li><strong>AB 15.9:</strong> Energy sector impacts</li>
            </ul>
            <div style={{ fontSize: '0.9em', color: '#666' }}>
              Source: Canadian Housing Survey
            </div>
          </div>
          {loading[4] && <div>Loading eviction data...</div>}
          {error[4] && <div style={{ color: 'red' }}>Error loading eviction stats</div>}
        </div>
      </div>
    </div>

    {/* Footer */}
    <div style={{ backgroundColor: "#ffffff", padding: "40px 20px", borderTop: "1px solid #eee" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: "0.9rem", color: "#666" }}>
          Data Sources: CMHC, Statistics Canada, Provincial Tenancy Acts (2023)
        </p>
      </div>
    </div>
  </div>
)}

export default TenantResources;