import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Plus, Trash2, Edit3, Terminal, Cpu, Link, Github, Calendar, Quote, Image as ImageIcon } from 'lucide-react';

const API = import.meta.env.VITE_LOCALHOST || 'http://localhost:3500';

const AdminProjects = () => {
    const token = localStorage.getItem("token");
    const [sections, setSections] = useState({ projects: [], milestones: [], marquee: [], testimonials: [] });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentSection, setCurrentSection] = useState(''); 
    const [currentItem, setCurrentItem] = useState(null);
    const [formData, setFormData] = useState({});

    const config = {
        projects: { color: 'text-blue-400', border: 'border-blue-500/30', label: 'Project' },
        milestones: { color: 'text-green-400', border: 'border-green-500/30', label: 'Milestone' },
        marquee: { color: 'text-purple-400', border: 'border-purple-500/30', label: 'Marquee' },
        testimonials: { color: 'text-yellow-400', border: 'border-yellow-500/30', label: 'Testimonial' },
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const types = ['projects', 'milestones', 'marquee', 'testimonials'];
            const promises = types.map(type => 
                fetch(`${API}/api/project/${type}`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json())
            );
            const results = await Promise.all(promises);
            const newState = {};
            types.forEach((type, index) => {
                newState[type] = Array.isArray(results[index]) ? results[index] : (results[index].data || []);
            });
            setSections(newState);
        } catch (err) { console.error("Fetch Error:", err); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const method = currentItem ? 'PATCH' : 'POST';
            const url = currentItem 
                ? `${API}/api/project/${currentSection}/${currentItem._id}` 
                : `${API}/api/project/${currentSection}`;

            const payload = { ...formData };
            if (currentSection === 'projects' && typeof payload.techStack === 'string') {
                payload.techStack = payload.techStack.split(',').map(s => s.trim());
            }

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(payload)
            });

            if (res.ok) { setModalOpen(false); fetchData(); }
        } catch (err) { console.error("Save Error:", err); }
        finally { setSubmitting(false); }
    };

    const handleDelete = async (section, id) => {
        if (!window.confirm(`Terminate ${section.slice(0, -1)} entry?`)) return;
        try {
            const res = await fetch(`${API}/api/project/${section}/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) fetchData();
        } catch (err) { console.error("Delete Error:", err); }
    };

    const openModal = (section, item = null) => {
        setCurrentSection(section);
        setCurrentItem(item);
        setFormData(item ? { 
            ...item, 
            techStack: Array.isArray(item.techStack) ? item.techStack.join(', ') : item.techStack 
        } : {});
        setModalOpen(true);
    };

    if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono text-green-500 animate-pulse">SYNCING_ASSETS...</div>;

    return (
        <div className="min-h-screen bg-[#050505] text-gray-300 font-mono p-4 md:p-8">
            <header className="max-w-6xl mx-auto mb-12 flex items-center gap-3 border-b border-white/5 pb-6">
                <Cpu className="text-green-500" />
                <h1 className="text-2xl font-black uppercase text-white tracking-tighter">Asset<span className="text-green-500">_Manager</span></h1>
            </header>

            <main className="max-w-6xl mx-auto space-y-16">
                {Object.keys(config).map((key) => (
                    <section key={key}>
                        <div className="flex justify-between items-end mb-6 border-l-2 border-green-500 pl-4">
                            <div>
                                <h2 className={`text-[10px] font-bold uppercase tracking-[0.4em] ${config[key].color}`}>Storage_{key}</h2>
                                <p className="text-xl text-white font-bold uppercase tracking-tight">{key}</p>
                            </div>
                            <button 
                                onClick={() => openModal(key)}
                                className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 text-xs font-bold hover:bg-green-500 hover:text-black transition-all"
                            >
                                <Plus size={14} /> NEW_ENTRY
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {sections[key].map((item) => (
                                <div key={item._id} className={`group bg-[#0a0a0a] border ${config[key].border} rounded flex overflow-hidden hover:bg-white/[0.02] transition-all`}>
                                    
                                    {/* PROJECT IMAGE PREVIEW */}
                                    {key === 'projects' && (
                                        <div className="w-24 sm:w-32 bg-black flex-shrink-0 border-r border-white/5 relative flex items-center justify-center">
                                            {item.image ? (
                                                <img src={item.image} alt="prev" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                                            ) : (
                                                <ImageIcon className="text-gray-800" size={24} />
                                            )}
                                        </div>
                                    )}

                                    <div className="p-4 flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-white font-bold text-sm uppercase truncate mb-1">
                                                {item.title || item.text || item.quote}
                                            </h3>
                                        </div>
                                        <p className="text-[11px] text-gray-500 line-clamp-2 mb-3 leading-relaxed">
                                            {item.description || item.source || 'No metadata available.'}
                                        </p>
                                        
                                        {/* ACTION BUTTONS (LARGER) */}
                                        <div className="flex gap-4 border-t border-white/5 pt-3 mt-auto">
                                            <button 
                                                onClick={() => openModal(key, item)} 
                                                className="text-blue-400 hover:text-blue-300 flex items-center gap-1 bg-blue-400/5 px-3 py-1.5 rounded border border-blue-400/20 hover:border-blue-400/50 transition-all"
                                            >
                                                <Edit3 size={18} /> <span className="text-[10px] font-black uppercase">Edit</span>
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(key, item._id)} 
                                                className="text-red-500 hover:text-red-400 flex items-center gap-1 bg-red-500/5 px-3 py-1.5 rounded border border-red-500/20 hover:border-red-500/50 transition-all"
                                            >
                                                <Trash2 size={18} /> <span className="text-[10px] font-black uppercase">Del</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </main>

            {/* MODAL */}
            <AnimatePresence>
                {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !submitting && setModalOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-[#0d0d0d] border border-green-500/30 p-8 rounded w-full max-w-lg shadow-2xl">
                            <h2 className="text-xl font-black text-white uppercase mb-6 flex items-center gap-2 tracking-tighter">
                                <Terminal size={20} className="text-green-500" /> {currentItem ? 'Update' : 'Initialize'} {currentSection}
                            </h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {currentSection === 'projects' && (
                                    <>
                                        <CyberInput label="Title" value={formData.title} onChange={v => setFormData({...formData, title: v})} />
                                        <div className="grid grid-cols-2 gap-4">
                                            <CyberInput label="Image URL" value={formData.image} onChange={v => setFormData({...formData, image: v})} icon={<ImageIcon size={12}/>} />
                                            <CyberInput label="Tech Stack (CSV)" value={formData.techStack} onChange={v => setFormData({...formData, techStack: v})} />
                                        </div>
                                        <textarea placeholder="Description" className="w-full p-3 bg-black border border-white/10 rounded focus:border-green-500 outline-none text-xs min-h-[100px] text-white" value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                                        <div className="grid grid-cols-2 gap-4">
                                            <CyberInput label="Live Link" value={formData.liveLink} onChange={v => setFormData({...formData, liveLink: v})} icon={<Link size={12}/>} />
                                            <CyberInput label="GitHub Link" value={formData.githubLink} onChange={v => setFormData({...formData, githubLink: v})} icon={<Github size={12}/>} />
                                        </div>
                                    </>
                                )}
                                {currentSection === 'milestones' && (
                                    <>
                                        <CyberInput label="Title" value={formData.title} onChange={v => setFormData({...formData, title: v})} />
                                        <CyberInput label="Date" type="date" value={formData.date} onChange={v => setFormData({...formData, date: v})} />
                                        <CyberInput label="Description" value={formData.description} onChange={v => setFormData({...formData, description: v})} />
                                    </>
                                )}
                                {currentSection === 'marquee' && <CyberInput label="Scroll Text" value={formData.text} onChange={v => setFormData({...formData, text: v})} />}
                                {currentSection === 'testimonials' && (
                                    <>
                                        <CyberInput label="Quote" value={formData.quote} onChange={v => setFormData({...formData, quote: v})} />
                                        <CyberInput label="Source" value={formData.source} onChange={v => setFormData({...formData, source: v})} />
                                    </>
                                )}

                                <div className="flex gap-4 mt-8 pt-4 border-t border-white/5">
                                    <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-3 text-gray-500 uppercase text-[10px] font-black hover:text-white transition-all">Abort</button>
                                    <button type="submit" disabled={submitting} className="flex-1 py-3 bg-green-600 text-black font-black uppercase text-[10px] hover:bg-green-400 transition-all flex items-center justify-center gap-2">
                                        {submitting ? <Loader2 className="animate-spin w-4 h-4" /> : 'Confirm_Push'}
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

// UI COMPONENTS
const CyberInput = ({ label, value, onChange, type = "text", icon }) => (
    <div className="space-y-1">
        <label className="text-[9px] text-gray-600 uppercase font-black tracking-widest flex items-center gap-2">{icon} {label}</label>
        <input type={type} value={value || ''} onChange={(e) => onChange(e.target.value)} className="w-full bg-black border border-white/10 p-3 text-xs text-white focus:border-green-500 outline-none transition-all rounded shadow-inner" />
    </div>
);

export default AdminProjects;