import React, { useState, useEffect, useCallback } from "react";
import { 
  Loader2, 
  Terminal, 
  Globe, 
  Cpu, 
  RefreshCw, 
  ShieldAlert, 
  Github, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  FileText 
} from "lucide-react";

const API = import.meta.env.VITE_LOCALHOST || 'http://localhost:3500';

const AdminLink = () => {
  const [links, setLinks] = useState({
    gmail: "", phone: "", linkedIn: "", instagram: "",
    youtube: "", github: "", location: "", locationLink: "",
    twitter: "", resume: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [updatingPlatform, setUpdatingPlatform] = useState(null);

  // Mapping icons to platforms
  const getIcon = (platform) => {
    const icons = {
      gmail: <Mail size={14} />,
      phone: <Phone size={14} />,
      linkedIn: <Linkedin size={14} />,
      instagram: <Instagram size={14} />,
      youtube: <Youtube size={14} />,
      github: <Github size={14} />,
      location: <MapPin size={14} />,
      locationLink: <Globe size={14} />,
      twitter: <Twitter size={14} />,
      resume: <FileText size={14} />,
    };
    return icons[platform] || <Cpu size={14} />;
  };

  const fetchLinks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API}/link`);
      if (!response.ok) throw new Error(`FETCH_FAILED: ${response.statusText}`);
      const data = await response.json();

      const sanitizedData = Object.keys(data).reduce((acc, key) => {
        if (key !== "_id" && key !== "__v") acc[key] = data[key];
        return acc;
      }, {});

      setLinks(sanitizedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLinks(); }, [fetchLinks]);

  const handleChange = (e, platform) => {
    const { value } = e.target;
    setLinks((prev) => ({ ...prev, [platform]: value }));
    setError(null);
  };

  const handleSubmit = async (platform) => {
    setUpdatingPlatform(platform);
    setError(null);
    setSuccessMessage("");

    try {
      const response = await fetch(`${API}/link/${platform}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [platform]: links[platform] }),
      });

      if (!response.ok) throw new Error(`UPDATE_REJECTED: ${platform}`);

      setSuccessMessage(`${platform.toUpperCase()}_SYNC_COMPLETE`);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
    } finally {
      setUpdatingPlatform(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono text-cyan-500 animate-pulse tracking-[0.2em]">
        SCANNING_NETWORK_NODES...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-mono p-4 md:p-8 selection:bg-cyan-500/30">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-12 flex items-center justify-between border-b border-white/5 pb-6">
        <div className="flex items-center gap-3">
          <Terminal className="text-cyan-500" />
          <h1 className="text-2xl font-black uppercase text-white tracking-tighter">
            Network<span className="text-cyan-500">_Uplinks</span>
          </h1>
        </div>
        {error && (
          <div className="flex items-center gap-2 text-red-500 text-[10px] bg-red-500/10 px-3 py-1 border border-red-500/20 uppercase">
            <ShieldAlert size={12} /> {error}
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8 border-l-2 border-cyan-500 pl-4">
          <div>
            <h2 className="text-cyan-500 text-[10px] font-bold uppercase tracking-[0.4em]">Node_Configuration</h2>
            <p className="text-xl text-white font-bold uppercase tracking-tight">Social & Contact Links</p>
          </div>
          {successMessage && (
            <div className="text-pink-500 text-[10px] font-bold uppercase tracking-widest animate-pulse">
              {successMessage}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(links).map((platform) => (
            <div
              key={platform}
              className="group relative bg-[#0a0a0a] border border-white/5 p-6 rounded hover:bg-white/[0.02] hover:border-cyan-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-500/50 transition-all">
                  <span className="text-cyan-500">{getIcon(platform)}</span>
                </div>
                <label htmlFor={platform} className="text-[10px] text-gray-500 uppercase font-black tracking-widest">
                  {platform}
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  id={platform}
                  value={links[platform]}
                  onChange={(e) => handleChange(e, platform)}
                  className="w-full bg-[#050505] border border-white/10 p-3 text-xs text-white focus:border-pink-500 outline-none rounded font-mono transition-all pr-10"
                  placeholder={`Connect ${platform}...`}
                />
                <div className="absolute right-3 top-3 text-white/10 group-hover:text-cyan-500/20 transition-colors">
                  <RefreshCw size={12} className={updatingPlatform === platform ? "animate-spin text-cyan-500" : ""} />
                </div>
              </div>

              <button
                onClick={() => handleSubmit(platform)}
                disabled={updatingPlatform === platform || !links[platform]?.trim()}
                className="mt-4 w-full py-2 bg-transparent border border-cyan-500/30 text-cyan-500 text-[10px] font-black uppercase tracking-widest hover:bg-cyan-500 hover:text-black disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-cyan-500 transition-all"
              >
                {updatingPlatform === platform ? "Synchronizing..." : "Execute_Update"}
              </button>

              {/* Terminal corner detail */}
              <div className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 right-0 w-full h-[1px] bg-pink-500" />
                <div className="absolute bottom-0 right-0 h-full w-[1px] bg-pink-500" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminLink;