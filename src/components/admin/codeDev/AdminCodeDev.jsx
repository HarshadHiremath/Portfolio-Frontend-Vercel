import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  Plus,
  Trash2,
  Edit3,
  Terminal,
  Cpu,
  Globe,
  User,
  Award,
  ShieldAlert,
  Hash,
  Image as ImageIcon,
  Link as LinkIcon,
} from "lucide-react";

const API = import.meta.env.VITE_LOCALHOST || "http://localhost:3500";

const AdminCodeDev = () => {
  const token = localStorage.getItem("token");

  const [sections, setSections] = useState({ profiles: [], badges: [] });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("");
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({});

  const config = {
    profiles: {
      color: "text-cyan-400",
      border: "border-cyan-500/30",
      label: "Profiles",
    },
    badges: {
      color: "text-fuchsia-400",
      border: "border-fuchsia-500/30",
      label: "Badges",
    },
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const types = ["profiles", "badges"];

      const promises = types.map((type) =>
        fetch(`${API}/api/codeDev/${type}`).then((res) => {
          if (!res.ok) {
            throw new Error(`ERR_FETCH_${type.toUpperCase()}`);
          }
          return res.json();
        })
      );

      const results = await Promise.all(promises);

      const newState = {};
      types.forEach((type, index) => {
        newState[type] = Array.isArray(results[index])
          ? results[index]
          : results[index]?.data || [];
      });

      setSections(newState);
    } catch (err) {
      setError("LINK_FAILURE: Core system unreachable.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const method = currentItem ? "PATCH" : "POST";

      const url = currentItem
        ? `${API}/api/codeDev/${currentSection}/${currentItem._id}`
        : `${API}/api/codeDev/${currentSection}`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();

      setModalOpen(false);
      fetchData();
    } catch (err) {
      setError("SYNC_ERROR: Packet loss detected.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (section, id) => {
    if (!window.confirm(`TERMINATE_ENTRY_${id.slice(-4)}?`)) return;

    try {
      const res = await fetch(`${API}/api/codeDev/${section}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();

      fetchData();
    } catch (err) {
      setError("DELETE_FAILURE: Resource locked.");
    }
  };

  const openModal = (section, item = null) => {
    setCurrentSection(section);
    setCurrentItem(item);

    if (item) {
      setFormData(item);
    } else {
      if (section === "profiles") {
        setFormData({
          platform: "",
          username: "",
          profileLink: "",
          questionsSolved: 0,
          rank: "",
          logo: "",
        });
      } else {
        setFormData({
          name: "",
          platform: "",
          logo: "",
        });
      }
    }

    setModalOpen(true);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center font-mono">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 border-2 border-green-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-t-2 border-green-500 rounded-full animate-spin"></div>
          <div className="absolute inset-4 border border-green-500/40 rounded-full animate-ping"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <ShieldAlert className="text-green-500 w-8 h-8 animate-pulse" />
          </div>
        </div>
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
        <div className="absolute bottom-10 text-[8px] text-green-900/30 uppercase tracking-widest flex flex-col items-center">
          <span>Accessing_Encrypted_Nodes...</span>
          <span>Bypassing_Firewall_Grid...</span>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-mono p-1 md:p-1">
      {/* Container restricted to match dashboard center */}
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex items-center gap-3 border-b border-white/5 pb-6">
          <Terminal className="text-green-500" />
          <h1 className="text-2xl font-black uppercase text-white tracking-tighter">
            Code<span className="text-green-500">_Manager</span>
          </h1>
        </header>

        {error && (
          <div className="mb-6 p-3 bg-red-900/20 border border-red-500/50 text-red-500 text-[10px] uppercase">
            {error}
          </div>
        )}

        <main className="space-y-16">
          {Object.keys(config).map((key) => (
            <section key={key}>
              <div className="flex justify-between items-end mb-6 border-l-2 border-cyan-500 pl-4">
                <div>
                  <h2
                    className={`text-[12px] font-bold uppercase tracking-[0.1em] ${config[key].color}`}
                  >
                    Node_{key}
                  </h2>
                  <p className="text-xl text-white font-bold uppercase tracking-tight">
                    {key}
                  </p>
                </div>

                <button
                  onClick={() => openModal(key)}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 text-xs font-bold hover:bg-cyan-500 hover:text-black transition-all"
                >
                  <Plus size={14} /> NEW_ENTRY
                </button>
              </div>

              {/* Grid System for Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {sections[key].map((item) => (
                  <div
                    key={item._id}
                    className={`group bg-[#0a0a0a] border ${config[key].border} rounded flex overflow-hidden hover:bg-white/[0.02] transition-all min-h-[140px]`}
                  >
                    <div className="w-20 bg-black flex-shrink-0 border-r border-white/5 flex items-center justify-center p-4">
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt="icon"
                          className="w-10 h-10 object-contain grayscale group-hover:grayscale-0 transition-all drop-shadow-[0_0_8px_rgba(6,182,212,0.2)]"
                        />
                      ) : (
                        <Cpu className="text-gray-800" size={24} />
                      )}
                    </div>

                    <div className="p-5 flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h3 className="text-white font-bold text-[18px] uppercase truncate mb-1 tracking-tight">
                          {item.platform || item.name}
                        </h3>

                        <div className="text-[14px] text-gray-200 uppercase tracking-widest flex gap-4">
                          {item.username && (
                            <span className="flex items-center gap-1">
                              <User size={18} className="text-green-500" /> {item.username}
                            </span>
                          )}
                          {item.questionsSolved !== undefined && (
                            <span className="flex items-center gap-1">
                              <Hash size={18} className="text-green-500" /> {item.questionsSolved} Solved
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-4 mt-4 pt-3 border-t border-white/5">
                        <button
                          onClick={() => openModal(key, item)}
                          className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-[12px] font-black uppercase transition-colors"
                        >
                          <Edit3 size={16} /> Edit
                        </button>

                        <button
                          onClick={() => handleDelete(key, item._id)}
                          className="text-red-500 hover:text-red-400 flex items-center gap-1 text-[12px] font-black uppercase transition-colors"
                        >
                          <Trash2 size={16} /> Del
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>

      {/* MODAL - Specifically offset for Sidebar centering */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:pl-60">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !submitting && setModalOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-[#0d0d0d] border border-cyan-500/30 p-8 rounded w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,1)]"
            >
              <h2 className="text-lg font-black text-white uppercase mb-6 flex items-center gap-2 tracking-tighter">
                <Cpu size={18} className="text-cyan-500" />
                {currentItem ? "Edit" : "New"}_{currentSection}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {currentSection === "profiles" ? (
                  <>
                    <CyberInput
                      label="Platform"
                      value={formData.platform}
                      onChange={(v) => setFormData({ ...formData, platform: v })}
                      icon={<Globe size={12} />}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <CyberInput
                        label="User ID"
                        value={formData.username}
                        onChange={(v) => setFormData({ ...formData, username: v })}
                        icon={<User size={12} />}
                      />
                      <CyberInput
                        label="Rank"
                        value={formData.rank}
                        onChange={(v) => setFormData({ ...formData, rank: v })}
                        icon={<Hash size={12} />}
                      />
                    </div>
                    <CyberInput
                      label="Questions Solved"
                      type="number"
                      value={formData.questionsSolved}
                      onChange={(v) => setFormData({ ...formData, questionsSolved: Number(v) || 0 })}
                    />
                    <CyberInput
                      label="Profile Link"
                      value={formData.profileLink}
                      onChange={(v) => setFormData({ ...formData, profileLink: v })}
                      icon={<LinkIcon size={12} />}
                    />
                    <CyberInput
                      label="Logo URL"
                      value={formData.logo}
                      onChange={(v) => setFormData({ ...formData, logo: v })}
                      icon={<ImageIcon size={12} />}
                    />
                  </>
                ) : (
                  <>
                    <CyberInput
                      label="Badge Name"
                      value={formData.name}
                      onChange={(v) => setFormData({ ...formData, name: v })}
                      icon={<Award size={12} />}
                    />
                    <CyberInput
                      label="Platform"
                      value={formData.platform}
                      onChange={(v) => setFormData({ ...formData, platform: v })}
                    />
                    <CyberInput
                      label="Logo URL"
                      value={formData.logo}
                      onChange={(v) => setFormData({ ...formData, logo: v })}
                      icon={<ImageIcon size={12} />}
                    />
                  </>
                )}

                <div className="flex gap-4 mt-8 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="flex-1 py-3 text-gray-400 uppercase text-[16px] font-black hover:text-white transition-all underline underline-offset-4"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-3 bg-cyan-600 text-black font-black uppercase text-[16px] hover:bg-cyan-400 flex items-center justify-center gap-2 transition-all rounded-sm"
                  >
                    {submitting ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      "Confirm"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CyberInput = ({ label, value, onChange, type = "text", icon }) => (
  <div className="space-y-1">
    <label className="text-[12px] text-gray-400 uppercase font-black tracking-widest flex items-center gap-2">
      {icon} {label}
    </label>

    <input
      type={type}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-black border border-white/10 p-3 text-xs text-white focus:border-cyan-500 outline-none rounded font-mono transition-all"
    />
  </div>
);

export default AdminCodeDev;