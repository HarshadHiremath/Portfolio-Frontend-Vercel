import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaTerminal,
    FaMicrochip,
    FaGlobe,
    FaCalendarAlt,
    FaUserCheck,
    FaQuoteLeft,
} from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import "./index.css";
import { useRef } from "react"; // NEW
import { useNavigate } from "react-router-dom"; // NEW

// Asset Imports
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

// --- Sub-Component: MetricItem for Visitor ---
const MetricItem = ({ icon, label, value, color, isLive }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="flex flex-col items-center lg:items-start group cursor-default"
    >
        <div
            className={`text-3xl mb-4 transition-transform duration-300 group-hover:scale-110 ${isLive ? "text-green-500" : "text-slate-600"}`}
        >
            {icon}
        </div>

        <p className="text-[12px] font-bold text-slate-200 tracking-[0.2em] uppercase mb-2 group-hover:text-green-400 transition-colors">
            {label}
        </p>

        <div className="relative">
            <p
                className={`text-xl md:text-3xl font-black tracking-tighter transition-all duration-300 ${color} group-hover:drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]`}
            >
                {value.toLocaleString()}
            </p>

            {isLive && (
                <div className="absolute -top-1 -right-4 flex flex-col items-center">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                </div>
            )}
        </div>

        {isLive && (
            <span className="text-[10px] font-bold text-green-500 mt-2 tracking-[0.2em] uppercase animate-pulse">
                Live_Feed
            </span>
        )}
    </motion.div>
);

