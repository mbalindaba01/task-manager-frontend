import { ReactNode } from "react";
import "../../../src/styles/layout.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <main className="layout-content">{children}</main>
    </div>
  );
};

export default Layout;
