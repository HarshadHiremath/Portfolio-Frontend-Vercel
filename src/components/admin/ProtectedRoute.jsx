import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation  } from "react-router-dom";
import { BiLoaderCircle } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsValid(false);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_LOCALHOST}/api/admin/verify`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });

        if (res.ok) {
          setIsValid(true);
        } else {
          localStorage.removeItem("token");
          setIsValid(false);
        }

      } catch (error) {
        localStorage.removeItem("token");
        setIsValid(false);
      }

      setLoading(false);
    };

    verifyToken();
  }, [location.pathname]);

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
                      CHECKING_AUTHENTICATION...!
                  </p>
              </div>
          );

  return isValid ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
