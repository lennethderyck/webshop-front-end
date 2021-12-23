import React from "react";
import Sidebar from "../components/SideBar";
import "../css/admin.css";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="box-admin-pages">
        <h2>Admin Dashboard</h2>
      </div>
    </>
  );
}
