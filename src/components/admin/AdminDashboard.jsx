import React from "react";

const AdminDashboard = () => {
  return (

    <div>

      <h2 className="text-2xl font-bold mb-6 text-green-400">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-[#0f0f0f] p-6 rounded-xl border border-green-500/20">
          <h3 className="text-lg font-semibold">Projects</h3>
          <p className="text-3xl mt-2">12</p>
        </div>

        <div className="bg-[#0f0f0f] p-6 rounded-xl border border-green-500/20">
          <h3 className="text-lg font-semibold">Blogs</h3>
          <p className="text-3xl mt-2">8</p>
        </div>

        <div className="bg-[#0f0f0f] p-6 rounded-xl border border-green-500/20">
          <h3 className="text-lg font-semibold">Messages</h3>
          <p className="text-3xl mt-2">24</p>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;

