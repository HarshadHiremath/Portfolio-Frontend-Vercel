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
    Share2,
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
                                className="group relative bg-[#0a0a0a] border border-white/5 p-5 rounded hover:bg-white/[0.02] hover:border-green-500/30 transition-all duration-300 cursor-pointer overflow-hidden"
                            >
                                {/* Session ID Tag (Last 6 Digits) */}
                                <div className="absolute top-0 right-0 bg-green-500/10 px-3 py-1 text-[11px] text-green-500 font-black border-l border-b border-green-500/20 uppercase tracking-[0.2em]">
                                    #{v.sessionId?.slice(-8) || "000000"}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center">
                                    {/* IP & Location */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded bg-green-500/5 flex items-center justify-center border border-green-500/10 group-hover:border-green-500/40 transition-colors">
                                            <Globe
                                                size={18}
                                                className="text-green-500"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-[12px] text-gray-500 uppercase font-bold tracking-tight">
                                                Client Network
                                            </p>
                                            <p className="text-sm font-bold text-gray-200">
                                                {v.ip}
                                            </p>
                                            <p className="text-[12px] font-bold text-green-400">
                                                {v.city}, {v.region}
                                            </p>
                                        </div>
                                    </div>

                                    {/* System & Device */}
                                    <div className="flex items-center gap-3">
                                        <Monitor
                                            size={18}
                                            className="text-gray-600"
                                        />
                                        <div>
                                            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-tight">
                                                Platform
                                            </p>
                                            <p className="text-sm text-blue-400 font-bold truncate">
                                                {v.osName} / {v.browserName}
                                            </p>
                                            <p className="text-[11px] text-green-400 italic capitalize">
                                                {v.device}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Traffic Source */}
                                    <div className="flex items-center gap-3">
                                        <Share2
                                            size={18}
                                            className="text-gray-600"
                                        />
                                        <div>
                                            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-tight">
                                                Source
                                            </p>
                                            <p className="text-sm text-yellow-400 font-bold capitalize">
                                                {v.utmSource ||
                                                    "Direct Traffic"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Day & Time Formatting */}
                                    <div className="flex items-center gap-3">
                                        <Zap
                                            size={18}
                                            className="text-green-500/50"
                                        />
                                        <div>
                                            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">
                                                Last Activity
                                            </p>
                                            <p className="text-sm text-gray-200 font-bold">
                                                {new Date(
                                                    v.lastActivity,
                                                ).toLocaleDateString(
                                                    undefined,
                                                    {
                                                        weekday: "short",
                                                        day: "numeric",
                                                        month: "short",
                                                    },
                                                )}
                                            </p>
                                            <p className="text-[12px] text-gray-400">
                                                {new Date(
                                                    v.lastActivity,
                                                ).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Info */}
                                <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-4 font-bold items-center text-[11px] text-gray-200 uppercase tracking-widest">
                                    <span className="flex items-center gap-1">
                                        <Clock size={12} />{" "}
                                        {new Date(v.createdAt).toLocaleString()}
                                    </span>
                                    <span className="opacity-20">|</span>
                                    <span className="text-red-400">
                                        Provider:{" "}
                                        {v.org
                                            ?.split(" ")
                                            .slice(1, 3)
                                            .join(" ") || "Unknown ISP"}
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