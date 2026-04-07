// import React from "react";

// const AdminDashboard = () => {
//   return (

//     <div>

//       <h2 className="text-2xl font-bold mb-6 text-green-400">
//         Dashboard Overview
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//         <div className="bg-[#0f0f0f] p-6 rounded-xl border border-green-500/20">
//           <h3 className="text-lg font-semibold">Projects</h3>
//           <p className="text-3xl mt-2">12</p>
//         </div>

//         <div className="bg-[#0f0f0f] p-6 rounded-xl border border-green-500/20">
//           <h3 className="text-lg font-semibold">Blogs</h3>
//           <p className="text-3xl mt-2">8</p>
//         </div>

//         <div className="bg-[#0f0f0f] p-6 rounded-xl border border-green-500/20">
//           <h3 className="text-lg font-semibold">Messages</h3>
//           <p className="text-3xl mt-2">24</p>
//         </div>

//       </div>

//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Terminal,
    Activity,
    Globe,
    Monitor,
    Smartphone,
    Cpu,
    ShieldCheck,
    ShieldAlert,
    Zap,
    MousePointer2,
    Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_LOCALHOST || "http://localhost:3500";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [visitors, setVisitors] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchVisitors = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API}/api/home/visitors/visitors`);
            const data = await res.json();
            if (data.success) {
                // Reverse to show latest visitors first
                setVisitors([...data.data]);
            }
        } catch (error) {
            console.error("Visitor fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVisitors();
    }, []);

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
        <div className="min-h-screen bg-[#050505] text-gray-300 font-mono p-1 md:p-1 selection:bg-green-500/30">
            {/* Header */}
            <header className="max-w-7xl mx-auto mb-12 flex items-center justify-between border-b border-white/5 pb-6">
                <div className="flex items-center gap-3">
                    <Activity className="text-green-500 animate-pulse" />
                    <h1 className="text-2xl font-black uppercase text-white tracking-tighter">
                        Traffic
                        <span className="text-green-500">_Intelligence</span>
                    </h1>
                </div>
                <div className="hidden md:flex gap-6 text-[12px] text-gray-400 uppercase font-black">
                    <span>Packets_Captured: {visitors.length}</span>
                    <span>Status: Monitoring</span>
                </div>
            </header>

            <main className="max-w-7xl mx-auto">
                {/* Section Title */}
                <div className="mb-8 flex items-end gap-4 border-l-2 border-green-500 pl-4">
                    <div>
                        <h2 className="text-green-500 text-[12px] font-bold uppercase tracking-[0.1em]">
                            Signal_Intercept
                        </h2>
                        <p className="text-xl text-white font-bold uppercase tracking-tight">
                            Active Visitor Logs
                        </p>
                    </div>
                </div>

                {/* Visitor Grid */}
                <div className="grid grid-cols-1 gap-4">
                    <AnimatePresence>
                        {visitors.map((v, index) => (
                            <motion.div
                                onClick={() => navigate(`../visitor/${v._id}`)}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                key={v._id}
                                className="group relative bg-[#0a0a0a] border border-white/5 p-5 rounded hover:bg-white/[0.02] hover:border-green-500/30 transition-all duration-300"
                            >
                                {/* Session ID Tag */}
                                <div className="absolute top-0 right-0 bg-green-500/10 px-3 py-1 text-[12px] text-green-500 font-black border-l border-b border-green-500/20 uppercase">
                                    Session_{v.sessionId?.slice(-6) || "NULL"}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center">
                                    {/* IP & City */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded bg-green-500/5 flex items-center justify-center border border-green-500/10 group-hover:border-green-500/40">
                                            <Globe
                                                size={18}
                                                className="text-green-500"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-[12px] text-gray-400 uppercase font-bold">
                                                Client IP
                                            </p>
                                            <p className="text-sm font-bold text-gray-200 tracking-wider">
                                                {v.ip} ({v.city || "Unknown"})
                                            </p>
                                        </div>
                                    </div>

                                    {/* OS & Browser */}
                                    <div className="flex items-center gap-3">
                                        <Cpu
                                            size={18}
                                            className="text-gray-600"
                                        />
                                        <div className="min-w-0">
                                            <p className="text-[12px] text-gray-400 font-bold uppercase">
                                                System OS
                                            </p>
                                            <p className="text-sm text-gray-200 font-bold truncate uppercase">
                                                {v.osName} / {v.browserName}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Session ID (Full) */}
                                    <div className="flex items-center gap-3">
                                        <Monitor
                                            size={18}
                                            className="text-gray-600"
                                        />
                                        <div>
                                            <p className="text-[12px] font-bold text-gray-400 uppercase">
                                                Session ID
                                            </p>
                                            <p className="text-xs font-bold text-gray-200 truncate max-w-[180px]">
                                                {v.sessionId}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Last Activity */}
                                    <div className="flex items-center gap-3 md:hidden lg:flex">
                                        <Zap
                                            size={18}
                                            className="text-gray-600"
                                        />
                                        <div>
                                            <p className="text-[12px] font-bold text-gray-400 uppercase">
                                                Last Active
                                            </p>
                                            <p className="text-[10px] text-gray-200 uppercase">
                                                {new Date(
                                                    v.lastActivity,
                                                ).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest">
                                    <span className="flex items-center gap-1">
                                        <Clock size={14} /> Created:{" "}
                                        {new Date(v.createdAt).toLocaleString()}
                                    </span>
                                    <span className="truncate max-w-[200px] md:max-w-md">
                                        City: {v.city || "Unknown"}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
