import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaHome,
    FaProjectDiagram,
    FaCode,
    FaUser,
    FaBlog,
    FaEnvelope,
    FaTerminal,
} from "react-icons/fa";

const Navbar = () => {
    // Centralized theme colors/classes
    const activeStyles =
        "text-green-400 font-black bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.2)] border-b-2 border-green-500";
    const inactiveStyles = "text-slate-400 hover:text-white hover:bg-white/5";

    const navLinkStyles = ({ isActive }) =>
        `relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 group font-bold text-xs uppercase tracking-widest ${
            isActive ? activeStyles : inactiveStyles
        }`;

    const mobileNavLinkStyles = ({ isActive }) =>
        `flex flex-col items-center justify-center w-full py-2 transition-all duration-300 ${
            isActive ? "text-green-400" : "text-white"
        }`;

    const getIconClass = (isActive) =>
        `text-lg transition-colors duration-300 ${isActive ? "text-green-400" : "text-slate-400 group-hover:text-white"}`;

    return (
        <>
            {/* 1. DESKTOP NAVBAR - Glassmorphism System Bar */}
            <nav className="hidden md:block fixed top-0 w-full z-[100]">
                <div className="w-full bg-black border-b-2 border-green-500 px-6 py-3 flex items-center justify-between shadow-2xl">
                    {/* Logo / Brand */}
                    <div className="flex items-center gap-5">
                        <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                            <FaTerminal className="text-green-500 text-sm animate-pulse" />
                        </div>
                        <div className="text-sm font-black text-white uppercase tracking-tighter italic">
                            Harshad
                            <span className="text-green-500">_Hiremath</span>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex space-x-2">
                        {[
                            { to: "/", icon: <FaHome />, label: "Home" },
                            {
                                to: "/project",
                                icon: <FaProjectDiagram />,
                                label: "Project",
                            },
                            {
                                to: "/codedev",
                                icon: <FaCode />,
                                label: "CodeDev",
                            },
                            { to: "/about", icon: <FaUser />, label: "About" },
                            { to: "/blog", icon: <FaBlog />, label: "Blog" },
                            {
                                to: "/contact",
                                icon: <FaEnvelope />,
                                label: "Contact",
                            },
                        ].map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={navLinkStyles}
                            >
                                {({ isActive }) => (
                                    <>
                                        <span
                                            className={getIconClass(isActive)}
                                        >
                                            {link.icon}
                                        </span>
                                        <span>{link.label}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-glow"
                                                className="absolute inset-0 bg-green-500/5 rounded-lg -z-10"
                                            />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </nav>

            {/* 2. MOBILE TOP HEADER (Sticky Name) */}
            <header className="md:hidden fixed top-0 w-full z-[100] bg-black border-b-2 border-green-500 p-4 text-center">
                <div className="text-lg font-black text-white uppercase italic tracking-tighter">
                    Harshad<span className="text-green-500">_Hiremath</span>
                </div>
            </header>

            {/* 3. MOBILE BOTTOM NAVBAR (Synced with Home Dashboard) */}
            <nav className="md:hidden fixed bottom-0 w-full z-[100]">
                <div className="bg-black border-3 border-green-500 flex justify-around items-center rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                    {[
                        { to: "/", icon: <FaHome />, label: "Home" },
                        {
                            to: "/project",
                            icon: <FaProjectDiagram />,
                            label: "Project",
                        },
                        { to: "/codedev", icon: <FaCode />, label: "CodeDev" },
                        { to: "/about", icon: <FaUser />, label: "About" },
                        { to: "/blog", icon: <FaBlog />, label: "Blog" },
                        {
                            to: "/contact",
                            icon: <FaEnvelope />,
                            label: "Contact",
                        },
                    ].map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={mobileNavLinkStyles}
                        >
                            {({ isActive }) => (
                                <>
                                    <div
                                        className={`relative p-2 rounded-xl transition-all duration-500 ${isActive ? "bg-green-500/10 text-green-400" : ""}`}
                                    >
                                        <span className="text-xl">
                                            {link.icon}
                                        </span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="mobile-dot"
                                                className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]"
                                            />
                                        )}
                                    </div>
                                    <span
                                        className={`text-[9px] font-bold uppercase tracking-tighter mt-1 ${isActive ? "opacity-100" : "opacity-40"}`}
                                    >
                                        {link.label}
                                    </span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