const HomePage = () => {
    const navigate = useNavigate();

    const routes = ["/", "/project", "/codedev", "/about", "/contact"];

    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const touchStartTime = useRef(0);

    const minSwipeDistance = 120; // better than 200 (balanced)
    const maxSwipeTime = 500; // max time for swipe

    const onTouchStart = (e) => {
        const touch = e.targetTouches[0];

        touchStartX.current = touch.clientX;
        touchStartY.current = touch.clientY;
        touchStartTime.current = Date.now();
    };

    const onTouchEnd = (e) => {
        const touch = e.changedTouches[0];

        const deltaX = touch.clientX - touchStartX.current;
        const deltaY = touch.clientY - touchStartY.current;
        const deltaTime = Date.now() - touchStartTime.current;

        // ❌ Ignore vertical scroll
        if (Math.abs(deltaY) > Math.abs(deltaX)) return;

        // ❌ Ignore slow or short swipe
        if (Math.abs(deltaX) < minSwipeDistance || deltaTime > maxSwipeTime)
            return;

        const currentIndex = routes.indexOf(window.location.pathname);

        if (deltaX < 0) {
            // LEFT → NEXT
            const nextIndex = (currentIndex + 1) % routes.length;
            navigate(routes[nextIndex]);
        } else {
            // RIGHT → PREVIOUS
            const prevIndex =
                (currentIndex - 1 + routes.length) % routes.length;
            navigate(routes[prevIndex]);
        }
    };

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
    const [visitorStats, setVisitorStats] = useState({
        totalVisitors: 0,
        todayVisitors: 0,
        monthlyVisitors: 0,
        onlineVisitors: 0,
    });
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

    const trackVisitor = async () => {
        try {
            let sessionId = localStorage.getItem("sessionId");

            if (!sessionId) {
                sessionId = crypto.randomUUID();
                localStorage.setItem("sessionId", sessionId);
            }

            const data = {
                page: window.location.pathname,
                screenSize: `${window.screen.width}x${window.screen.height}`,
                sessionId: sessionId,
            };

            await fetch(
                `${import.meta.env.VITE_LOCALHOST}/api/home/visitors/track`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                },
            );
        } catch (error) {
            console.log("Visitor Tracking Error:", error);
        }
    };

    useEffect(() => {
        trackVisitor();
    }, []);

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

                const [journeyRes, noticesRes, linksRes, visitorRes] =
                    await Promise.all([
                        fetch(`${apiUrl}/api/home/devLog`),
                        fetch(`${apiUrl}/api/home/notices`),
                        fetch(`${apiUrl}/api/link`),
                        fetch(`${apiUrl}/api/home/visitors/stats`),
                    ]);

                const [journeyData, noticesData, linksData, visitorData] =
                    await Promise.all([
                        journeyRes.json(),
                        noticesRes.json(),
                        linksRes.json(),
                        visitorRes.json(),
                    ]);

                setJourneyStats(journeyData.data || []);
                setNotices([...(noticesData.data || [])].reverse());
                setLink(linksData || {});
                if (visitorData.success) {
                    setVisitorStats(visitorData.data);
                }
                setLoading(false);
            } catch (err) {
                console.error("Fetch error:", err);
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
        <div
            className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-green-500 selection:text-black"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            {/* 1. HERO SECTION */}
            <section className="relative pt-20 pb-20 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-12">
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

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-1 text-center md:text-left"
                    >
                        <div className="inline-block px-3 py-1 mb-4 border border-green-500/30 bg-green-500/10 rounded-full">
                            <span className="text-green-400 text-2xs font-medium uppercase tracking-tighter">
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
                            Driven by logic and powered by code.
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

            <section className="relative py-20 overflow-hidden bg-black border-y border-white/5">
                <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:3rem_3rem]" />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <FaQuoteLeft className="text-green-500/20 text-5xl mx-auto mb-6" />
                        <h2 className="text-2xl md:text-4xl font-light leading-relaxed italic text-slate-200">
                            "Success is not{" "}
                            <span className="text-green-500 font-mono not-italic">
                                Final,
                            </span>{" "}
                            failure is not{" "}
                            <span className="text-green-500 font-mono not-italic">
                                Fatal
                            </span>{" "}
                            : it is the courage to continue that{" "}
                            <span className="text-white font-bold underline decoration-green-500/50">
                                Counts
                            </span>
                            ."
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="inline-block w-[3px] h-[1em] bg-green-500 ml-2 align-middle"
                            />
                        </h2>
                        <p className="mt-6 text-xs font-mono text-slate-400 uppercase tracking-[0.3em]">
                            —— Winston Churchill
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. STATS GRID (Journey Log) */}
            <section className="py-15 px-6 max-w-7xl mx-auto relative">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* KNOWLEDGE BASE SECTION */}
                    <div className="lg:col-span-3">
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-2xl font-bold text-green-500 tracking-[0.1em] flex items-center gap-3 uppercase">
                                <FaMicrochip className="text-lg" />{" "}
                                Development_Logs
                            </h2>
                            <div className="h-px flex-1 bg-gradient-to-r from-green-500/30 to-transparent" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {journeyStats.map((stat, idx) => (
                                <motion.div
                                    key={stat._id}
                                    whileHover={{
                                        y: -5,
                                        borderColor: "rgba(34,197,94,0.5)",
                                    }}
                                    className="relative p-6 rounded-2xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.05)] group overflow-hidden transition-all duration-300"
                                >
                                    {/* Subtle Glow Background */}
                                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-green-500/5 blur-3xl group-hover:bg-green-500/10 transition-colors" />

                                    {/* Title */}
                                    <div className="flex justify-between items-start mb-4">
                                        <p className="text-[20px] font-bold text-green-500 uppercase tracking-widest bg-green-500/5 px-2 py-1 rounded">
                                            {stat.title}
                                        </p>
                                    </div>

                                    {/* Value */}
                                    <p className="text-4xl font-black text-white mb-3 tracking-tighter group-hover:text-green-400 transition-colors">
                                        {stat.value}
                                    </p>

                                    {/* Description */}
                                    <p className="text-sm font-medium text-justify text-slate-400 leading-relaxed line-clamp-3 group-hover:text-slate-300 transition-colors">
                                        {stat.description}
                                    </p>

                                    {/* Bottom Accent Line */}
                                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-green-500 group-hover:w-full transition-all duration-500" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* SYSTEM NOTICES BOARD */}
                    <div className="relative group">
                        {/* Outer Cyber Frame */}
                        <div className="absolute -inset-0.5 bg-gradient-to-b from-green-500/20 to-transparent rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />

                        <div className="relative h-full bg-[#0a0a0a] border border-white/10 rounded-2xl flex flex-col overflow-hidden">
                            {/* Header */}
                            <div className="p-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <h2 className="text-lg font-bold text-white tracking-widest uppercase">
                                        Announcements
                                    </h2>
                                </div>
                                <HiOutlineSpeakerphone className="text-slate-200 text-lg" />
                            </div>

                            {/* Notice List */}
                            <div className="flex-1 space-y-0 overflow-y-auto custom-scrollbar">
                                {notices.map((notice, idx) => (
                                    <div
                                        key={notice._id}
                                        className={`p-5 border-b border-white/5 hover:bg-green-500/[0.02] transition-colors ${idx === 0 ? "bg-green-500/[0.03]" : ""}`}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[14px] font-bold text-green-400/60 font-bold px-1.5 py-0.5 border border-green-500/20 rounded">
                                                NEW
                                            </span>
                                            <h3 className="text-xl font-bold text-slate-200 line-clamp-1">
                                                {notice.title}
                                            </h3>
                                        </div>

                                        <p className="text-sm text-medium text-slate-200 leading-relaxed mb-3 line-clamp-2">
                                            {notice.content}
                                        </p>

                                        <div className="flex items-center justify-between text-[12px] font-bold">
                                            <span className="text-green-500/70">
                                                {notice.date}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer Decor */}
                            <div className="p-3 bg-white/[0.02] text-center border-t border-white/5">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    Official Updates
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. PROJECT GALLERY */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col items-center mb-10">
                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                        Project_Gallery
                    </h2>
                    <div className="h-1 w-20 bg-green-500"></div>
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-video md:aspect-[20/6] border border-slate-800 shadow-2xl">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentSlide}
                            src={slides[currentSlide].image}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.7 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="w-full h-full object-cover transition-all duration-700 cursor-crosshair"
                        />
                    </AnimatePresence>
                </div>
            </section>

            {/* 4. SYSTEM TRAFFIC MONITOR */}
            <section className="pb-15 px-10 relative overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative group"
                    >
                        {/* Neon Background Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-[30px] blur-2xl opacity-50" />

                        {/* Main Container */}
                        <div className="relative bg-[#080808]/80 backdrop-blur-xl border border-white/10 rounded-[28px] p-10 md:p-16 overflow-hidden">
                            {/* Scanning Line Effect */}
                            <motion.div
                                animate={{ top: ["0%", "100%", "0%"] }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-green-500/40 to-transparent z-0 pointer-events-none"
                            />

                            {/* Section Header */}
                            <div className="flex flex-col md:flex-row justify-between items-center mb-2 gap-4 relative z-10">
                                <div>
                                    <h3 className="text-white font-black text-xl tracking-tighter uppercase">
                                        Visitor Analytics
                                    </h3>
                                </div>
                            </div>

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                                <MetricItem
                                    icon={<FaGlobe />}
                                    label="Total Visitors"
                                    value={visitorStats.totalVisitors}
                                    color="text-white"
                                />
                                <MetricItem
                                    icon={<FaCalendarAlt />}
                                    label="Daily Visitors"
                                    value={visitorStats.todayVisitors}
                                    color="text-white"
                                />
                                <MetricItem
                                    icon={<FaCalendarAlt />}
                                    label="Monthly Visitors"
                                    value={visitorStats.monthlyVisitors}
                                    color="text-white"
                                />
                                <MetricItem
                                    icon={<FaUserCheck />}
                                    label="Online Visitors"
                                    value={visitorStats.onlineVisitors}
                                    color="text-green-500"
                                    isLive
                                />
                            </div>

                            {/* System Load Bar */}
                            <div className="mt-1 pt-1 border-t border-white/5 relative z-10">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[12px] font-bold text-slate-300 uppercase tracking-widest">
                                        Server_Core_Load
                                    </span>
                                    <span className="text-[12px] font-bold text-green-500">
                                        75%
                                    </span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "72%" }}
                                        transition={{
                                            duration: 2,
                                            ease: "easeOut",
                                        }}
                                        className="h-full bg-gradient-to-r from-green-500 to-emerald-400 shadow-[0_0_10px_#22c55e]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Decorative Corner Accents */}
                        <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-green-500/30 rounded-tl-[28px]" />
                        <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-green-500/30 rounded-br-[28px]" />
                    </motion.div>
                </div>
            </section>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #22c55e; }
            `}</style>
        </div>
    );
};

export default HomePage;
