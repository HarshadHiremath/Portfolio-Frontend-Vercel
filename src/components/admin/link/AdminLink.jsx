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
  const token = localStorage.getItem("token");
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
      gmail: <Mail size={20} />,
      phone: <Phone size={20} />,
      linkedIn: <Linkedin size={20} />,
      instagram: <Instagram size={20} />,
      youtube: <Youtube size={20} />,
      github: <Github size={20} />,
      location: <MapPin size={20} />,
      locationLink: <Globe size={20} />,
      twitter: <Twitter size={20} />,
      resume: <FileText size={20} />,
    };
    return icons[platform] || <Cpu size={20} />;
  };

  const fetchLinks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API}/api/link`);
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
      const response = await fetch(`${API}/api/link/${platform}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
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

  if (loading)
          return (
              <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center font-mono">
                  <div className="relative w-24 h-24 mb-8">
                      {/* Outer Rotating Ring */}
                      <div className="absolute inset-0 border-2 border-green-500/20 rounded-full"></div>
                      <div className="absolute inset-0 border-t-2 border-green-500 rounded-full animate-spin"></div>
                      
                      {/* Inner Pulsing Radar */}
                      <div className="absolute inset-4 border border-green-500/40 rounded-full animate-ping"></div>
                      
                      {/* Center Core */}
                      <div className="absolute inset-0 flex items-center justify-center">
                          <ShieldAlert className="text-green-500 w-8 h-8 animate-pulse" />
                      </div>
                  </div>
      
                  {/* Terminal Loading Text */}
                  <div className="text-center">
                      <div className="text-green-500 text-xs font-bold tracking-[0.2em] uppercase mb-2">
                          Initializing_Admin_Control...
                      </div>
                      <div className="flex gap-1 justify-center">
                          {[...Array(4)].map((_, i) => (
                              <div 
                                  key={i} 
                                  className="w-2 h-1 bg-green-500 rounded-full animate-bounce" 
                                  style={{ animationDelay: `${i * 0.1}s` }}
                              />
                          ))}
                      </div>
                  </div>
      
                  {/* Background Data Stream (Visual Only) */}
                  <div className="absolute bottom-10 text-[8px] text-green-900/30 uppercase tracking-widest flex flex-col items-center">
                      <span>Accessing_Encrypted_Nodes...</span>
                      <span>Bypassing_Firewall_Grid...</span>
                  </div>
              </div>
          );

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-mono p-4 md:p-8 selection:bg-green-500/30">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-12 flex items-center justify-between border-b border-white/5 pb-6">
        <div className="flex items-center gap-3">
          <Terminal className="text-green-500" />
          <h1 className="text-2xl font-black uppercase text-white tracking-tighter">
            Network<span className="text-green-500">_Links</span>
          </h1>
        </div>
        {error && (
          <div className="flex items-center gap-2 text-red-500 text-[10px] bg-red-500/10 px-3 py-1 border border-red-500/20 uppercase">
            <ShieldAlert size={12} /> {error}
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8 border-l-2 border-green-500 pl-4">
          <div>
            <h2 className="text-green-500 text-[12px] font-bold uppercase tracking-[0.1em]">Node_Configuration</h2>
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
              className="group relative bg-[#0a0a0a] border border-white/5 p-6 rounded hover:bg-white/[0.02] hover:border-green-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded bg-green-500/10 flex items-center justify-center border border-green-500/20 group-hover:border-green-500/50 transition-all">
                  <span className="text-green-500">{getIcon(platform)}</span>
                </div>
                <label htmlFor={platform} className="text-[14px] text-gray-200 uppercase font-black tracking-widest">
                  {platform}
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  id={platform}
                  value={links[platform]}
                  onChange={(e) => handleChange(e, platform)}
                  className="w-full bg-[#050505] border border-white/10 p-3 text-xs text-white focus:border-green-500 outline-none rounded font-mono transition-all pr-10"
                  placeholder={`Add ${platform}...`}
                />
                <div className="absolute right-3 top-3 text-white/10 group-hover:text-green-500/20 transition-colors">
                  <RefreshCw size={12} className={updatingPlatform === platform ? "animate-spin text-green-500" : ""} />
                </div>
              </div>

              <button
                onClick={() => handleSubmit(platform)}
                disabled={updatingPlatform === platform || !links[platform]?.trim()}
                className="mt-4 w-full py-2 bg-transparent border border-green-500/30 text-green-500 text-[12px] font-black uppercase tracking-widest hover:bg-green-500 hover:text-black disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-green-500 transition-all"
              >
                {updatingPlatform === platform ? "Synchronizing..." : "Execute_Update"}
              </button>

              {/* Terminal corner detail */}
              <div className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 right-0 w-full h-[1px] bg-red-500" />
                <div className="absolute bottom-0 right-0 h-full w-[1px] bg-red-500" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminLink;