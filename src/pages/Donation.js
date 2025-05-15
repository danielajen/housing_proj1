// ✅ Donation.jsx
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Donation = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const handleDonate = async () => {
    try {
      const res = await axios.post("http://localhost:3001/api/create-checkout-session");
      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error("Donation Error:", err);
      alert("Unable to start checkout session.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Hero Section */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#1a365d",
          color: "white",
          padding: "80px 20px",
          backgroundImage: "url(/assets/donation.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#1a365d",
            opacity: 0.7,
          }}
        ></div>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1000px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "20px" }}>
            Help Us Keep Housing Data Free & Open
          </h1>
          <p style={{ fontSize: "1.25rem", marginBottom: "30px" }}>
            Support Glocal’s mission to make Canada's housing data accessible to all. Your donation helps us
            maintain tools, publish insights, and deliver civic impact.
          </p>
          <button
            onClick={handleDonate}
            style={{
              backgroundColor: "white",
              color: "#1a365d",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
            }}
          >
            Donate Now
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div style={{ backgroundColor: "#f3f4f6", padding: "60px 20px" }}>
            <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
            Why Donations Matter
          </h2>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
            We are a student-built, community-backed project working to uncover and explain Canada’s housing crisis.
            We process open datasets from Statistics Canada, CMHC, and provincial sources to help Canadians make
            sense of affordability, displacement, and construction trends.
          </p>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.8", marginTop: "20px" }}>
            Every donation helps us stay open and ad-free. It supports new research, platform hosting, and ongoing
            data curation to inform renters, students, organizers, and policy advocates across Canada.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Donation;