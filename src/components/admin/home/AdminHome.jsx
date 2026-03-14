import React, { useEffect, useState } from "react";
import { Loader2, Plus, Trash2, Edit3, ShieldAlert, Terminal } from "lucide-react";

const API = import.meta.env.VITE_LOCALHOST ? `${import.meta.env.VITE_LOCALHOST}/api/home` : "http://localhost:3500/api/home";

const AdminHome = () => {
    const token = localStorage.getItem("token");

    const [devLogs, setDevLogs] = useState([]);
    const [notices, setNotices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    const [modal, setModal] = useState(false);
    const [type, setType] = useState("");
    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState({
        title: "",
        value: "",
        description: "",
        content: "",
        date: "",
    });

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [devRes, noticeRes] = await Promise.all([
                fetch(`${API}/devLog`, { headers: { Authorization: `Bearer ${token}` } }),
                fetch(`${API}/notices`, { headers: { Authorization: `Bearer ${token}` } })
            ]);

            const devData = await devRes.json();
            const noticeData = await noticeRes.json();

            setDevLogs(devData.data || devData);
            setNotices(noticeData.data || noticeData);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const openModal = (section, data = null) => {
        setType(section);
        setEditId(data?._id || null);
        setForm(data || { title: "", value: "", description: "", content: "", date: "" });
        setModal(true);
    };

    const save = async () => {
        setActionLoading(true);
        try {
            let url = `${API}/${type}`;
            let method = "POST";

            if (editId) {
                url = `${API}/${type}/${editId}`;
                method = type === "devLog" ? "PUT" : "PATCH";
            }

            await fetch(url, {
                method,
                headers,
                body: JSON.stringify(form),
            });
            setModal(false);
            fetchData();
        } catch (err) {
            console.error(err);
        } finally {
            setActionLoading(false);
        }
    };

    const remove = async (id, section) => {
        if (!window.confirm("Terminate this record?")) return;
        setActionLoading(true);
        try {
            await fetch(`${API}/${section}/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchData();
        } catch (err) {
            console.error(err);
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-gray-300 font-mono p-4 md:p-10 selection:bg-green-500/30">
            {/* Header Section */}
            <header className="max-w-7xl mx-auto mb-12 border-b border-green-900/50 pb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                    <Terminal className="text-green-500 w-8 h-8 animate-pulse" />
                    <h1 className="text-3xl font-black tracking-tighter text-white uppercase">
                        System<span className="text-green-500">_Admin</span>
                    </h1>
                </div>
                {isLoading && <Loader2 className="animate-spin text-green-500" />}
            </header>

            <main className="max-w-7xl mx-auto space-y-16">
                {/* DEV LOG SECTION */}
                <section>
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h2 className="text-green-500 text-xs font-bold uppercase tracking-[0.2em]">Deployment Status</h2>
                            <p className="text-2xl font-bold text-white">Dev Journey Metrics</p>
                        </div>
                        <button 
                            onClick={() => openModal("devLog")}
                            className="group flex items-center gap-2 bg-green-600/10 border border-green-500/50 text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                        >
                            <Plus size={18} /> New Stat
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {devLogs.map((item) => (
                            <div key={item._id} className="group relative bg-[#0a0a0a] border border-white/10 p-6 rounded-lg hover:border-green-500/50 transition-all">
                                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                    <button onClick={() => openModal("devLog", item)} className="p-1 hover:text-blue-400"><Edit3 size={16}/></button>
                                    <button onClick={() => remove(item._id, "devLog")} className="p-1 hover:text-red-500"><Trash2 size={16}/></button>
                                </div>
                                <h3 className="text-gray-500 text-xs uppercase mb-1 tracking-widest">{item.title}</h3>
                                <div className="text-3xl font-bold text-green-400 mb-2 drop-shadow-[0_0_8px_rgba(74,222,128,0.3)]">{item.value}</div>
                                <p className="text-sm text-gray-400 line-clamp-2">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* NOTICES SECTION */}
                <section>
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h2 className="text-red-500 text-xs font-bold uppercase tracking-[0.2em]">Global Communications</h2>
                            <p className="text-2xl font-bold text-white">Notice Board</p>
                        </div>
                        <button 
                            onClick={() => openModal("notices")}
                            className="flex items-center gap-2 bg-red-600/10 border border-red-500/50 text-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-black transition-all duration-300"
                        >
                            <ShieldAlert size={18} /> Push Notice
                        </button>
                    </div>

                    <div className="space-y-4">
                        {notices.map((n) => (
                            <div key={n._id} className="flex flex-col md:flex-row md:items-center justify-between bg-[#0a0a0a] border-l-4 border-red-600 p-5 rounded-r-lg hover:bg-white/5 transition-colors">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-bold text-white text-lg">{n.title}</h3>
                                        <span className="text-[10px] bg-red-900/30 text-red-400 px-2 py-0.5 rounded border border-red-800">{n.date}</span>
                                    </div>
                                    <p className="text-gray-400 text-sm max-w-3xl">{n.content}</p>
                                </div>
                                <div className="flex gap-4 mt-4 md:mt-0">
                                    <button onClick={() => openModal("notices", n)} className="text-gray-500 hover:text-blue-400 transition-colors"><Edit3 size={20}/></button>
                                    <button onClick={() => remove(n._id, "notices")} className="text-gray-500 hover:text-red-500 transition-colors"><Trash2 size={20}/></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* MODAL */}
            {modal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => !actionLoading && setModal(false)} />
                    <div className="relative bg-[#0d0d0d] border border-green-500/50 p-8 rounded-xl w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,1)]">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                            <h3 className="font-bold text-xl text-white uppercase tracking-tighter">
                                {editId ? "Update" : "Initialize"} {type}
                            </h3>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] text-green-500 uppercase font-bold">Entry Title</label>
                                <input
                                    placeholder="Enter identifier..."
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full p-3 bg-black border border-white/10 rounded focus:border-green-500 outline-none transition-colors text-white"
                                />
                            </div>

                            {type === "devLog" ? (
                                <>
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-green-500 uppercase font-bold">Metric Value</label>
                                        <input
                                            placeholder="e.g. 99.9% or 500+"
                                            value={form.value}
                                            onChange={(e) => setForm({ ...form, value: e.target.value })}
                                            className="w-full p-3 bg-black border border-white/10 rounded focus:border-green-500 outline-none text-white"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-green-500 uppercase font-bold">Brief Description</label>
                                        <input
                                            placeholder="Describe the stat..."
                                            value={form.description}
                                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                                            className="w-full p-3 bg-black border border-white/10 rounded focus:border-green-500 outline-none text-white"
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-red-500 uppercase font-bold">Content Body</label>
                                        <textarea
                                            placeholder="Message payload..."
                                            rows={4}
                                            value={form.content}
                                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                                            className="w-full p-3 bg-black border border-white/10 rounded focus:border-red-500 outline-none text-white resize-none"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-red-500 uppercase font-bold">Timestamp</label>
                                        <input
                                            type="date"
                                            value={form.date}
                                            onChange={(e) => setForm({ ...form, date: e.target.value })}
                                            className="w-full p-3 bg-black border border-white/10 rounded focus:border-red-500 outline-none text-white color-scheme-dark"
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="flex gap-4 mt-8">
                            <button
                                disabled={actionLoading}
                                onClick={() => setModal(false)}
                                className="flex-1 py-3 border border-white/10 rounded text-gray-400 hover:bg-white/5 transition-colors disabled:opacity-50"
                            >
                                Abort
                            </button>
                            <button
                                disabled={actionLoading}
                                onClick={save}
                                className="flex-1 py-3 bg-green-600 text-black font-bold rounded hover:bg-green-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {actionLoading ? <Loader2 className="animate-spin w-5 h-5" /> : "Execute"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminHome;