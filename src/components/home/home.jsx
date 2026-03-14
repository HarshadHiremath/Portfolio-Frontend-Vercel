import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaEnvelope,
    FaPhone,
    FaTerminal,
    FaCode,
    FaMicrochip,
} from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import Banner0 from "../../assets/Banner0.png";
import Banner1 from "../../assets/Banner1.jpg";
import Banner2 from "../../assets/Banner2.jpg";
import Banner3 from "../../assets/Banner3.jpg";
import Banner4 from "../../assets/Banner4.jpg";
import Banner5 from "../../assets/Banner5.jpg";
import Banner6 from "../../assets/Banner6.jpg";
import Banner7 from "../../assets/Banner7.jpg";
import Banner8 from "../../assets/Banner8.jpg";
import Banner9 from "../../assets/Banner9.jpg";

import Profile from "../../assets/Profile.png";
import "./index.css";

const HomePage = () => {
    const slides = [
        { image: Banner0, alt: "Project 0" },
        { image: Banner1, alt: "Project 1" },
        { image: Banner2, alt: "Project 2" },
        { image: Banner3, alt: "Project 3" },
        { image: Banner4, alt: "Project 4" },
        { image: Banner5, alt: "Project 5" },
        { image: Banner6, alt: "Project 6" },
        { image: Banner7, alt: "Project 7" },
        { image: Banner8, alt: "Project 8" },
        { image: Banner9, alt: "Project 9" },
    ];

    const [journeyStats, setJourneyStats] = useState([]);
    const [notices, setNotices] = useState([]);
    const [link, setLink] = useState({});
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);
    const [logIndex, setLogIndex] = useState(0);

    const loadingLogs = [
        "INITIALIZING_SYSTEM...",
        "ESTABLISHING_UPLINK...",
        "SYNCING_DATA_NODES...",
        "DECRYPTING_BIO_DATA...",
        "SYSTEM_READY_FOR_ACCESS",
    ];

    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setLogIndex((prev) => (prev + 1) % loadingLogs.length);
            }, 750);
            return () => clearInterval(interval);
        }
    }, [loading]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl =
                    import.meta.env.VITE_LOCALHOST || "http://localhost:3500";
                const [journeyRes, noticesRes, linksRes] =
                    await Promise.all([
                        fetch(`${apiUrl}/api/home/devLog`),
                        fetch(`${apiUrl}/api/home/notices`),
                        fetch(`${apiUrl}/api/link`),
                    ]);
                const [journeyData, noticesData, linksData] =
                    await Promise.all([
                        journeyRes.json(),
                        noticesRes.json(),
                        linksRes.json(),
                    ]);
                setJourneyStats([journeyData]);
                setNotices([...noticesData].reverse());
                setLink(linksData || {});
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [slides.length]);

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

                <div className="mt-4 h-8 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={logIndex}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                            className="font-bold tracking-[0.1em] uppercase text-xl text-center"
                        >
                            &gt; {loadingLogs[logIndex]}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>
        );

    return (
        <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-green-500 selection:text-black">
            {/* 1. HERO SECTION */}
            <section className="relative pt-20 pb-20 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Profile Image with Cyber-Frame */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative group"
                    >
                        <div className="absolute -inset-2 bg-green-500/20 rounded-2xl blur-xl group-hover:bg-green-500/40 transition duration-1000"></div>
                        <div className="relative bg-black p-2 rounded-2xl border border-green-500/50">
                            <img
                                src={Profile}
                                alt="Harshad"
                                className="w-56 h-56 md:w-72 md:h-72 rounded-xl object-cover hover:grayscale transition-all duration-500"
                            />
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-1 text-center md:text-left"
                    >
                        <div className="inline-block px-3 py-1 mb-4 border border-green-500/30 bg-green-500/10 rounded-full">
                            <span className="text-green-400 text-xs font-medium uppercase tracking-tighter">
                                ● PICT, Pune '26
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
                            Harshad{" "}
                            <span className="text-green-500">Hiremath</span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-400 font-medium mb-6 max-w-2xl leading-relaxed">
                            Software Engineer &{" "}
                            <span className="text-white">DSA Enthusiast</span>.
                            Driven by logic and powered by code, I transform
                            complex real-world problems into efficient,
                            impactful software systems.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <motion.a
                                whileHover={{ y: -2 }}
                                href={link.resume}
                                className="px-8 py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded-lg transition-all flex items-center gap-2"
                            >
                                <FaTerminal className="text-sm" /> VIEW_RESUME
                            </motion.a>
                            <motion.a
                                whileHover={{ y: -2 }}
                                href="/contact"
                                className="px-8 py-3 border border-slate-700 hover:border-green-500 text-slate-300 hover:text-green-400 font-bold rounded-lg transition-all"
                            >
                                CONTACT_ME
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. System Intercept (Quote Section) */}
            <section className="relative py-5 overflow-hidden bg-black">
                {/* 1. Advanced Grid Layer - Subtle and modern */}
                <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

                {/* 2. Soft Radial Glow for depth */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="max-w-4xl mx-auto px-6 text-center relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="space-y-10"
                    >
                        {/* Header / Decoder Label */}
                        <div className="flex items-center justify-center gap-3 opacity-70">
                            <div className="h-[1px] w-8 bg-green-500"></div>
                            <span className="text-[12px] font-mono text-green-400 tracking-[0.3em] uppercase">
                                Intercept_ID: 1121-HGI
                            </span>
                            <div className="h-[1px] w-8 bg-green-500"></div>
                        </div>

                        {/* The Quote: High Contrast & Refined Typography */}
                        <h2 className="text-3xl md:text-5xl font-light leading-[1.3] text-slate-200 tracking-tight">
                            "Life isn’t{" "}
                            <span className="text-green-500/80 font-mono italic">
                                fair
                            </span>
                            . But that doesn’t mean you can’t{" "}
                            <br className="hidden md:block" />
                            <span className="relative inline-block mt-2">
                                fight for
                                <span className="text-white font-medium ml-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                    Fairness.
                                </span>
                                <motion.span
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1,
                                    }}
                                    className="inline-block w-[3px] h-[1em] bg-green-500 ml-2 align-middle"
                                />
                            </span>
                        </h2>

                        {/* Author Attribution */}
                        <div className="pt-4 flex flex-col items-center gap-2">
                            <p className="text-sm font-mono text-slate-200 uppercase tracking-[0.2em]">
                                — Malala Yousafzai
                            </p>
                            <div className="flex gap-1">
                                <div className="w-1 h-1 bg-green-900 rounded-full"></div>
                                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                                <div className="w-1 h-1 bg-green-900 rounded-full"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. STATS GRID (Journey Log) */}
            <section className="py-16 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-3">
                        <h2 className="text-sm font-bold text-green-500 mb-6 flex items-center gap-2 tracking-[0.3em]">
                            <FaMicrochip /> // KNOWLEDGE_BASE
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {journeyStats.map((stat) => (
                                <div
                                    key={stat._id}
                                    className="p-6 rounded-xl bg-[#0f0f0f] border border-slate-800 hover:border-green-500/50 transition-all group"
                                >
                                    <p className="text-4xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                                        {stat.value}
                                    </p>
                                    <p className="text-xs font-bold text-blue-100 uppercase tracking-widest leading-tight">
                                        {stat.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3. NOTICES (System Updates) */}
                    <div className="bg-[#0f0f0f] border border-slate-800 rounded-xl p-6 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xs font-bold text-green-500 tracking-widest uppercase">
                                Latest_Logs
                            </h2>
                            <HiOutlineSpeakerphone className="text-slate-700 text-xl" />
                        </div>
                        <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {notices.map((notice) => (
                                <div
                                    key={notice._id}
                                    className="border-l-2 border-green-500/30 pl-4"
                                >
                                    <h3 className="text-[16px] font-bold mb-1 text-green-500">
                                        {notice.title}
                                    </h3>
                                    <p className="text-xs font-bold text-slate-200 mb-2 leading-relaxed">
                                        {notice.content}
                                    </p>
                                    <span className="text-[12px] font-bold text-green-500">
                                        {notice.date}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. PROJECT VISUALS */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col items-center mb-10">
                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                        Project_Gallery
                    </h2>
                    <div className="h-1 w-20 bg-green-500"></div>
                </div>

                <div className="relative rounded-2xl overflow-hidden aspect-video md:aspect-[21/9] border border-slate-800 shadow-2xl">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentSlide}
                            src={slides[currentSlide].image}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.7 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 cursor-crosshair"
                        />
                    </AnimatePresence>
                </div>
            </section>

            {/* 6. VISIT COUNT BOX - SYSTEM TRAFFIC MONITOR */}
            <section className="pb-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative group overflow-hidden rounded-2xl bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5 border border-white/5 p-[1px]"
                    >
                        {/* Inner Content */}
                        <div className="bg-[#080808]/90 backdrop-blur-xl rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                            {/* Left Side: Status & Label */}
                            <div className="flex items-center gap-5">
                                <div className="relative">
                                    {/* Heartbeat Pulse Effect */}
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold tracking-tight text-lg">
                                        System Traffic
                                    </h4>
                                    <p className="text-white font-bold text-[12px] uppercase tracking-[0.2em]">
                                        Live_User_Metrics
                                    </p>
                                </div>
                            </div>

                            {/* Center: The Count with Neon Glow */}
                            <div className="flex flex-col items-center md:items-end">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-white font-bold text-sm uppercase tracking-tighter">
                                        Total_Hits:
                                    </span>
                                    <span className="text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(34,197,94,0.3)] tracking-tighter">
                                        {/* You can replace this static number with your dynamic visitor variable */}
                                        1,121
                                    </span>
                                </div>
                                <div className="h-1 w-full max-w-[120px] bg-white/5 mt-2 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "70%" }}
                                        transition={{
                                            duration: 1.5,
                                            ease: "easeOut",
                                        }}
                                        className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                                    />
                                </div>
                            </div>

                            {/* Right Side: Network Tag */}
                            <div className="hidden lg:block border-l border-white/10 pl-8">
                                <div className="text-[12px] font-bold text-slate-500 space-y-1">
                                    <p className="flex justify-between gap-4">
                                        <span>STP:</span>{" "}
                                        <span className="text-green-500">
                                            SECURE
                                        </span>
                                    </p>
                                    <p className="flex justify-between gap-4">
                                        <span>LATENCY:</span>{" "}
                                        <span className="text-green-500">
                                            12ms
                                        </span>
                                    </p>
                                    <p className="flex justify-between gap-4">
                                        <span>REGION:</span>{" "}
                                        <span className="text-green-500">
                                            GLOBAL
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Subtle decorative "glitch" corner */}
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-500/20 rounded-tr-2xl group-hover:border-green-500/50 transition-colors"></div>
                    </motion.div>
                </div>
            </section>

            {/* CSS for custom scrollbar in notices */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #1a1a1a;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #22c55e;
                }
            `}</style>
        </div>
    );
};

export default HomePage;
