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
        console.error("System Error: Critical data link failure.", err);
      }
    };
    fetchVisitor();
  }, [id]);

  if (!visitor) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-green-500 font-mono tracking-widest animate-pulse uppercase">Synchronizing Data...</p>
        </div>
      </div>
    );
  }

  // Google Maps Integration using loc coordinates
  const mapUrl = `https://maps.google.com/maps?q=${visitor.loc}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans p-4 lg:p-10 selection:bg-green-500 selection:text-black">
      {/* --- TOP NAVIGATION BAR --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-green-500 font-mono text-xs font-bold tracking-widest uppercase">Live Visitors Data</span>
          </div>
          <h1 className="text-3xl font-light tracking-tight">
            Visitor <span className="font-bold text-green-500">Node {visitor._id.slice(-6)}</span>
          </h1>
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="px-6 py-2 border border-white/20 hover:border-green-500 hover:text-green-500 transition-all font-mono text-xs uppercase"
        >
          Exit
        </button>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT COLUMN: NETWORK & DEVICE (8 COLS) --- */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Network Intel Card */}
          <section className="bg-[#0f0f0f] border border-white/5 p-8 rounded-lg">
            <h2 className="text-green-500 text-xs font-bold uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
              <span className="h-px w-8 bg-green-500/30"></span> Network Intelligence
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <InfoBlock label="IP Address" value={visitor.ip} isGreen />
              <InfoBlock label="ISP / Organization" value={visitor.org} />
              <InfoBlock label="Session ID" value={visitor.sessionId} />
              <InfoBlock label="Traffic Source" value={visitor.utmSource} />
              <InfoBlock label="Language" value={visitor.language} />
              <InfoBlock label="Timezone" value={visitor.timezone} />
            </div>
          </section>

          {/* System Fingerprint Card */}
          <section className="bg-[#0f0f0f] border border-white/5 p-8 rounded-lg">
            <h2 className="text-green-500 text-xs font-bold uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
              <span className="h-px w-8 bg-green-500/30"></span> System Fingerprint
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <InfoBlock label="Browser" value={visitor.browserName} />
              <InfoBlock label="Operating System" value={visitor.osName} />
              <InfoBlock label="Screen Resolution" value={visitor.screenSize} />
            </div>
            <div className="pt-6 border-t border-white/5">
              <p className="text-[10px] text-white/30 uppercase font-bold mb-3">User Agent String</p>
              <code className="block bg-black p-4 rounded text-xs text-white/60 break-all leading-relaxed font-mono">
                {visitor.userAgent}
              </code>
            </div>
          </section>
        </div>

        {/* --- RIGHT COLUMN: GEOLOCATION & LOGS (4 COLS) --- */}
        <aside className="lg:col-span-4 space-y-8">
          
          {/* Visual Geo-Targeting */}
          <section className="bg-[#0f0f0f] border border-white/5 rounded-lg overflow-hidden">
            <div className="h-64 relative grayscale hover:grayscale-0 transition-all duration-700 opacity-80 hover:opacity-100">
              <iframe
                title="Geographic Location"
                width="100%"
                height="100%"
                frameBorder="0"
                src={mapUrl}
              ></iframe>
              <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 text-[10px] font-mono text-green-500 border border-green-500/20">
                LOC: {visitor.loc}
              </div>
            </div>
            <div className="p-6">
               <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-white/40 uppercase">Location Data</span>
                  <span className="text-xs text-white font-bold">{visitor.country} / {visitor.postal}</span>
               </div>
               <p className="text-xl font-light text-green-500">
                {visitor.city}, <span className="text-white">{visitor.region}</span>
               </p>
            </div>
          </section>

          {/* Temporal Logs */}
          <section className="bg-[#0f0f0f] border border-white/5 p-8 rounded-lg">
            <h2 className="text-green-500 text-xs font-bold uppercase tracking-[0.3em] mb-6">Temporal Logs</h2>
            <div className="space-y-6">
              <LogItem label="First Detected" date={visitor.createdAt} />
              <LogItem label="Last Activity" date={visitor.lastActivity} />
              <LogItem label="Database Sync" date={visitor.updatedAt} />
            </div>
          </section>
        </aside>

      </div>
    </div>
  );
};

/* --- HELPER COMPONENTS FOR CLEANER CODE --- */

const InfoBlock = ({ label, value, isGreen = false }) => (
  <div className="flex flex-col">
    <span className="text-[10px] uppercase text-white/30 font-bold tracking-widest mb-1">{label}</span>
    <span className={`text-sm truncate ${isGreen ? 'text-green-500 font-mono font-bold' : 'text-white/90'}`}>
      {value || "Unknown"}
    </span>
  </div>
);

const LogItem = ({ label, date }) => (
  <div className="flex justify-between items-start border-l border-green-500/20 pl-4">
    <div>
      <p className="text-[10px] uppercase text-white/30 mb-1">{label}</p>
      <p className="text-xs text-white/80 font-mono italic">
        {new Date(date).toLocaleString()}
      </p>
    </div>
  </div>
);

export default VisitorDetails;