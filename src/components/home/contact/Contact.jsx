import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaLinkedin,
    FaGithub,
    FaTwitter,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaSatellite,
} from "react-icons/fa";
import { useRef } from "react"; // NEW
import { useNavigate } from "react-router-dom"; // NEW

const Contact = () => {
    const navigate = useNavigate(); // NEW

    const routes = ["/", "/project", "/codedev", "/about", "/contact"]; // NEW

    const touchStartX = useRef(0); // NEW
    const touchEndX = useRef(0); // NEW

    const minSwipeDistance = 50; // NEW

    const onTouchStart = (e) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const onTouchMove = (e) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const onTouchEnd = () => {
        const distance = touchStartX.current - touchEndX.current;

        if (Math.abs(distance) < minSwipeDistance) return;

        const currentIndex = routes.indexOf(window.location.pathname);

        if (distance > 0) {
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

    const [link, setLink] = useState({
        Location: "FETCHING_COORDS...",
        LocationLink: "",
        gmail: "uplink@protocol.io",
        phone: "+XX XXXXX XXXXX",
    });
    const [formData, setFormData] = useState({
        user: "",
        email: "",
        phone: "",
        message: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState("");

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
                console.error("Link fetch failed, using defaults");
            }
        };
        fetchLinks();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.user.trim()) newErrors.user = "ID_REQUIRED";
        if (!formData.email.trim()) {
            newErrors.email = "MAIL_NODE_MISSING";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "INVALID_PROTOCOL";
        }
        if (!formData.phone.trim()) newErrors.phone = "COMMS_REQUIRED";
        if (!formData.message.trim()) newErrors.message = "PAYLOAD_EMPTY";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_LOCALHOST}/api/contact`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                },
            );
            if (response.ok) {
                setSuccess(true);
                setFormData({ user: "", email: "", phone: "", message: "" });
            } else {
                setServerError("UPLINK_FAILED");
            }
        } catch (error) {
            setServerError("NETWORK_DISRUPTION");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-[#050505] text-slate-300 font-mono selection:bg-green-500 selection:text-black overflow-x-hidden relative"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* 1. AMBIENT BACKGROUND GLOWS */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-emerald-900/10 blur-[100px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 py-12 lg:py-24">
                {/* 2. HEADER SECTION */}
                <motion.header
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-16 lg:mb-24"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-[1px] w-12 bg-green-500/50" />
                        <span className="text-green-400 text-[10px] uppercase tracking-[0.5em] font-bold">
                            Secure_Terminal_v4.0
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter uppercase italic">
                        ESTABLISH
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-600">
                            _UPLINK
                        </span>
                    </h1>
                    <p className="mt-8 max-w-2xl text-slate-400 text-base md:text-lg leading-relaxed font-sans">
                        <span className="text-green-500 font-bold mr-2">
                            &gt;
                        </span>
                        Initialize direct communication protocol for
                        collaborations, innovative projects, or system
                        inquiries.
                    </p>
                </motion.header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    {/* 3. THE CONTACT FORM (7 COLUMNS) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-7 bg-white/[0.02] border border-white/10 backdrop-blur-md p-6 md:p-10 rounded-[2rem] relative group"
                    >
                        {/* Decorative Corner Brackets */}
                        <div className="absolute top-5 left-5 w-4 h-4 border-t-2 border-l-2 border-green-500/30 group-hover:border-green-500 transition-colors" />
                        <div className="absolute bottom-5 right-5 w-4 h-4 border-b-2 border-r-2 border-green-500/30 group-hover:border-green-500 transition-colors" />

                        <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
                            <h3 className="text-lg font-bold text-white uppercase tracking-widest flex items-center gap-3">
                                <FaSatellite className="text-green-500 text-sm animate-spin-slow" />
                                SEND_DATA_PACKET
                            </h3>
                            <div className="hidden md:block h-2 w-2 rounded-full bg-green-500 animate-ping" />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[
                                    {
                                        id: "user",
                                        label: "Identity",
                                        type: "text",
                                        placeholder: "NAME_REF",
                                    },
                                    {
                                        id: "email",
                                        label: "Neural_Mail",
                                        type: "email",
                                        placeholder: "ADDR@NODE.COM",
                                    },
                                ].map((field) => (
                                    <div key={field.id} className="relative">
                                        <label className="text-[10px] font-bold text-green-500/60 uppercase tracking-widest mb-3 block">
                                            {field.label}
                                        </label>
                                        <input
                                            type={field.type}
                                            name={field.id}
                                            value={formData[field.id]}
                                            onChange={handleChange}
                                            placeholder={field.placeholder}
                                            className="w-full bg-white/[0.03] border-b border-white/10 p-3 text-white focus:border-green-500 outline-none transition-all placeholder:text-slate-800 text-sm"
                                        />
                                        {errors[field.id] && (
                                            <span className="absolute -bottom-5 left-0 text-[9px] text-red-500 font-bold">
                                                ! {errors[field.id]}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="relative">
                                <label className="text-[10px] font-bold text-green-500/60 uppercase tracking-widest mb-3 block">
                                    Secure_Line
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+XX 0000 000 000"
                                    className="w-full bg-white/[0.03] border-b border-white/10 p-3 text-white focus:border-green-500 outline-none transition-all placeholder:text-slate-800 text-sm"
                                />
                                {errors.phone && (
                                    <span className="absolute -bottom-5 left-0 text-[9px] text-red-500 font-bold">
                                        ! {errors.phone}
                                    </span>
                                )}
                            </div>

                            <div className="relative">
                                <label className="text-[10px] font-bold text-green-500/60 uppercase tracking-widest mb-3 block">
                                    Message_Payload
                                </label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="ENTER_ENCRYPTED_MESSAGE..."
                                    className="w-full bg-white/[0.03] border-b border-white/10 p-3 text-white focus:border-green-500 outline-none transition-all resize-none placeholder:text-slate-800 text-sm"
                                />
                                {errors.message && (
                                    <span className="absolute -bottom-5 left-0 text-[9px] text-red-500 font-bold">
                                        ! {errors.message}
                                    </span>
                                )}
                            </div>

                            <motion.button
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow:
                                        "0 0 30px rgba(34, 197, 94, 0.2)",
                                }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isSubmitting}
                                className="w-full py-5 bg-green-500 text-black font-black uppercase tracking-widest rounded-xl hover:bg-green-400 transition-all disabled:opacity-50"
                            >
                                {isSubmitting
                                    ? "TRANSMITTING..."
                                    : "INITIALIZE_SEND"}
                            </motion.button>
                        </form>

                        <AnimatePresence>
                            {(success || serverError) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`mt-8 p-4 rounded-xl text-center text-xs font-bold border ${success ? "border-green-500/50 text-green-500 bg-green-500/5" : "border-red-500/50 text-red-500 bg-red-500/5"}`}
                                >
                                    {success
                                        ? "UPLINK_SUCCESS: Packet Received"
                                        : `CRITICAL_ERR: ${serverError}`}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* 4. INFO SIDE (5 COLUMNS) */}
                    <div className="lg:col-span-5 space-y-10">
                        {/* Map Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/[0.02] border border-white/10 p-6 rounded-[2rem] overflow-hidden group shadow-xl"
                        >
                            <h4 className="text-[11px] font-bold text-green-500 mb-6 flex items-center gap-3 uppercase tracking-widest">
                                <FaMapMarkerAlt /> System_Location:{" "}
                                <span className="text-white">
                                    {link.Location}
                                </span>
                            </h4>
                            <div className="w-full h-64 rounded-2xl overflow-hidden border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-700 opacity-40 group-hover:opacity-100">
                                <iframe
                                    src={link.LocationLink}
                                    className="w-full h-full border-0"
                                    allowFullScreen
                                    loading="lazy"
                                    title="HQ"
                                />
                            </div>
                        </motion.div>

                        {/* Comms Links Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-8 rounded-[2rem]"
                        >
                            <h4 className="text-[11px] font-bold text-slate-500 mb-10 uppercase tracking-[0.3em]">
                                Access_Directory
                            </h4>
                            <div className="space-y-8">
                                {[
                                    {
                                        icon: <FaEnvelope />,
                                        val: link.gmail,
                                        href: `mailto:${link.gmail}`,
                                        label: "Node_Email",
                                    },
                                    {
                                        icon: <FaPhone />,
                                        val: link.phone,
                                        href: `tel:${link.phone}`,
                                        label: "Voice_Link",
                                    },
                                ].map((node, i) => (
                                    <a
                                        key={i}
                                        href={node.href}
                                        className="flex items-center gap-6 group"
                                    >
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-green-500 group-hover:border-green-500 group-hover:bg-green-500/10 transition-all">
                                            {node.icon}
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-slate-600 uppercase font-bold mb-1">
                                                {node.label}
                                            </p>
                                            <p className="text-white group-hover:text-green-400 transition-colors text-sm md:text-base">
                                                {node.val}
                                            </p>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            {/* Socials */}
                            <div className="mt-12 pt-8 border-t border-white/5 flex gap-4">
                                {[
                                    {
                                        icon: <FaLinkedin />,
                                        href: link.linkedIn,
                                    },
                                    { icon: <FaGithub />, href: link.github },
                                    { icon: <FaTwitter />, href: link.twitter },
                                ].map((soc, i) => (
                                    <motion.a
                                        key={i}
                                        whileHover={{ y: -5, color: "#22c55e" }}
                                        href={soc.href}
                                        target="_blank"
                                        className="p-4 rounded-xl bg-white/5 border border-white/10 text-slate-500 transition-all"
                                    >
                                        {soc.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Global Animation Styles */}
            <style jsx>{`
                @keyframes spin-slow {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default Contact;
