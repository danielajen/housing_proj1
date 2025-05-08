import React from "react";
import "../App.css";
import HousingStats from "../components/HousingStats"; // Corrected import path

const About = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0); // Ensures the page scrolls to the top on render
  }, []);

  return (
    <div className="flex flex-col">
      {/* Banner Section */}
      <div
        className="flex justify-center items-start w-full h-[320px] bg-cover bg-no-repeat bg-right md:bg-center p-5"
        id="about-banner"
      >
        <div className="flex flex-col w-[90%] md:w-[50%] h-full justify-around text-center text-gray-100">
          <h1 className="text-6xl tracking-tighter font-sans">
            About Us — Bridging Data and Housing Solutions
          </h1>
          <p className="text-gray-200">
            Our mission is to provide transparency, accessibility, and actionable insights into Canada's housing market. By collecting, analyzing, and visualizing data from trusted sources such as the Canada Mortgage and Housing Corporation (CMHC), Statistics Canada, and provincial databases, we are committed to empowering communities and stakeholders with critical knowledge. 
            Through our dynamic, interactive platform, we aim to contribute to resolving Canada's housing challenges, making housing more affordable, sustainable, and accessible for all.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full bg-[var(--red)] py-10 pb-[100px] flex-col justify-around items-center">
        <h1 className="text-center text-2xl tracking-tighter font-bold text-white">
          Our Vision for Housing in Canada
        </h1>
        <div className="flex flex-wrap flex-col sm:flex-row items-center mt-7 gap-5 w-full justify-around">
          <p className="text-lg text-white max-w-3xl mx-auto mb-6 text-center">
            Our vision is simple: to bring clarity and data-driven solutions to one of the most pressing issues in Canada today — the housing crisis. By accessing and analyzing data from the CMHC and Statistics Canada, we offer a comprehensive, up-to-date view of Canada’s housing trends, affordability indices, rental market data, and vacancy rates. We believe that data should be available for everyone — whether you're a policymaker, a developer, or a concerned citizen. Our tool strives to give you the information you need to make informed decisions for a better future.
          </p>
        </div>

        {/* Integrated HousingStats Graph */}
        <div className="w-full mt-10 flex justify-center">
          <div className="bg-white p-8 rounded shadow-lg w-[90%] max-w-5xl">
            <HousingStats />
          </div>
        </div>
      </div>

      {/* Additional Section */}
      <div className="flex flex-col items-center bg-gray-100 py-10">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Why Housing Data Matters
        </h2>
        <p className="text-lg text-gray-700 mb-6 text-center max-w-3xl mx-auto">
          Housing is more than just shelter — it’s about stability, opportunity, and dignity. However, the rising costs, accessibility barriers, and complex issues surrounding housing in Canada have left many communities vulnerable. By providing transparent, real-time data, we seek to shed light on the underlying issues that affect the housing market. This includes zoning laws, building permits, homelessness statistics, and much more. Our aim is to bridge the gap between data, lived experience, and effective policy solutions.
        </p>

        {/* Encourage further engagement */}
        <div className="w-full text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Join Us in Solving the Housing Crisis
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Every piece of data tells a story. Together, we can use this data to identify patterns, spot opportunities, and create change. Stay updated with our platform, explore interactive reports, and contribute to shaping policies that promote fairness, affordability, and sustainable growth in housing across Canada.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
