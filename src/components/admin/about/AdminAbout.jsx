import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Loader2, Plus, Trash2, Edit3, Terminal, 
  Cpu, GraduationCap, Briefcase, Award, 
  Trophy, Zap, Image as ImageIcon, Link as LinkIcon, 
  Calendar 
} from 'lucide-react';

const API = import.meta.env.VITE_LOCALHOST || 'http://localhost:3500';

const AdminAbout = () => {
    const token = localStorage.getItem("token");
    const [sections, setSections] = useState({
        education: [], experience: [], certifications: [],
        achievements: [], skills: [],
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [currentSection, setCurrentSection] = useState('');
    const [currentItem, setCurrentItem] = useState(null);
    const [formData, setFormData] = useState({});

    const config = {
        education: { color: 'text-blue-400', border: 'border-blue-500/30', icon: <GraduationCap size={16}/> },
        experience: { color: 'text-green-400', border: 'border-green-500/30', icon: <Briefcase size={16}/> },
        certifications: { color: 'text-yellow-400', border: 'border-yellow-500/30', icon: <Award size={16}/> },
        achievements: { color: 'text-purple-400', border: 'border-purple-500/30', icon: <Trophy size={16}/> },
        skills: { color: 'text-red-400', border: 'border-red-500/30', icon: <Zap size={16}/> },
    };

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const types = Object.keys(config);
            const promises = types.map(type => fetch(`${API}/api/about/${type}`).then(res => res.json()));
            const results = await Promise.all(promises);
            const newState = {};
            types.forEach((type, index) => {
                newState[type] = Array.isArray(results[index]) ? results[index] : [];
            });
            setSections(newState);
        } catch (err) {
            setError("LINK_FAILURE: Core systems unreachable.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const isEdit = !!currentItem;
            const url = isEdit ? `${API}/api/about/${currentSection}/${currentItem._id}` : `${API}/api/about/${currentSection}`;
            const method = isEdit ? 'PATCH' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setModalOpen(false);
                fetchData();
            }
        } catch (err) {
            setError("SYNC_FAILURE: Host rejected the payload.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (section, id) => {
        if (!window.confirm(`ERASE_DATA_STREAM: ${id.slice(-4)}?`)) return;
        try {
            const res = await fetch(`${API}/api/about/${section}/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) fetchData();
        } catch (err) {
            setError("DELETE_FAILURE: Access denied.");
        }
    };

    const openModal = (section, item = null) => {
        setCurrentSection(section);
        setCurrentItem(item);
        setFormData(item || {
            institution: '', role: '', title: '', name: '',
            logo: '', duration: '', score: '', description: '',
            link: '', year: ''
        });
        setModalOpen(true);
    };

    if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono text-blue-500 animate-pulse uppercase tracking-[0.3em]">Syncing_Profile_Assets...</div>;

    return (
        <div className="min-h-screen bg-[#050505] text-gray-300 font-mono p-4 md:p-8">
            <header className="max-w-6xl mx-auto mb-12 flex items-center justify-between border-b border-white/5 pb-6">
                <div className="flex items-center gap-3">
                    <Terminal className="text-blue-500" />
                    <h1 className="text-2xl font-black uppercase text-white tracking-tighter">About<span className="text-blue-500">_Registry</span></h1>
                </div>
            </header>

            <main className="max-w-6xl mx-auto space-y-16">
                {Object.keys(config).map((key) => (
                    <section key={key}>
                        <div className="flex justify-between items-end mb-6 border-l-2 border-blue-500 pl-4">
                            <div>
                                <h2 className={`text-[10px] font-bold uppercase tracking-[0.4em] ${config[key].color}`}>Node_{key}</h2>
                                <p className="text-xl text-white font-bold uppercase tracking-tight">{key}</p>
                            </div>
                            <button onClick={() => openModal(key)} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 text-xs font-bold hover:bg-blue-500 hover:text-black transition-all">
                                <Plus size={14} /> NEW_ENTRY
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {sections[key].map((item) => (
                                <div key={item._id} className={`group bg-[#0a0a0a] border ${config[key].border} rounded flex overflow-hidden hover:bg-white/[0.02] transition-all duration-300`}>
                                    
                                    {/* LOGO BOX - Hidden for Achievements */}
                                    {key !== 'achievements' && (
                                        <div className="w-20 bg-black flex-shrink-0 border-r border-white/5 flex items-center justify-center p-4">
                                            {item.logo ? (
                                                <img 
                                                    src={item.logo} alt="icon" 
                                                    className="w-10 h-10 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                                                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                                                />
                                            ) : null}
                                            <div style={{ display: item.logo ? 'none' : 'block' }}>
                                                <Cpu className="text-gray-800" size={24} />
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-4 flex-1 min-w-0">
                                        <h3 className="text-white font-bold text-sm uppercase truncate mb-1">
                                            {item.institution || item.role || item.title || item.name}
                                        </h3>
                                        <div className="text-[9px] text-gray-500 uppercase tracking-widest flex flex-wrap gap-x-4">
                                            {item.duration && <span><Calendar size={8} className="inline mr-1"/>{item.duration}</span>}
                                            {item.score && <span className="text-blue-500">{item.score}</span>}
                                            {item.year && <span className="text-purple-500 underline underline-offset-2">FY_{item.year}</span>}
                                        </div>
                                        <div className="flex gap-4 mt-4 pt-3 border-t border-white/5">
                                            <button onClick={() => openModal(key, item)} className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-[9px] font-black uppercase"><Edit3 size={14}/> Edit</button>
                                            <button onClick={() => handleDelete(key, item._id)} className="text-red-500 hover:text-red-400 flex items-center gap-1 text-[9px] font-black uppercase"><Trash2 size={14}/> Del</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </main>

            <AnimatePresence>
                {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !submitting && setModalOpen(false)} className="absolute inset-0 bg-black/95 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-[#0d0d0d] border border-blue-500/30 p-8 rounded w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]">
                            <h2 className="text-lg font-black text-white uppercase mb-6 flex items-center gap-2 tracking-tighter">
                                {config[currentSection].icon} {currentItem ? 'Patch' : 'Inject'}_{currentSection}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {currentSection === 'education' && (
                                    <>
                                        <CyberInput label="Institution" value={formData.institution} onChange={v => setFormData({...formData, institution: v})} />
                                        <CyberInput label="Duration" value={formData.duration} onChange={v => setFormData({...formData, duration: v})} />
                                        <CyberInput label="Score" value={formData.score} onChange={v => setFormData({...formData, score: v})} />
                                    </>
                                )}
                                {currentSection === 'experience' && (
                                    <>
                                        <CyberInput label="Role" value={formData.role} onChange={v => setFormData({...formData, role: v})} />
                                        <CyberInput label="Duration" value={formData.duration} onChange={v => setFormData({...formData, duration: v})} />
                                    </>
                                )}
                                {currentSection === 'certifications' && (
                                    <>
                                        <CyberInput label="Title" value={formData.title} onChange={v => setFormData({...formData, title: v})} />
                                        <CyberInput label="Link" value={formData.link} onChange={v => setFormData({...formData, link: v})} icon={<LinkIcon size={12}/>} />
                                    </>
                                )}
                                {currentSection === 'achievements' && (
                                    <>
                                        <CyberInput label="Achievement Title" value={formData.title} onChange={v => setFormData({...formData, title: v})} />
                                        <CyberInput label="Year" value={formData.year} onChange={v => setFormData({...formData, year: v})} />
                                    </>
                                )}
                                {currentSection === 'skills' && (
                                    <CyberInput label="Skill Name" value={formData.name} onChange={v => setFormData({...formData, name: v})} />
                                )}
                                
                                {currentSection !== 'skills' && (
                                    <textarea placeholder="DESCRIPTION" className="w-full bg-black border border-white/10 p-3 text-xs text-white focus:border-blue-500 outline-none rounded min-h-[100px]" value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                                )}
                                
                                {/* Logo URL hidden for Achievements */}
                                {currentSection !== 'achievements' && (
                                    <CyberInput label="Logo URL" value={formData.logo} onChange={v => setFormData({...formData, logo: v})} icon={<ImageIcon size={12}/>} />
                                )}

                                <div className="flex gap-4 mt-8 pt-4 border-t border-white/5">
                                    <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-3 text-gray-600 uppercase text-[10px] font-black hover:text-white transition-all underline underline-offset-4">Abort</button>
                                    <button type="submit" disabled={submitting} className="flex-1 py-3 bg-blue-600 text-black font-black uppercase text-[10px] hover:bg-blue-400 flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]">
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

const CyberInput = ({ label, value, onChange, type = "text", icon }) => (
    <div className="space-y-1">
        <label className="text-[9px] text-gray-600 uppercase font-black tracking-widest flex items-center gap-2">{icon} {label}</label>
        <input type={type} value={value || ''} onChange={(e) => onChange(e.target.value)} className="w-full bg-black border border-white/10 p-2.5 text-xs text-white focus:border-blue-500 outline-none rounded font-mono" />
    </div>
);

export default AdminAbout;