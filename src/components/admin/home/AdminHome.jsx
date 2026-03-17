import React, { useEffect, useState } from "react";
import {
    Loader2,
    Plus,
    Trash2,
    Edit3,
    ShieldAlert,
    Terminal,
    Activity,
    Cpu,
    Bell,
} from "lucide-react";

const API = import.meta.env.VITE_LOCALHOST
    ? `${import.meta.env.VITE_LOCALHOST}/api/home`
    : "http://localhost:3500/api/home";

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
                fetch(`${API}/devLog`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                fetch(`${API}/notices`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
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
        setForm(
            data || {
                title: "",
                value: "",
                description: "",
                content: "",
                date: "",
            },
        );
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
        if (!window.confirm("TERMINATE_DATA_POINT: Are you sure?")) return;
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

    if (isLoading)
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
        <div className="min-h-screen bg-[#050505] text-gray-300 font-mono p-1 md:p-1">
            {/* Header Section */}
            <header className="max-w-7xl mx-auto mb-12 flex items-center justify-between border-b border-white/5 pb-6">
                <div className="flex items-center gap-3">
                    <Terminal className="text-green-500" />
                    <h1 className="text-2xl font-black uppercase text-white tracking-tighter">
                        System<span className="text-green-500">_HomePage</span>
                    </h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto space-y-20">
                {/* DEV LOG SECTION */}
                <section>
                    <div className="flex justify-between items-end mb-8 border-l-2 border-green-500 pl-4">
                        <div>
                            <h2 className="text-green-500 text-[12px] font-bold uppercase tracking-[0.1em]">
                                Node_Status
                            </h2>
                            <p className="text-xl text-white font-bold uppercase tracking-tight">
                                Dev Journey Metrics
                            </p>
                        </div>
                        <button
                            onClick={() => openModal("devLog")}
                            className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 text-xs font-bold hover:bg-green-500 hover:text-black transition-all"
                        >
                            <Plus size={14} /> NEW_LOG
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {devLogs.map((item) => (
                            <div
                                key={item._id}
                                className="group relative bg-[#0a0a0a] border border-green-500/10 p-6 rounded hover:bg-white/[0.02] hover:border-green-500/30 transition-all duration-300"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <Activity
                                        size={18}
                                        className="text-green-900 group-hover:text-green-500 transition-colors"
                                    />
                                    <div className="flex gap-3 opacity-30 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() =>
                                                openModal("devLog", item)
                                            }
                                            className="hover:text-blue-500"
                                        >
                                            <Edit3 size={18} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                remove(item._id, "devLog")
                                            }
                                            className="hover:text-red-500"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="text-[16px] text-green-500 uppercase tracking-widest mb-1">
                                    {item.title}
                                </h3>
                                <div className="text-4xl font-black text-white mb-2 drop-shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                                    {item.value}
                                </div>
                                <p className="text-[12px] text-gray-400 text-justify leading-relaxed uppercase">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* NOTICES SECTION */}
                <section>
                    <div className="flex justify-between items-end mb-8 border-l-2 border-red-600 pl-4">
                        <div>
                            <h2 className="text-red-500 text-[12px] font-bold uppercase tracking-[0.1em]">
                                Priority_Queue
                            </h2>
                            <p className="text-xl text-white font-bold uppercase tracking-tight">
                                Notice Board
                            </p>
                        </div>
                        <button
                            onClick={() => openModal("notices")}
                            className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 text-xs font-bold hover:bg-red-600 hover:text-black transition-all"
                        >
                            <Bell size={16} /> BROADCAST
                        </button>
                    </div>

                    <div className="space-y-3">
                        {notices.map((n) => (
                            <div
                                key={n._id}
                                className="group flex flex-col md:flex-row md:items-center justify-between bg-[#0a0a0a] border border-white/5 p-5 rounded hover:border-red-600/30 transition-all"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                                        <h3 className="font-bold text-white text-[18px] uppercase tracking-wider">
                                            {n.title}
                                        </h3>
                                        <span className="text-[11px] font-black bg-red-900/10 text-red-500 px-2 py-0.5 rounded border border-red-500/20">
                                            {n.date}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400 leading-relaxed max-w-4xl">
                                        {n.content}
                                    </p>
                                </div>
                                <div className="flex gap-6 mt-4 md:mt-0 md:ml-6 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                                    <button
                                        onClick={() => openModal("notices", n)}
                                        className="text-gray-600 hover:text-blue-400 transition-colors"
                                    >
                                        <Edit3 size={18} />
                                    </button>
                                    <button
                                        onClick={() => remove(n._id, "notices")}
                                        className="text-gray-600 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* MODAL */}
            {modal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:pl-60">
                    {/* The overlay background should still cover the whole screen, so we keep it absolute inset-0 */}
                    <div
                        className="absolute inset-0 bg-black/95 backdrop-blur-sm"
                        onClick={() => !actionLoading && setModal(false)}
                    />
                    <div className="relative bg-[#0d0d0d] border border-green-500/30 p-8 rounded w-full max-w-md shadow-2xl z-10">
                        <div className="flex items-center gap-2 mb-8">
                            <Cpu className="text-green-500" size={20} />
                            <h3 className="font-black text-xl text-white uppercase tracking-tighter">
                                {editId ? "Edit" : "Add"}_{type}
                            </h3>
                        </div>

                        <div className="space-y-5">
                            <div className="space-y-1">
                                <label className="text-[12px] text-gray-400 uppercase font-black tracking-widest">
                                    Entry Log Title
                                </label>
                                <input
                                    placeholder="Title..."
                                    value={form.title}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            title: e.target.value,
                                        })
                                    }
                                    className="w-full bg-[#050505] border border-white/10 p-3 text-xs text-white focus:border-green-500 outline-none rounded transition-all font-mono"
                                />
                            </div>

                            {type === "devLog" ? (
                                <>
                                    <div className="space-y-1">
                                        <label className="text-[12px] text-gray-400 uppercase font-black tracking-widest">
                                            Metric Value
                                        </label>
                                        <input
                                            placeholder="e.g. 99% / 100+"
                                            value={form.value}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    value: e.target.value,
                                                })
                                            }
                                            className="w-full bg-[#050505] border border-white/10 p-3 text-xs text-white focus:border-green-500 outline-none rounded font-mono"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[12px] text-gray-400 uppercase font-black tracking-widest">
                                            Brief Log
                                        </label>
                                        <input
                                            placeholder="Short Description..."
                                            value={form.description}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    description: e.target.value,
                                                })
                                            }
                                            className="w-full bg-[#050505] border border-white/10 p-3 text-xs text-white focus:border-green-500 outline-none rounded font-mono"
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="space-y-1">
                                        <label className="text-[12px] text-gray-400 uppercase font-black tracking-widest">
                                            Notice Content
                                        </label>
                                        <textarea
                                            placeholder="Broadcast message..."
                                            rows={4}
                                            value={form.content}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    content: e.target.value,
                                                })
                                            }
                                            className="w-full bg-[#050505] border border-white/10 p-3 text-xs text-white focus:border-red-600 outline-none rounded font-mono resize-none"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[12px] text-gray-400 uppercase font-black tracking-widest">
                                            Execution Date
                                        </label>
                                        <input
                                            type="date"
                                            value={form.date}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    date: e.target.value,
                                                })
                                            }
                                            className="w-full bg-[#050505] border border-white/10 p-3 text-xs text-white focus:border-red-600 outline-none rounded font-mono"
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="flex gap-4 mt-10">
                            <button
                                disabled={actionLoading}
                                onClick={() => setModal(false)}
                                className="flex-1 py-3 text-gray-200 uppercase text-[16px] font-black hover:text-white transition-all underline underline-offset-4"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={actionLoading}
                                onClick={save}
                                className="flex-1 py-3 bg-green-200 text-black font-black uppercase text-[16px] hover:bg-green-400 transition-all flex items-center justify-center gap-2"
                            >
                                {actionLoading ? (
                                    <Loader2 className="animate-spin w-4 h-4" />
                                ) : (
                                    "Confirm"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminHome;
