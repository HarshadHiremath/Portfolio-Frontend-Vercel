import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    HiTerminal,
    HiAcademicCap,
    HiBriefcase,
    HiBadgeCheck,
    HiChip,
    HiExternalLink,
} from "react-icons/hi";
import { BiLoaderCircle } from "react-icons/bi";
import { FaTrophy } from "react-icons/fa"; // Fixed HiTrophy error

const AboutPage = () => {
    const [sections, setSections] = useState({
        education: [],
        experience: [],
        certifications: [],
        achievements: [],
        skills: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const apiUrl =
                    import.meta.env.VITE_LOCALHOST || "http://localhost:3500";
                const sectionTypes = [
                    "education",
                    "experience",
                    "certifications",
                    "achievements",
                    "skills",
                ];

                const promises = sectionTypes.map(async (type) => {
                    const response = await fetch(`${apiUrl}/api/about/${type}`);
                    if (!response.ok)
                        throw new Error(`Failed to fetch ${type}`);
                    const data = await response.json();
                    return { type, data: Array.isArray(data) ? data : [] };
                });

                const results = await Promise.all(promises);
                const newSections = results.reduce((acc, { type, data }) => {
                    acc[type] = data;
                    return acc;
                }, {});
                setSections(newSections);
            } catch (err) {
                setError(err.message || "Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    };

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
                    &gt; ACCESSING_DEV_HISTORY
                </p>
            </div>
        );

    return (
        <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-green-500 selection:text-black overflow-x-hidden">
            {/* BACKGROUND DECORATION */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 -left-20 w-96 h-96 bg-green-500/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 -right-20 w-96 h-96 bg-green-900/5 blur-[120px] rounded-full"></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 relative z-10 py-16 md:py-24">
                {/* PAGE HEADER */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-32 text-center lg:text-left"
                >
                    <div className="inline-block px-3 py-1 mb-6 border border-green-500/20 bg-green-500/5 rounded-lg">
                        <span className="text-green-400 text-[12px] font-bold uppercase tracking-[0.2em]">
                            ● System_User: Harshad_Hiremath
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tighter text-white uppercase italic leading-none">
                        {/* First Word (e.g., ABOUT, PROJECT, CODING) */}
                        ABOUT
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 block sm:inline">
                            {/* Second Word with Underscore */}
                            _ME
                        </span>
                    </h1>
                    <p className="max-w-xl text-slate-400 text-lg font-bold leading-relaxed">
                        <span className="text-green-500 font-bold">&gt;</span>{" "}
                        Decompiling Academic Records and
                        <span className="text-white">
                            {" "}
                            Industry Execution
                        </span>{" "}
                        History.
                    </p>
                </motion.header>

                {/* EDUCATION & EXPERIENCE DATA STREAMS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
                    {/* Education Section */}
                    <motion.section
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {/* Header with Terminal Icon */}
                        <div className="flex items-center gap-4 mb-12 group">
                            <div className="relative">
                                <div className="absolute -inset-2 bg-green-500/20 rounded-full blur-md group-hover:bg-green-500/40 transition duration-500"></div>
                                <HiAcademicCap className="relative text-green-500 text-3xl md:text-4xl transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-[12px] font-mono font-bold text-green-500 uppercase tracking-[0.2em] leading-none mb-1">
                                    System_Education
                                </h2>
                                <span className="text-2xl font-black text-white italic uppercase tracking-tighter">
                                    Academic
                                    <span className="text-green-500">_Log</span>
                                </span>
                            </div>
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-green-500/40 via-green-500/10 to-transparent"></div>
                        </div>

                        {/* Timeline Path */}
                        <div className="relative border-l-2 border-dashed border-white/5 ml-4 md:ml-6 space-y-12">
                            {sections.education.map((edu) => (
                                <motion.div
                                    key={edu._id}
                                    variants={itemVariants}
                                    className="relative pl-10 group"
                                >
                                    {/* Glowing Timeline Node */}
                                    <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-[#050505] border-2 border-green-500 group-hover:shadow-[0_0_15px_#22c55e] transition-all duration-500 z-10">
                                        <div className="absolute inset-1 bg-green-500 rounded-full animate-pulse"></div>
                                    </div>

                                    {/* Glass Data Card */}
                                    <div className="bg-[#0a0a0a]/80 border border-white/10 p-6 md:p-8 rounded-2xl hover:border-green-500/40 transition-all duration-500 backdrop-blur-xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                                            <HiAcademicCap className="text-4xl text-white" />
                                        </div>

                                        <span className="inline-block px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[12px] font-bold text-green-400 mb-4 tracking-widest uppercase">
                                            {edu.duration}
                                        </span>

                                        <h3 className="text-xl font-black text-white mb-2 group-hover:text-green-400 transition-colors uppercase italic tracking-tight">
                                            {edu.institution}
                                        </h3>

                                        <p className="text-sm font-bold text-slate-500 mb-4 tracking-tighter uppercase">
                                            Score :  {" "}
                                            <span className="text-white">
                                                {edu.score}
                                            </span>
                                        </p>

                                        <div
                                            className="text-[16px] text-slate-400 text-justify leading-relaxed font-light prose-invert selection:bg-green-500/30"
                                            dangerouslySetInnerHTML={{
                                                __html: edu.description,
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Experience Section */}
                    <motion.section
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {/* Header with Briefcase Icon */}
                        <div className="flex items-center gap-4 mb-12 group">
                            <div className="relative">
                                <div className="absolute -inset-2 bg-green-500/20 rounded-full blur-md group-hover:bg-green-500/40 transition duration-500"></div>
                                <HiBriefcase className="relative text-green-500 text-3xl md:text-4xl transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-[12px] font-bold font-bold text-green-500 uppercase tracking-[0.2em] leading-none mb-1">
                                    Professional_Experience
                                </h2>
                                <span className="text-2xl font-black text-white italic uppercase tracking-tighter">
                                    Experience
                                    <span className="text-green-500">
                                        _Internship
                                    </span>
                                </span>
                            </div>
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-green-500/40 via-green-500/10 to-transparent"></div>
                        </div>

                        {/* Timeline Path */}
                        <div className="relative border-l-2 border-dashed border-white/5 ml-4 md:ml-6 space-y-12">
                            {sections.experience.map((exp) => (
                                <motion.div
                                    key={exp._id}
                                    variants={itemVariants}
                                    className="relative pl-10 group"
                                >
                                    {/* Glowing Timeline Node */}
                                    <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-[#050505] border-2 border-green-500 group-hover:shadow-[0_0_15px_#22c55e] transition-all duration-500 z-10">
                                        <div className="absolute inset-1 bg-green-500 rounded-full animate-pulse"></div>
                                    </div>

                                    {/* Glass Data Card */}
                                    <div className="bg-[#0a0a0a]/80 border border-white/10 p-6 md:p-8 rounded-2xl hover:border-green-500/40 transition-all duration-500 backdrop-blur-xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                                            <HiBriefcase className="text-4xl text-white" />
                                        </div>

                                        <span className="inline-block px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[12px] font-bold text-green-400 mb-4 tracking-widest uppercase">
                                            {exp.duration}
                                        </span>

                                        <h3 className="text-xl font-black text-white mb-4 group-hover:text-green-400 transition-colors uppercase italic tracking-tight">
                                            {exp.role}
                                        </h3>

                                        <div
                                            className="text-[16px] text-slate-400 leading-relaxed font-light prose-invert selection:bg-green-500/30"
                                            dangerouslySetInnerHTML={{
                                                __html: exp.description,
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                </div>

                {/* SKILLS PROCESSOR GRID */}
                <section className="mb-32">
                    <div className="flex items-center gap-6 mb-12">
                        <HiChip className="text-green-500 text-2xl" />
                        <h2 className="text-2xs font-bold text-green-500 uppercase tracking-[0.2em]">
                            Skills_&_Tools
                        </h2>
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-green-500/30 to-transparent"></div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
                        {sections.skills.map((skill) => (
                            <motion.div
                                key={skill._id}
                                whileHover={{ y: -5 }}
                                className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl flex flex-col items-center group hover:border-green-500/90 relative overflow-hidden"
                            >
                                {/* Scanning Line Effect */}
                                <motion.div
                                    animate={{ top: ["0%", "100%", "0%"] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1,
                                        ease: "linear",
                                    }}
                                    className="absolute left-0 right-0 h-[2px] bg-green-500/30 z-10 pointer-events-none opacity-0 group-hover:opacity-100"
                                />
                                <div className="relative mb-4">
                                    {skill.logo ? (
                                        <img
                                            src={skill.logo}
                                            alt={skill.name}
                                            className="w-12 h-12 object-contain group-hover: transition-all"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-full font-bold text-green-500">
                                            {skill.name?.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <p className="text-[14px] font-bold text-white uppercase tracking-widest text-center group-hover:text-slate-200 transition-colors">
                                    {skill.name}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CERTIFICATIONS & ACHIEVEMENTS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    {/* Certifications */}
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <HiBadgeCheck className="text-green-500 text-2xl" />
                            <h2 className="text-2xs font-bold text-green-500 uppercase tracking-[0.2em]">
                                Certifications
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {sections.certifications.map((cert) => (
                                <div
                                    key={cert._id}
                                    className="bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/[0.07] transition-all flex items-center justify-between group"
                                >
                                    <div className="flex items-center gap-4">
                                        {cert.logo && (
                                            <img
                                                src={cert.logo}
                                                className="w-12 h-12 object-contain"
                                                alt=""
                                            />
                                        )}
                                        <h4 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors uppercase tracking-tight">
                                            {cert.title}
                                        </h4>
                                    </div>
                                    {cert.link && (
                                        <a
                                            href={cert.link}
                                            target="_blank"
                                            className="text-slate-500 hover:text-green-500 transition-colors"
                                        >
                                            <HiExternalLink className="text-2xl" />
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Achievements */}
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <FaTrophy className="text-green-500 text-xl" />
                            <h2 className="text-2xs font-bold text-green-500 uppercase tracking-[0.2em]">
                                Achievements
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {sections.achievements.map((ach) => (
                                <div
                                    key={ach._id}
                                    className="bg-white/5 border border-white/10 p-5 rounded-xl flex items-start gap-4 hover:border-green-500/20 transition-all"
                                >
                                    <div className="w-5 h-2 rounded-full bg-green-500 mt-2 shadow-[0_0_5px_#22c55e]"></div>
                                    <div>
                                        <div className="flex justify-between items-start gap-4">
                                        <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight italic">
                                            {ach.title}
                                        </h4>
                                        <span className="text-[14px] font-bold font-bold text-green-500 tracking-widest">
                                                Year : {ach.year || "2026"}
                                            </span>
                                        </div>
                                        <div
                                            className="text-[16px] text-slate-500 font-bold prose-invert leading-relaxed"
                                            dangerouslySetInnerHTML={{
                                                __html: ach.description,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;


