import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_LOCALHOST || "http://localhost:3500";

const VisitorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [visitor, setVisitor] = useState(null);

  useEffect(() => {
    const fetchVisitor = async () => {
      try {
        const res = await fetch(`${API}/api/home/visitors/visitors/${id}`);
        const data = await res.json();
        setVisitor(data);
      } catch (err) {
        console.error("Error fetching visitor:", err);
      }
    };
    fetchVisitor();
  }, [id]);

  if (!visitor) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <div className="text-slate-400 animate-pulse">
          Loading visitor data...
        </div>
      </div>
    );
  }

  const mapUrl = `https://maps.google.com/maps?q=${visitor.loc}&z=15&output=embed`;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-4 lg:px-10 py-6 
    bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_40%)]">

      {/* HEADER */}
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">
            Visitor Overview
          </h1>
          <p className="text-sm text-slate-400">
            ID: <span className="text-red-400">{visitor._id}</span>
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition"
        >
          Back
        </button>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-8 space-y-6">

          {/* NETWORK */}
          <Card title="Network Information">
            <Grid>
              <Info label="IP Address" value={visitor.ip} type="ip" />
              <Info label="Organization" value={visitor.org} />
              <Info label="Session ID" value={visitor.sessionId} type="id" />
              <Info label="Source" value={visitor.utmSource} type="highlight" />
              <Info label="Language" value={visitor.language} />
              <Info label="Timezone" value={visitor.timezone} />
            </Grid>
          </Card>

          {/* SYSTEM */}
          <Card title="System Details">
            <Grid>
              <Info label="Browser" value={visitor.browserName} type="highlight" />
              <Info label="OS" value={visitor.osName} />
              <Info label="Platform" value={visitor.platform} />
              <Info label="Device" value={visitor.device} />
              <Info label="Device Brand" value={visitor.deviceBrand} />
              <Info label="Screen" value={visitor.screenSize} />
            </Grid>

            <div className="mt-4">
              <p className="text-xs text-slate-400 mb-2">User Agent</p>
              <div className="bg-black/40 p-3 rounded text-xs text-slate-300 break-all">
                {visitor.userAgent}
              </div>
            </div>
          </Card>

          {/* EXTRA RAW DATA */}
          <Card title="Additional Data">
            <Grid>
              <Info label="Platform" value={visitor.platform} />
              <Info label="Version (__v)" value={visitor.__v} />
            </Grid>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-4 space-y-6">

          {/* LOCATION */}
          <Card title="Location">
            <div className="h-56 rounded-lg overflow-hidden mb-4 border border-white/10">
              <iframe
                title="map"
                width="100%"
                height="100%"
                src={mapUrl}
              />
            </div>

            <Info label="City" value={visitor.city} type="location" />
            <Info label="Region" value={visitor.region} />
            <Info label="Country" value={visitor.country} />
            <Info label="Postal Code" value={visitor.postal} />
            <Info label="Coordinates" value={visitor.loc} type="location" />
          </Card>

          {/* TIMELINE */}
          <Card title="Activity Timeline">
            <Timeline label="Created" date={visitor.createdAt} />
            <Timeline label="Last Active" date={visitor.lastActivity} />
            <Timeline label="Updated" date={visitor.updatedAt} />
          </Card>
        </div>
      </div>
    </div>
  );
};

/* COMPONENTS */

const Card = ({ title, children }) => (
  <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl p-5 backdrop-blur-xl shadow-lg hover:shadow-indigo-500/10 transition">
    <h2 className="text-sm text-slate-400 mb-4 flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
      {title}
    </h2>
    {children}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {children}
  </div>
);

const Info = ({ label, value, type = "default" }) => {
  const colorMap = {
    ip: "text-green-400",
    id: "text-red-400",
    location: "text-yellow-400",
    highlight: "text-indigo-400",
    default: "text-white",
  };

  return (
    <div className="group">
      <p className="text-xs text-slate-400">{label}</p>
      <p className={`text-sm font-medium ${colorMap[type]} group-hover:scale-[1.02] transition`}>
        {value || "N/A"}
      </p>
    </div>
  );
};

const Timeline = ({ label, date }) => (
  <div className="flex justify-between items-center text-sm mb-3 p-2 rounded-lg hover:bg-white/5 transition">
    <span className="text-slate-400">{label}</span>
    <span className="text-indigo-400 font-medium">
      {new Date(date).toLocaleString()}
    </span>
  </div>
);

export default VisitorDetails;