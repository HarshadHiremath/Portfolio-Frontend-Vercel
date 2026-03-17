import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Loader2, Plus, Trash2, Edit3, Terminal, 
  Cpu, Newspaper, Type, AlignLeft, 
  FileText, Image as ImageIcon, Calendar, 
  Hash, ExternalLink 
} from 'lucide-react';

const API = import.meta.env.VITE_LOCALHOST || 'http://localhost:3500';

const AdminBlog = () => {
    const token = localStorage.getItem("token");
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [formData, setFormData] = useState({});

    const fetchBlogs = useCallback(async () => {
        try {
            setLoading(true);
            setError('');
            const response = await fetch(`${API}/api/blog`);
            if (!response.ok) throw new Error(`ERR_FETCH_BLOGS`);
            const data = await response.json();
            // Ensure array and reverse for chronological order
            setBlogs(Array.isArray(data) ? [...data].reverse() : []);
        } catch (err) {
            setError("LINK_FAILURE: Unable to reach blog archives.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const isEdit = !!currentItem;
            const url = isEdit ? `${API}/api/blog/${currentItem._id}` : `${API}/api/blog`;
            const method = isEdit ? 'PATCH' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setModalOpen(false);
                fetchBlogs();
            } else {
                throw new Error("POST_REJECTED");
            }
        } catch (err) {
            setError("SYNC_FAILURE: Host rejected blog payload.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm(`TERMINATE_LOG_ENTRY: ${id.slice(-4)}?`)) return;
        try {
            const res = await fetch(`${API}/api/blog/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) fetchBlogs();
        } catch (err) {
            setError("DELETE_FAILURE: Resource locked by admin.");
        }
    };

    const openModal = (blog = null) => {
        setCurrentItem(blog);
        setFormData(blog || {
            heading: '', subtitle: '', description: '', 
            content: '', image: ''
        });
        setModalOpen(true);
    };

    if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono text-purple-500 animate-pulse uppercase tracking-[0.3em]">Accessing_Data_Archives...</div>;

    return (
        <div className="min-h-screen bg-[#050505] text-gray-300 font-mono p-4 md:p-8 selection:bg-purple-500 selection:text-black">
            {/* Header */}
            <header className="max-w-7xl mx-auto mb-12 flex items-center justify-between border-b border-white/5 pb-6">
                <div className="flex items-center gap-3">
                    <Terminal className="text-purple-500" />
                    <h1 className="text-2xl font-black uppercase text-white tracking-tighter">Blog<span className="text-purple-500">_Registry</span></h1>
                </div>
                {error && <div className="text-red-500 text-[10px] bg-red-500/10 px-3 py-1 border border-red-500/20">{error}</div>}
            </header>

            <main className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-8 border-l-2 border-purple-500 pl-4">
                    <div>
                        <h2 className="text-purple-500 text-[10px] font-bold uppercase tracking-[0.4em]">Archive_Node</h2>
                        <p className="text-xl text-white font-bold uppercase tracking-tight">Manage Articles</p>
                    </div>
                    <button onClick={() => openModal()} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 text-xs font-bold hover:bg-purple-500 hover:text-black transition-all shadow-[0_0_10px_rgba(168,85,247,0.1)]">
                        <Plus size={14} /> NEW_ENTRY
                    </button>
                </div>

                {blogs.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-white/10 rounded">
                        <p className="text-gray-600 text-xs uppercase tracking-widest">No Log Entries Found In Registry</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((blog) => (
                            <div key={blog._id} className="group bg-[#0a0a0a] border border-white/5 rounded overflow-hidden hover:border-purple-500/30 transition-all duration-300 flex flex-col">
                                {/* Image Preview */}
                                <div className="h-40 bg-black relative overflow-hidden border-b border-white/5">
                                    {blog.image ? (
                                        <img 
                                            src={blog.image} alt="preview" 
                                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                        />
                                    ) : null}
                                    <div className="absolute inset-0 items-center justify-center flex bg-[#050505]" style={{ display: blog.image ? 'none' : 'flex' }}>
                                        <ImageIcon className="text-gray-800" size={32} />
                                    </div>
                                    <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 text-[8px] text-purple-400 font-bold border border-purple-500/30">
                                        {new Date(blog.createdAt).toLocaleDateString('en-GB')}
                                    </div>
                                </div>

                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="text-white font-bold text-sm uppercase truncate mb-1">{blog.heading || "UNTITLED_LOG"}</h3>
                                    <p className="text-purple-500/70 text-[10px] uppercase font-bold tracking-wider mb-3 truncate">{blog.subtitle}</p>
                                    <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-3 mb-4">{blog.description}</p>
                                    
                                    <div className="mt-auto flex gap-4 pt-4 border-t border-white/5">
                                        <button onClick={() => openModal(blog)} className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-[10px] font-black uppercase"><Edit3 size={14}/> Edit</button>
                                        <button onClick={() => handleDelete(blog._id)} className="text-red-500 hover:text-red-400 flex items-center gap-1 text-[10px] font-black uppercase"><Trash2 size={14}/> Del</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Modal System */}
            <AnimatePresence>
                {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !submitting && setModalOpen(false)} className="absolute inset-0 bg-black/95 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-[#0d0d0d] border border-purple-500/30 p-8 rounded w-full max-w-4xl shadow-2xl overflow-y-auto max-h-[90vh]">
                            <h2 className="text-xl font-black text-white uppercase mb-8 flex items-center gap-2 tracking-tighter">
                                <Newspaper size={20} className="text-purple-500" /> {currentItem ? 'Patch' : 'Initialize'}_Blog_Node
                            </h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <CyberInput label="Heading" value={formData.heading} onChange={v => setFormData({...formData, heading: v})} icon={<Type size={12}/>} />
                                    <CyberInput label="Subtitle" value={formData.subtitle} onChange={v => setFormData({...formData, subtitle: v})} icon={<Hash size={12}/>} />
                                </div>

                                <CyberInput label="Short Description" value={formData.description} onChange={v => setFormData({...formData, description: v})} icon={<AlignLeft size={12}/>} />

                                <div className="space-y-1">
                                    <label className="text-[9px] text-gray-600 uppercase font-black tracking-widest flex items-center gap-2"><FileText size={12}/> Main Content</label>
                                    <textarea 
                                        placeholder="Enter full article content..." 
                                        className="w-full bg-black border border-white/10 p-3 text-xs text-white focus:border-purple-500 outline-none rounded min-h-[250px] font-mono leading-relaxed" 
                                        value={formData.content || ''} 
                                        onChange={(e) => setFormData({...formData, content: e.target.value})} 
                                        required
                                    />
                                </div>

                                <CyberInput label="Feature Image URL" value={formData.image} onChange={v => setFormData({...formData, image: v})} icon={<ImageIcon size={12}/>} />

                                <div className="flex gap-4 mt-12 pt-6 border-t border-white/5">
                                    <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-3 text-gray-600 uppercase text-[10px] font-black hover:text-white transition-all underline underline-offset-4">Abort</button>
                                    <button type="submit" disabled={submitting} className="flex-2 py-3 bg-purple-600 text-black font-black uppercase text-[10px] hover:bg-purple-400 transition-all flex items-center justify-center gap-2 px-10 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                                        {submitting ? <Loader2 className="animate-spin w-4 h-4" /> : 'Execute_Sync'}
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

// UI COMPONENT
const CyberInput = ({ label, value, onChange, type = "text", icon }) => (
    <div className="space-y-1 flex-1">
        <label className="text-[9px] text-gray-600 uppercase font-black tracking-widest flex items-center gap-2">{icon} {label}</label>
        <input 
            type={type} 
            value={value || ''} 
            onChange={(e) => onChange(e.target.value)} 
            required
            className="w-full bg-black border border-white/10 p-3 text-xs text-white focus:border-purple-500 outline-none rounded font-mono transition-all" 
        />
    </div>
);

export default AdminBlog;