import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LayoutDashboard, Home, Briefcase, Code2, MessageSquare, LogOut, ShieldCheck } from "lucide-react";

const Admin = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/admin/login");
    };

    // Enhanced class logic for active links
    const getLinkClass = ({ isActive }) => 
        `flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-300 font-mono text-sm uppercase tracking-wider group ` + 
        (isActive 
            ? "bg-green-500/10 text-green-400 border border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.2)]" 
            : "text-gray-500 hover:text-green-400 hover:bg-white/5");

    return (
        <div className="min-h-screen flex bg-[#050505] text-gray-300 font-mono">
            {/* MOBILE OVERLAY */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`fixed md:static inset-y-0 left-0 z-50 w-72 bg-[#0a0a0a] border-r border-green-500/20 p-6
                transform transition-all duration-500 ease-in-out
                ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 shadow-[10px_0_30px_rgba(0,0,0,0.5)]`}
            >
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="text-green-500 w-6 h-6 animate-pulse" />
                        <h2 className="text-xl font-black text-white uppercase tracking-tighter">
                            Root<span className="text-green-500">_Access</span>
                        </h2>
                    </div>

                    <button className="md:hidden text-gray-500 hover:text-white" onClick={() => setOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                <nav className="space-y-1">
                    <p className="text-[10px] text-gray-600 font-bold mb-4 tracking-[0.3em] uppercase">Navigation</p>
                    
                    <NavLink to="/admin/dashboard" className={getLinkClass} onClick={() => setOpen(false)}>
                        <LayoutDashboard size={18} />
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink to="/admin/home" className={getLinkClass} onClick={() => setOpen(false)}>
                        <Home size={18} />
                        <span>Home Config</span>
                    </NavLink>

                    <NavLink to="/admin/project" className={getLinkClass} onClick={() => setOpen(false)}>
                        <Briefcase size={18} />
                        <span>Projects</span>
                    </NavLink>

                    <NavLink to="/admin/codeDev" className={getLinkClass} onClick={() => setOpen(false)}>
                        <Code2 size={18} />
                        <span>Code Dev</span>
                    </NavLink>

                    <NavLink to="/admin/contact" className={getLinkClass} onClick={() => setOpen(false)}>
                        <MessageSquare size={18} />
                        <span>Infiltrations</span>
                    </NavLink>

                    <div className="pt-10">
                        <button
                            onClick={logout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-red-500/70 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-300 uppercase text-sm tracking-widest font-bold"
                        >
                            <LogOut size={18} />
                            <span>Terminate</span>
                        </button>
                    </div>
                </nav>

                {/* System Status Footer */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-black/50 border border-white/5">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-gray-600">
                        <span>Node Status</span>
                        <span className="text-green-500">Online</span>
                    </div>
                    <div className="w-full bg-gray-900 h-1 mt-2 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full w-2/3 animate-pulse"></div>
                    </div>
                </div>
            </aside>

            {/* MAIN AREA */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* TOPBAR */}
                <header className="h-20 flex items-center justify-between px-6 md:px-10 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden p-2 bg-green-500/10 rounded border border-green-500/30 text-green-500"
                            onClick={() => setOpen(true)}
                        >
                            <Menu size={20} />
                        </button>

                        <div>
                            <h1 className="text-white font-bold text-sm md:text-base uppercase tracking-widest">
                                Control_Center
                            </h1>
                            <p className="text-[10px] text-green-500 font-mono tracking-tight hidden sm:block">
                                SESSION_ID: 77-802-HK // LEVEL 4 AUTH
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden sm:flex flex-col items-end">
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Operator</span>
                            <span className="text-xs text-white font-mono">HIREMATH_H</span>
                        </div>
                        <div className="h-10 w-10 rounded border border-green-500/30 bg-green-500/5 flex items-center justify-center text-green-500 font-bold shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                            H
                        </div>
                    </div>
                </header>

                {/* PAGE CONTENT */}
                <main className="flex-1 overflow-y-auto bg-[#050505] relative custom-scrollbar">
                    {/* Subtle grid background overlay */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    
                    <div className="relative z-10 p-6 md:p-10">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Admin;