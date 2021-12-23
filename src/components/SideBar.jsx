import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "../data/SidebarData";
import "../css/sidebar.css";
import { IconContext } from "react-icons";

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const [click, setClick] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const clicked = useCallback(() => {
    setClick(!click);
  }, [click, setClick]);

  //Show a sidebar with links to other pages
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="side-menu">
          <ul className="side-menu-items" onClick={showSidebar}>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName} onClick={clicked}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;
