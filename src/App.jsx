import { useState, useEffect } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";

import Navbar from "./components/home/Navbar";
import Footer from "./components/home/Footer";
import SplashScreen from "./components/home/SplashScreen";

import Home from "./components/home/home";
import Project from "./components/home/project/Project";
import CodeDev from "./components/home/codeDev/CodeDev";
import About from "./components/home/about/About";
import Blog from "./components/home/blog/Blog";
import Contact from "./components/home/contact/Contact";
import Post from "./components/home/blog/Post";

import AdminLogin from "./components/admin/AdminLogin";
import Admin from "./components/admin/AdminDashboard";
import AdminLayout from "./components/admin/Admin";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminHome from "./components/admin/home/AdminHome";
import AdminProject from "./components/admin/project/AdminProject";
import AdminCodeDev from "./components/admin/codeDev/AdminCodeDev";
import AdminAbout from "./components/admin/about/AdminAbout";
import AdminBlog from "./components/admin/blog/AdminBlog";
import AdminContact from "./components/admin/contact/AdminContact";
import AdminLink from "./components/admin/link/AdminLink";  

// Layout with Navbar + Footer
const MainLayout = () => (
    <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />
        <main className="flex-grow mt-16">
            <Outlet />
        </main>
        <Footer />
    </div>
);

// Layout without Navbar
const SimpleLayout = () => (
    <div className="min-h-screen bg-gray-100">
        <Outlet />
    </div>
);

// Scroll to top
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isHome, setIsHome] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setIsHome(location.pathname === "/");

        setTimeout(() => {
            setIsLoading(false);
        }, 4000);
    }, []);

    return (
        <div>
            {isLoading && isHome ? (
                <SplashScreen />
            ) : (
                <>
                    <ScrollToTop />

                    <Routes>
                        {/* WEBSITE ROUTES */}
                        <Route element={<MainLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/project" element={<Project />} />
                            <Route path="/codedev" element={<CodeDev />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/blog/:id" element={<Post />} />
                        </Route>

                        {/* ADMIN LOGIN */}
                        <Route element={<SimpleLayout />}>
                            <Route
                                path="/admin/login"
                                element={<AdminLogin />}
                            />
                        </Route>

                        {/* PROTECTED ADMIN ROUTES */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="/admin" element={<AdminLayout />}>
                                <Route path="dashboard" element={<Admin />} />
                                <Route path="home" element={<AdminHome />} />
                                <Route path="project" element={<AdminProject />} />
                                <Route path="codeDev" element={<AdminCodeDev />} />
                                <Route path="about" element={<AdminAbout />} />
                                <Route path="blog" element={<AdminBlog />} />
                                <Route path="contact" element={<AdminContact />} />
                                <Route path="link" element={<AdminLink />} /> 
                            </Route>
                        </Route>
                    </Routes>
                </>
            )}
        </div>
    );
};

export default App;
