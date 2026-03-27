import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    HiExternalLink,
    HiTerminal,
    HiLightningBolt,
    HiOutlineChatAlt2,
} from "react-icons/hi";
import { FaGithub, FaMicrochip } from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";
const ProjectsPage = () => {
    const [data, setData] = useState({
        projects: [],
        milestones: [],
        marquees: [],
        testimonials: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl =
                    import.meta.env.VITE_LOCALHOST || "http://localhost:3500";
                const endpoints = [
                    "api/project/projects",
                    "api/project/milestones",
                    "api/project/marquee",
                    "api/project/testimonials",
                ];
                const results = await Promise.all(
                    endpoints.map(async (endpoint) => {
                        const response = await fetch(`${apiUrl}/${endpoint}`);
                        const json = await response.json();

                        return {
                            endpoint,
                            data: Array.isArray(json.data) ? json.data : [],
                        };
                    }),
                );
                const newData = {
                    projects: [],
                    milestones: [],
                    marquees: [],
                    testimonials: [],
                };

                results.forEach(({ endpoint, data }) => {
                    if (endpoint.includes("projects")) newData.projects = data;
                    if (endpoint.includes("milestones"))
                        newData.milestones = data;
                    if (endpoint.includes("marquee")) newData.marquees = data;
                    if (endpoint.includes("testimonials"))
                        newData.testimonials = data;
                });

                setData(newData);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

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
                    INITIALIZING_PROJECT..!
                </p>
            </div>
        );

    return (
        <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-green-500 selection:text-black overflow-x-hidden">
            {/* 1. AMBIENT BACKGROUND (Synced with HomePage) */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 -left-20 w-96 h-96 bg-green-500/10 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-green-900/10 rounded-full blur-[150px]"></div>
            </div>

            {/* 2. STICKY MARQUEE - SYSTEM STATUS */}
            {data.marquees?.length > 0 && (
                <div className="sticky top-0 z-50 w-full border-b border-green-500/20 bg-black/80 backdrop-blur-md py-3 overflow-hidden">
                    <motion.div
                        animate={{ x: [0, -1000] }}
                        transition={{
                            repeat: Infinity,
                            duration: 30,
                            ease: "linear",
                        }}
                        className="flex gap-24 whitespace-nowrap items-center"
                    >
                        {[...data.marquees, ...data.marquees].map((m, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 group"
                            >
                                <HiLightningBolt className="text-green-500 animate-pulse" />
                                <span className="text-[12px] font-mono font-bold uppercase tracking-[0.1em] text-white">
                                    {m.text}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-6 relative z-10 py-16 md:py-24">
                {/* 3. HERO HEADER (Synced Typography) */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-32 text-center lg:text-left"
                >
                    <div className="inline-block px-3 py-1 mb-6 border border-green-500/30 bg-green-500/10 rounded-lg">
                        <span className="text-green-400 text-[10px] font-bold uppercase tracking-[0.3em]">
                            ● Production_Deployments
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tighter text-white uppercase italic leading-none">
                        PROJECT
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 block sm:inline">
                            _LOGS
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 font-bold max-w-2xl leading-relaxed">
                        <span className="text-green-500 font-bold">&gt;</span>{" "}
                        Real-world Applications
                        <span className="text-white font-semibold">
                            {" "}
                            POWERED_BY
                        </span>{" "}
                        Data and Logic
                    </p>
                </motion.header>

                {/* 4. PROJECTS GRID - NEON GLASS CARDS */}
                <section className="mb-40">
                    <div className="flex items-center gap-6 mb-16">
                        <h2 className="text-SL font-bold text-green-500 uppercase tracking-[0.2em] flex items-center gap-2">
                            <FaMicrochip /> PRODUCTION_DEPLOYMENTS
                        </h2>
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-green-500/30 to-transparent"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.projects?.map((project, index) => (
                            <motion.div
                                key={project._id}
                                whileHover={{ y: -10 }}
                                className="group relative flex flex-col h-[515px] bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl"
                            >
                                {/* Image with Scanning Effect (Synced with Profile) */}
                                <div className="relative h-56 shrink-0 overflow-hidden border-b border-white/10">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                                    />
                                    <motion.div
                                        animate={{ top: ["0%", "100%", "0%"] }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 4,
                                            ease: "linear",
                                        }}
                                        className="absolute left-0 right-0 h-[2px] bg-green-400/100 shadow-[0_0_15px_#4ade80] z-20 pointer-events-none"
                                    />
                                    <div className="absolute top-4 right-4 bg-black/80 px-3 py-1 text-[10px] font-bold text-green-500 border border-green-500/30 rounded">
                                        Project_0{index + 1}
                                    </div>
                                </div>

                                <div className="p-5 flex flex-col flex-grow overflow-hidden">
                                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors uppercase tracking-tight italic">
                                        {project.title}
                                    </h3>

                                    {/* Readability Focused Description Scroll */}
                                    <div className="flex-grow overflow-y-auto pr-2 custom-card-scroll mb-6">
                                        <p className="text-[13px] text-slate-400 text-justify leading-relaxed font-medium">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="mt-auto">
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {project.techStack?.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="text-[10px] font-bold px-2 py-1 bg-white/5 border border-white/10 text-slate-500 uppercase rounded tracking-widest group-hover:text-green-500/70 transition-colors"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between pt-1 border-t border-gray-800">
                                            {project.liveLink && (
                                                <a
                                                    href={project.liveLink}
                                                    target="_blank"
                                                    className="text-[11px] font-black text-green-500 flex items-center gap-2 tracking-[0.2em] uppercase hover:text-white transition-all"
                                                >
                                                    <HiExternalLink className="text-xl" />{" "}
                                                    LIVE
                                                </a>
                                            )}
                                            {project.githubLink && (
                                                <a
                                                    href={project.githubLink}
                                                    target="_blank"
                                                    className="p-2 text-slate-500 hover:text-white transition-all bg-white/5 rounded-lg border border-white/10"
                                                >
                                                    <FaGithub className="text-xl" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 5. TIMELINE - SYSTEM HISTORY */}
                <section className="mb-40 max-w-5xl mx-auto">
                    <div className="text-center mb-20">
                        <p className="text-[11px] font-bold text-green-500 tracking-[0.2em] uppercase mb-4">
                            Execution_Timeline
                        </p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                            MILESTONES
                            <span className="text-green-500 block sm:inline">
                                _HISTORY
                            </span>
                        </h2>
                    </div>

                    <div className="relative border-l-2 border-green-500/20 ml-4 md:ml-0">
                        {data.milestones?.map((m, idx) => (
                            <motion.div
                                key={m._id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="mb-20 last:mb-0 relative pl-12 group"
                            >
                                <div className="absolute -left-[11px] top-0 flex items-center justify-center">
                                    <div className="w-5 h-5 rounded-full bg-black border-2 border-green-500/50 group-hover:border-green-500 transition-colors"></div>
                                    <div className="absolute w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
                                </div>
                                <div className="bg-gradient-to-r from-white/5 to-transparent p-8 rounded-2xl border border-white/10 hover:border-green-500/30 transition-all">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                        <h3 className="text-2xl font-bold text-green-500 uppercase italic">
                                            {m.title}
                                        </h3>
                                        <span className="text-[12px] font-bold text-green-500 bg-green-500/10 px-4 py-1 rounded-full border border-green-500/30">
                                            [{m.date}]
                                        </span>
                                    </div>
                                    <p className="text-white leading-relaxed font-sans tracking-[0.05em]">
                                        {m.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 5. PEER_REVIEWS - DECRYPTED TRANSMISSIONS */}
                <section className="pb-32 px-6 max-w-7xl mx-auto relative">
                    {/* Section Header */}
                    <div className="flex flex-col items-center mb-15">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-[1px] w-12 bg-green-900/50"></div>
                            <span className="text-[12px] font-bold text-green-500 tracking-[0.5em] uppercase animate-pulse">
                                Uplink_Established
                            </span>
                            <div className="h-[1px] w-12 bg-green-900/50"></div>
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none text-center">
                            PEER
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 block sm:inline">
                                _REVIEWS
                            </span>
                        </h2>
                    </div>

                    {/* Testimonials Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {data.testimonials?.map((t, idx) => (
                            <motion.div
                                key={t._id}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="relative p-5 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-[2rem] flex flex-col group overflow-hidden backdrop-blur-sm"
                            >
                                {/* Background Decor: Massive Number Decal (Matches Stats Style) */}
                                <span className="absolute -top-6 -left-4 text-9xl font-black text-white/[0.02] pointer-events-none group-hover:text-green-500/[0.04] transition-colors duration-700">
                                    0{idx + 1}
                                </span>

                                {/* Cyber-Icon */}
                                <div className="relative z-10 mb-5">
                                    <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center group-hover:border-green-500/50 transition-all duration-500">
                                        <HiOutlineChatAlt2 className="text-2xl text-green-500" />
                                    </div>
                                </div>

                                {/* Quote Body - Focus on High Readability */}
                                <div className="relative z-10 flex-grow">
                                    <p className="text-lg md:text-xl text-slate-200 font-light italic leading-relaxed mb-1">
                                        <span className="text-green-500 font-serif text-3xl mr-2 leading-none">
                                            “
                                        </span>
                                        {t.quote}
                                        <span className="text-green-500 font-serif text-3xl ml-1 leading-none">
                                            ”
                                        </span>
                                    </p>
                                </div>

                                {/* Author Metadata (Synced with HomePage Journey Section) */}
                                <div className="relative z-10 flex items-center gap-5 pt-8 border-t border-white/5">
                                    <div className="relative shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/20 overflow-hidden">
                                            {/* Placeholder for Profile Icon or Avatar */}
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-green-500/20 to-black">
                                                <HiTerminal className="text-green-500 text-xl" />
                                            </div>
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
                                    </div>

                                    <div className="overflow-hidden">
                                        <p className="text-[10px] font-mono text-green-500/60 uppercase tracking-widest leading-none mb-1.5">
                                            Verified_Node
                                        </p>
                                        <p className="text-sm font-bold text-white tracking-tight truncate group-hover:text-green-400 transition-colors uppercase italic">
                                            {t.source}
                                        </p>
                                    </div>
                                </div>

                                {/* Hover Glow Accent (HomePage Style) */}
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>

            <style jsx>{`
                .custom-card-scroll::-webkit-scrollbar {
                    width: 3px;
                }
                .custom-card-scroll::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-card-scroll::-webkit-scrollbar-thumb {
                    background: rgba(34, 197, 94, 0.1);
                    border-radius: 10px;
                }
                .group:hover .custom-card-scroll::-webkit-scrollbar-thumb {
                    background: rgba(34, 197, 94, 0.4);
                }
            `}</style>
        </div>
    );
};

export default ProjectsPage;
