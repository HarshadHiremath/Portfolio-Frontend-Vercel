import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaLinkedin,
    FaGithub,
    FaTwitter,
    FaEnvelope,
    FaPhone,
    FaTerminal,
    FaMapMarkerAlt,
    FaSatellite,
} from "react-icons/fa";

import emailjs from "@emailjs/browser";

const Contact = () => {
    const [link, setLink] = useState({});
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
                console.error(err);
            }
        };
        fetchLinks();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
        setSuccess(false);
        setServerError("");
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.user.trim()) newErrors.user = "IDENTITY_REQUIRED";
        if (!formData.email.trim()) {
            newErrors.email = "UPLINK_EMAIL_REQUIRED";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "INVALID_PROTOCOL";
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "COMMS_REQUIRED";
        }
        if (!formData.message.trim()) newErrors.message = "DATA_PACKET_EMPTY";
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

        // emailjs
        //     .send(
        //         import.meta.env.VITE_EMAIL_SERVICE_ID,
        //         import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        //         formData,
        //         import.meta.env.VITE_EMAIL_PUBLIC_KEY,
        //     )
        //     .then(
        //         (result) => {
        //             //   alert("Message Sent Successfully Sender✅");
        //             console.log(result.text);
        //         },
        //         (error) => {
        //             alert("Failed to send message ❌", error);
        //             console.log(error.text);
        //         },
        //     );

        // emailjs
        //     .send(
        //         import.meta.env.VITE_EMAIL_SERVICE_ID,
        //         "template_824qj44",
        //         formData,
        //         import.meta.env.VITE_EMAIL_PUBLIC_KEY,
        //     )
        //     .then(
        //         (result) => {
        //             //   alert("Message Sent Successfully Owner ✅");
        //             console.log(result.text);
        //         },
        //         (error) => {
        //             alert("Failed to send message ❌", error);
        //             console.log(error.text);
        //         },
        //     );

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
                const errorData = await response.json();
                setServerError(errorData.error || "UPLINK_FAILED");
            }
        } catch (error) {
            setServerError("NETWORK_DISRUPTION");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-green-500 selection:text-black overflow-x-hidden">
            {/* AMBIENT BACKGROUND */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 -left-20 w-96 h-96 bg-green-500/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 -right-20 w-96 h-96 bg-green-900/5 blur-[120px] rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 py-16 md:py-24">
                {/* 1. HEADER (Synced Typography) */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20 text-center lg:text-left"
                >
                    <div className="inline-block px-3 py-1 mb-6 border border-green-500/20 bg-green-500/5 rounded-lg">
                        <span className="text-green-400 text-[12px] font-bold uppercase tracking-[0.2em]">
                            ● Protocol_Initialized: Uplink_Established
                        </span>
                    </div>
                    <h1 className="text-xl sm:text-xl md:text-8xl lg:text-6xl font-black mb-6 tracking-tighter text-white uppercase italic leading-none">
                        ESTABLISH
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 block sm:inline">
                            _UPLINK
                        </span>
                    </h1>
                    <p className=" text-slate-400 text-lg font-light leading-relaxed">
                        <span className="text-green-500 font-bold">&gt;</span>{" "}
                        Feel free to reach out for collaborations, opportunities, just to
                        <span className="text-white"> Say Hello </span> 
                        Let’s create something impactful together.
                    </p>
                </motion.header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* 2. FORM SIDE (Lg: 7 Columns) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-7 bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl relative overflow-hidden group shadow-2xl"
                    >
                        {/* Scanning Line Effect (Synced) */}
                        <motion.div
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "linear",
                            }}
                            className="absolute left-0 right-0 h-[1px] bg-green-500 z-10 pointer-events-none opacity-100"
                        />

                        <h3 className="text-xl font-bold text-white mb-8 uppercase tracking-widest italic border-b border-white/5 pb-4 flex items-center gap-3">
                            <FaSatellite className="text-green-500 text-sm" />{" "}
                            Send Message / Feedback
                        </h3>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6 relative z-20"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {["user", "email"].map((field) => (
                                    <div key={field}>
                                        <label className="text-[14px] font-bold text-white uppercase tracking-widest mb-2 block">
                                            {field === "user"
                                                ? "Your Name"
                                                : "Email"}
                                        </label>
                                        <input
                                            type={
                                                field === "email"
                                                    ? "email"
                                                    : "text"
                                            }
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleChange}
                                            placeholder={`INPUT_${field.toUpperCase()}...`}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-mono text-sm focus:border-green-500/50 outline-none transition-all placeholder:text-slate-700"
                                        />
                                        {errors[field] && (
                                            <p className="mt-2 text-[9px] text-red-500 font-bold tracking-widest uppercase">
                                                ! {errors[field]}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div>
                                <label className="text-[14px] font-bold text-white uppercase tracking-widest mb-2 block">
                                    Phone_Number
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="INPUT_PHONE_DIGITS..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-mono text-sm focus:border-green-500/50 outline-none transition-all placeholder:text-slate-700"
                                />
                                {errors.phone && (
                                    <p className="mt-2 text-[9px] text-red-500 font-bold tracking-widest uppercase">
                                        ! {errors.phone}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="text-[14px] font-bold text-white uppercase tracking-widest mb-2 block">
                                    Message_Description
                                </label>
                                <textarea
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="TYPE_YOUR_MESSAGE_HERE..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-mono text-sm focus:border-green-500/50 outline-none transition-all resize-none placeholder:text-slate-700"
                                ></textarea>
                                {errors.message && (
                                    <p className="mt-2 text-[9px] text-red-500 font-bold tracking-widest uppercase">
                                        ! {errors.message}
                                    </p>
                                )}
                            </div>

                            <motion.button
                                whileHover={{
                                    scale: 1.01,
                                    boxShadow:
                                        "0 0 20px rgba(34, 197, 94, 0.2)",
                                }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isSubmitting}
                                className="w-full py-5 bg-green-500 text-black font-black uppercase rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                            >
                                {isSubmitting
                                    ? "MESSAGE_SENDING..."
                                    : "SEND_MESSAGE"}
                            </motion.button>
                        </form>

                        <AnimatePresence>
                            {(success || serverError) && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className={`mt-6 p-4 rounded-xl text-center text-[10px] font-mono font-bold border ${success ? "border-green-500/50 text-green-500 bg-green-500/5" : "border-red-500/50 text-red-500 bg-red-500/5"}`}
                                >
                                    {success
                                        ? "UPLINK_SUCCESS: Data_Packet_Stored_In_Archive"
                                        : `UPLINK_CRITICAL_FAILURE: ${serverError}`}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* 3. INFO SIDE (Lg: 5 Columns) */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* Coordinates / Map */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 shadow-xl"
                        >
                            <h3 className="text-[14px] font-bold text-green-500 mb-6 flex items-center gap-3 tracking-[0.1em] uppercase">
                                <FaMapMarkerAlt /> GPS_Coordinates:{" "}
                                <span className="text-white">
                                    {link.Location}
                                </span>
                            </h3>
                            <div className="w-full h-64 rounded-2xl overflow-hidden border border-white/5 grayscale group hover:grayscale-0 transition-all duration-1000">
                                <iframe
                                    src={link.LocationLink}
                                    className="w-full h-full border-0 opacity-60 hover:opacity-100 transition-opacity"
                                    allowFullScreen
                                    loading="lazy"
                                    title="HQ Location"
                                ></iframe>
                            </div>
                        </motion.div>

                        {/* Comms Links */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-3xl p-8"
                        >
                            <h3 className="text-sm font-bold text-slate-500 mb-8 uppercase tracking-[0.2em]">
                                Direct_Comms_Directory
                            </h3>
                            <ul className="space-y-8">
                                {[
                                    {
                                        icon: <FaEnvelope />,
                                        label: "Email_Node",
                                        value: link.gmail,
                                        href: `mailto:${link.gmail}`,
                                    },
                                    {
                                        icon: <FaPhone />,
                                        label: "Secure_Voice",
                                        value: link.phone,
                                        href: `tel:${link.phone}`,
                                    },
                                ].map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-6 group"
                                    >
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:border-green-500/50 transition-all">
                                            <span className="text-green-500">
                                                {item.icon}
                                            </span>
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-[10px] font-mono text-slate-600 uppercase mb-1 tracking-tighter">
                                                {item.label}
                                            </p>
                                            <a
                                                href={item.href}
                                                className="text-lg text-white font-medium hover:text-green-400 transition-colors break-all leading-tight block"
                                            >
                                                {item.value}
                                            </a>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-12 pt-8 border-t border-white/5 flex gap-5">
                                {[
                                    {
                                        icon: <FaLinkedin />,
                                        href: link.linkedIn,
                                        label: "LinkedIn",
                                    },
                                    {
                                        icon: <FaGithub />,
                                        href: link.github,
                                        label: "GitHub",
                                    },
                                    {
                                        icon: <FaTwitter />,
                                        href: link.twitter,
                                        label: "Twitter",
                                    },
                                ].map((social, idx) => (
                                    <motion.a
                                        key={idx}
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        whileHover={{ y: -5 }}
                                        className="p-4 rounded-xl bg-white/5 border border-white/10 text-slate-500 hover:text-green-500 hover:border-green-500/50 transition-all"
                                        title={social.label}
                                    >
                                        <span className="text-xl">
                                            {social.icon}
                                        </span>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
