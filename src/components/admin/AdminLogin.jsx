import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Check token on page load
    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem("token");

            if (!token) return;

            try {
                const res = await fetch(
                    `${import.meta.env.VITE_LOCALHOST}/api/admin/verify`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                if (res.ok) {
                    navigate("/admin/dashboard");
                } else {
                    localStorage.removeItem("token");
                }
            } catch (error) {
                localStorage.removeItem("token");
            }
        };
        checkToken();
    }, [navigate]);

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(
                `${import.meta.env.VITE_LOCALHOST}/api/admin/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                },
            );

            const data = await res.json();

            if (data.token) {
                localStorage.setItem("token", data.token);

                navigate("/admin/dashboard");
            } else {
                alert("Invalid Credentials");
            }
        } catch (error) {
            alert("Server error");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0f172a] to-black px-4">
            <div className="w-full max-w-md bg-[#0a0a0a] border border-green-500/30 rounded-2xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-center text-green-400 mb-6">
                    Admin Login
                </h2>

                <div className="space-y-4">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin();
                        }}
                        className="space-y-4"
                    >
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="w-full p-3 bg-black border border-green-500/30 rounded-lg text-green-300 focus:outline-none focus:border-green-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="w-full p-3 bg-black border border-green-500/30 rounded-lg text-green-300 focus:outline-none focus:border-green-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-500 hover:bg-green-400 text-black py-3 rounded-lg font-bold transition"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>

                <p className="text-xs text-center text-gray-500 mt-6">
                    Secured Admin Access
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
