import React from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-auto px-0">
          <Sidebar />
        </div>
        <main className="col main-content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
