"use client";
import { usePathname } from "next/navigation";
import React, { useState } from 'react'
import { Props } from "react-apexcharts";
import SidebarLinkGroup from "../Sidebar/SidebarLinkGroup";
import Link from "next/link";
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;

}

const MiddleBar : React.FC<Props> = ({ children, title, ...rest }) => {
  const pathname = usePathname();
  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );
  return (
    <aside
    className={`absolute left-0 top-0 z-9999 flex 
    h-screen w-60 flex-col overflow-y-hidden 
    bg-white ease-linear  
     lg:translate-x-0
    `}
  >

    <div className="flex items-center justify-between bg-white gap-2 px-6 py-5.5 lg:py-6.5">
    </div>
    {/* <!-- SIDEBAR HEADER --> */}
    <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
      {/* <!-- Sidebar Menu --> */}
      <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
        {/* <!-- Menu Group --> */}
        <div>
      
          <ul>
          <SidebarLinkGroup
                activeCondition={
                  pathname === "/create" || pathname.includes("create")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/create" ||
                            pathname.includes("create")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                      创建OKR
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/create/myokr"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 
                              font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/create/myokr" &&
                                "text-white"
                              }`}
                            >
                              myokr
                              
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/create/relations"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/create/relations" &&
                                "text-white"
                              }`}
                            >
                             relations
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/create/Assignments"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/create/Assignments" &&
                                "text-white"
                              } `}
                            >
                              Assignments
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
          </ul>
        </div>
      </nav>
    </div>

   </aside>

  )}
export default MiddleBar;
