import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    HiTerminal,
    HiLightningBolt,
    HiCode,
    HiBadgeCheck,
} from "react-icons/hi";
import { FaCode } from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";

const CodingProfilesPage = () => {
    const [data, setData] = useState({ profiles: [], badges: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);

            const apiUrl =
                import.meta.env.VITE_LOCALHOST || "http://localhost:3500";

            const endpoints = ["profiles", "badges"];

            const promises = endpoints.map(async (endpoint) => {
                const response = await fetch(`${apiUrl}/api/codeDev/${endpoint}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch ${endpoint}`);
                }

                const result = await response.json();

                return {
                    endpoint,
                    data: Array.isArray(result.data) ? result.data : []
                };
            });

            const results = await Promise.all(promises);

            const newData = results.reduce((acc, { endpoint, data }) => {
                acc[endpoint] = data;
                return acc;
            }, {});

            setData(newData);

        } catch (err) {
            setError(err.message || "Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, []);

    const totalQuestionsSolved = data.profiles.reduce(
        (sum, profile) => sum + (profile.questionsSolved || 0),
        0,
    );

    if (loading)
        return (
            <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center font-mono text-green-500">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                    }}
                >
                    <BiLoaderCircle className="text-6xl" />
                </motion.div>
                <p className="mt-4 font-bold tracking-[0.1em] uppercase text-xl">
                    &gt; ACCESSING_PROFILES..!
                </p>
            </div>
        );

    return (
        <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-green-500 selection:text-black overflow-x-hidden">
            {/* 1. AMBIENT BACKGROUND GLOWS */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 -left-20 w-96 h-96 bg-green-500/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 -right-20 w-96 h-96 bg-green-900/5 blur-[120px] rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 py-16 md:py-24">
                {/* 2. HEADER SECTION */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20 text-center lg:text-left"
                >
                    <div className="inline-block px-3 py-1 mb-6 border border-green-500/20 bg-green-500/5 rounded-lg">
                        <span className="text-green-500 text-[12px] font-bold uppercase tracking-[0.2em]">
                            ● PROBLEM_SOLVING_MATRIX
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tighter text-white uppercase italic leading-none">
                        CODING
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 block sm:inline">
                            _PROFILES
                        </span>
                    </h1>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <p className="max-w-xl text-slate-400 text-lg font-bold leading-relaxed">
                            <span className="text-green-500 font-mono">
                                &gt;
                            </span>{" "}
                            Life is Unpredictable and Unfair, Yet We Still Find Reasons to{" "}
                            <span className="text-white">Solve Problems</span>
                            .
                        </p>


                        {/* Total Stats Card */}
                        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md min-w-[280px]">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-500/10 rounded-xl">
                                    <HiCode className="text-green-500 text-2xl" />
                                </div>
                                <div>
                                    <p className="text-[12px] font-bold text-white uppercase tracking-widest">
                                        Total_Solved
                                    </p>
                                    <p className="text-4xl font-black text-white">
                                        {totalQuestionsSolved}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.header>

                {/* 3. PROFILES GRID */}
                <section className="mb-32">
                    <div className="flex items-center gap-6 mb-15">
                        <h2 className="text-2xs font-bold text-green-500 uppercase tracking-[0.2em] whitespace-nowrap">
                            Platform_Nodes
                        </h2>
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-green-500/30 to-transparent"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.profiles.map((profile, index) => (
                            <motion.div
                                key={profile._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -8 }}
                                className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 overflow-hidden hover:border-green-500/40 transition-all duration-500"
                            >
                                {/* Background Scan Effect */}
                                <motion.div
                                    animate={{ top: ["0%", "100%", "0%"] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 5,
                                        ease: "linear",
                                    }}
                                    className="absolute left-0 right-0 h-[3px] bg-green-500/50 z-0 pointer-events-none"
                                />

                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="relative mb-6">
                                        <div className="absolute -inset-2 bg-green-500/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        {profile.logo ? (
                                            <img
                                                src={profile.logo}
                                                alt={profile.platform}
                                                className="w-16 h-16 object-contain group-hover:grayscale transition-all"
                                            />
                                        ) : (
                                            <FaCode className="text-5xl text-slate-700" />
                                        )}
                                    </div>

                                    <h3 className="text-2xl font-bold text-green-500 mb-6 uppercase tracking-tight">
                                        {profile.platform}
                                    </h3>

                                    <div className="w-full space-y-3 mb-8">
                                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                            <span className="text-[10px] font-mono text-slate-500 uppercase">
                                                Username
                                            </span>
                                            <span className="text-sm font-medium text-slate-200 uppercase">
                                                {profile.username}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                            <span className="text-[10px] font-mono text-slate-500 uppercase">
                                                Solved
                                            </span>
                                            <span className="text-sm font-black text-green-400">
                                                {profile.questionsSolved}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                            <span className="text-[10px] font-mono text-slate-500 uppercase">
                                                Global_Rank
                                            </span>
                                            <span className="text-sm font-medium text-slate-200">
                                                #{profile.rank}
                                            </span>
                                        </div>
                                    </div>

                                    <a
                                        href={profile.profileLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-3 bg-white/5 border border-white/10 font-bold hover:bg-green-500 hover:text-black hover:font-bold rounded-xl text-center text-xs font-mono transition-all tracking-widest uppercase"
                                    >
                                        View_Coding_Profile
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 4. BADGES SECTION */}
                <section className="mb-5">
                    <div className="flex items-center gap-6 mb-12">
                        <div className="h-[1px] flex-1 bg-gradient-to-l from-green-500/30 to-transparent"></div>
                        <h2 className="text-2xs font-bold text-green-500 uppercase tracking-[0.2em] whitespace-nowrap">
                            Achievement_Tokens
                        </h2>
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-green-500/30 to-transparent"></div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {data.badges.map((badge, index) => (
                            <motion.div
                                key={badge._id}
                                whileHover={{ scale: 1.05 }}
                                className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center group hover:border-green-500/30 transition-all"
                            >
                                <div className="relative mb-4">
                                    <HiBadgeCheck className="absolute -top-1 -right-1 text-green-500 text-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {badge.logo ? (
                                        <img
                                            src={badge.logo}
                                            alt={badge.name}
                                            className="w-14 h-14 object-contain group-hover: transition-all"
                                        />
                                    ) : (
                                        <HiLightningBolt className="text-4xl text-slate-800" />
                                    )}
                                </div>
                                <p className="text-2xs font-bold text-white mb-1 uppercase tracking-tight">
                                    {badge.name}
                                </p>
                                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                                    {badge.platform}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(34, 197, 94, 0.2);
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
};

export default CodingProfilesPage;
