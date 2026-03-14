import React, { useEffect, useState } from "react";
import {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaEnvelope,
    FaPhone,
    FaTerminal,
    FaChevronUp,
} from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../../assets/LogoFooter.jpg";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [link, setLink] = useState({});

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_LOCALHOST}/api/link`,
                );
                if (!response.ok) throw new Error(`Failed to fetch links`);
                const data = await response.json();
                setLink(data);
            } catch (err) {
                console.error("Error fetching links:", err);
            }
        };
        fetchLinks();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative bg-[#050505] pt-10 pb-24 md:pb-10 px-6 overflow-hidden border-t border-green-200">
            {/* Ambient background glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-green-500/5 blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    {/* 1. BRAND SECTION */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center md:items-start text-center md:text-left"
                    >
                        <div className="relative group mb-6">
                            <div className="absolute -inset-1 bg-green-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                            <img
                                src={logo}
                                alt="Harshad"
                                className="relative h-20 w-20 rounded-full object-cover border-2 border-white/10 hover: transition-all duration-500"
                            />
                        </div>
                        <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-3">
                            Harshad
                            <span className="text-green-500">_Hiremath</span>
                        </h3>
                        <p className="text-slate-400 text-sm font-bold leading-relaxed max-w-xs">
                            Building scalable digital systems and architecting
                            clean logic for the next generation of web
                            technology.
                        </p>
                    </motion.div>

                    {/* 2. CONTACT_LOG SECTION */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col items-center"
                    >
                        <h3 className="text-sm font-bold text-green-500 uppercase tracking-[0.2em] mb-8">
                            // Connect
                        </h3>
                        <div className="space-y-4 w-full max-w-[290px]">
                            <a
                                href={`mailto:${link.gmail}`}
                                className="flex items-center gap-4 group p-3 rounded-xl bg-white/5 border border-white/5 hover:border-green-500/30 transition-all"
                            >
                                <FaEnvelope className="text-slate-500 group-hover:text-green-500" />
                                <span className="text-2xs font-sans text-slate-400 group-hover:text-white truncate">
                                    {link.gmail || "system_Loading"}
                                </span>
                            </a>
                            <a
                                href={`tel:${link.phone}`}
                                className="flex items-center gap-4 group p-3 rounded-xl bg-white/5 border border-white/5 hover:border-green-500/30 transition-all"
                            >
                                <FaPhone className="text-slate-500 group-hover:text-green-500" />
                                <span className="text-2xs font-sans text-slate-400 group-hover:text-white uppercase tracking-tighter">
                                    {link.phone || "secure_line"}
                                </span>
                            </a>
                        </div>
                    </motion.div>

                    {/* 3. SOCIALS SECTION */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-center md:items-end"
                    >
                        <h3 className="text-2xs font-bold text-green-500 uppercase tracking-[0.2em] mb-8">
                            Social_Matrix
                        </h3>
                        <div className="flex flex-wrap justify-center md:justify-end gap-4">
                            {[
                                {
                                    icon: <FaLinkedin />,
                                    href: link.linkedIn,
                                    color: "hover:bg-blue-600",
                                },
                                {
                                    icon: <FaGithub />,
                                    href: link.github,
                                    color: "hover:bg-white hover:text-black",
                                },
                                {
                                    icon: <FaTwitter />,
                                    href: link.twitter,
                                    color: "hover:bg-blue-400",
                                },
                                {
                                    icon: <FaInstagram />,
                                    href: link.instagram,
                                    color: "hover:bg-gradient-to-tr hover:from-purple-600 hover:to-pink-500",
                                },
                                {
                                    icon: <FaYoutube />,
                                    href: link.youtube,
                                    color: "hover:bg-red-600",
                                },
                            ].map(
                                (social, i) =>
                                    social.href && (
                                        <motion.a
                                            key={i}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ y: -5 }}
                                            className={`w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 transition-all ${social.color}`}
                                        >
                                            {social.icon}
                                        </motion.a>
                                    ),
                            )}
                        </div>

                        <button
                            onClick={scrollToTop}
                            className="mt-8 flex items-center gap-2 text-[14px] font-bold text-white hover:text-green-500 transition-colors uppercase tracking-widest"
                        >
                            &gt; Back_to_top <FaChevronUp />
                        </button>
                    </motion.div>
                </div>

                {/* BOTTOM BAR */}
                <div className="pt-8 border-t border-white/25 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <FaTerminal className="text-green-500 text-2xl animate-pulse" />
                        <p className="text-[12px] font-bold text-white uppercase tracking-widest">
                            © {currentYear} Harshad Hiremath ||
                            Powered_by_HARSGAD_GROUP
                        </p>
                    </div>
                    <div className="flex gap-6">
                        <span className="text-[10px] font-bold text-white uppercase tracking-tighter">
                            Status: Secure
                        </span>

                        <a
                            href="https://harshadhiremath.vercel.app/admin/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-bold text-green-400 uppercase tracking-tighter hover:text-green-300 transition-colors"
                        >
                            Admin: Harshad
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
