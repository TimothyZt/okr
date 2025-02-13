"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { Me } from "../../../features/users/dtos/users-dto";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  me: Me;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen, me }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);
  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-55 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 bg-white px-6 py-5.5 lg:py-6.5">
        <Link href="/">
          <Image
            width={208}
            height={36}
            src={"/images/logo/logo.png"}
            alt="Logo"
            priority
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-1 px-4 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              OKR系統
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              {!me?.roles.find((x) => x.roleName === "Admin") && (
                <SidebarLinkGroup
                  activeCondition={
                    pathname === "/" || pathname.includes("dashboard")
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname === "/create" ||
                            pathname.includes("create")
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            fill="#000000"
                          >
                            <g id="SVGRepo_bgCarrier" stroke-width="0" />
                            <g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <title>target_line</title>{" "}
                              <g
                                id="页面-1"
                                stroke="none"
                                stroke-width="1"
                                fill="none"
                                fill-rule="evenodd"
                              >
                                {" "}
                                <g
                                  id="Business"
                                  transform="translate(-576.000000, -192.000000)"
                                  fill-rule="nonzero"
                                >
                                  {" "}
                                  <g
                                    id="target_line"
                                    transform="translate(576.000000, 192.000000)"
                                  >
                                    {" "}
                                    <path
                                      d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
                                      id="MingCute"
                                      fill-rule="nonzero"
                                    >
                                      {" "}
                                    </path>{" "}
                                    <path
                                      d="M12,2 C12.3748,2 12.7451,2.02066 13.1099,2.06098 C13.6588,2.12167 14.0546,2.61586 13.9939,3.1648 C13.9333,3.71374 13.4391,4.10956 12.8901,4.04887 C12.5982,4.0166 12.3012,4 12,4 C7.58172,4 4,7.58172 4,12 C4,16.4183 7.58172,20 12,20 C16.4183,20 20,16.4183 20,12 C20,11.6988 19.9834,11.4018 19.9511,11.1099 C19.8904,10.5609 20.2863,10.0667 20.8352,10.0061 C21.3841,9.94537 21.8783,10.3412 21.939,10.8901 C21.9793,11.2549 22,11.6252 22,12 C22,17.5228 17.5228,22 12,22 C6.47715,22 2,17.5228 2,12 C2,6.47715 6.47715,2 12,2 Z M11.9684,7.87672 C12.1061,8.41157 11.7841,8.95675 11.2493,9.09441 C9.95512,9.4275 9,10.6035 9,12 C9,13.6568 10.3431,15 12,15 C13.3965,15 14.5725,14.0448 14.9055,12.7507 C15.0432,12.2158 15.5884,11.8939 16.1232,12.0315 C16.6581,12.1692 16.9801,12.7144 16.8424,13.2492 C16.2874,15.4055 14.3312,17 12,17 C9.23858,17 7,14.7614 7,12 C7,9.66879 8.59442,7.71254 10.7507,7.15754 C11.2856,7.01988 11.8308,7.34187 11.9684,7.87672 Z M18.504,2.12625 C18.8777,2.28104 19.1214,2.64567 19.1214,3.05013 L19.1214,4.87856 L20.9498,4.87856 C21.3542,4.87856 21.7189,5.1222 21.8737,5.49588 C22.0284,5.86955 21.9429,6.29967 21.6569,6.58567 L18.1214,10.1212 C17.9338,10.3087 17.6795,10.4141 17.4142,10.4141 L15,10.4141 L13.1716,12.2425 C12.7811,12.633 12.1479,12.633 11.7574,12.2425 C11.3669,11.852 11.3669,11.2188 11.7574,10.8283 L13.5858,8.99989 L13.5858,6.58567 C13.5858,6.32045 13.6912,6.0661 13.8787,5.87856 L17.4142,2.34303 C17.7002,2.05703 18.1304,1.97147 18.504,2.12625 Z M17.1214,5.46435 L15.5858,6.99988 L15.5858,8.41409 L17,8.41409 L18.5356,6.87856 L18.1214,6.87856 C17.5691,6.87856 17.1214,6.43085 17.1214,5.87856 L17.1214,5.46435 Z"
                                      id="形状"
                                      fill="#f2f2f3"
                                    >
                                      {" "}
                                    </path>{" "}
                                  </g>{" "}
                                </g>{" "}
                              </g>{" "}
                            </g>
                          </svg>
                          OKR制定
                          <svg
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                              open && "rotate-180"
                            }`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                              fill=""
                            />
                          </svg>
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
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                  pathname === "/create/myokr" && "text-white"
                                }`}
                              >
                                我的OKR
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/create/allokr"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                  pathname === "/create/allokr" && "text-white"
                                }`}
                              >
                                所有OKR
                              </Link>
                            </li>
                            {/* <li>
                              <Link
                                href="/create/relations"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                  pathname === "/" && "text-white"
                                }`}
                              >
                                和有關聯的OKR
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/create/assignments"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                  pathname === "/" && "text-white"
                                }`}
                              >
                                我指派的OKR
                              </Link>
                            </li> */}
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              )}
              {/* <!-- Menu Item Dashboard --> */}
              {/* <!-- Menu Item Audit --> */}
              {!me?.roles.find((x) => x.roleName === "Admin") &&
                !(
                  me?.roles.find((x) => x.roleName === "Secretary") &&
                  me?.roles.length === 1
                ) && (
                  <SidebarLinkGroup
                    activeCondition={
                      pathname === "/" || pathname.includes("dashboard")
                    }
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <Link
                            href="#"
                            className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                              pathname === "/audit" ||
                              pathname.includes("audit")
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              sidebarExpanded
                                ? handleClick()
                                : setSidebarExpanded(true);
                            }}
                          >
                            <svg
                              width="18px"
                              height="18px"
                              viewBox="0 0 24 24"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              fill="#000000"
                            >
                              <g id="SVGRepo_bgCarrier" stroke-width="0" />
                              <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <title>target_line</title>{" "}
                                <g
                                  id="页面-1"
                                  stroke="none"
                                  stroke-width="1"
                                  fill="none"
                                  fill-rule="evenodd"
                                >
                                  {" "}
                                  <g
                                    id="Business"
                                    transform="translate(-576.000000, -192.000000)"
                                    fill-rule="nonzero"
                                  >
                                    {" "}
                                    <g
                                      id="target_line"
                                      transform="translate(576.000000, 192.000000)"
                                    >
                                      {" "}
                                      <path
                                        d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
                                        id="MingCute"
                                        fill-rule="nonzero"
                                      >
                                        {" "}
                                      </path>{" "}
                                      <path
                                        d="M12,2 C12.3748,2 12.7451,2.02066 13.1099,2.06098 C13.6588,2.12167 14.0546,2.61586 13.9939,3.1648 C13.9333,3.71374 13.4391,4.10956 12.8901,4.04887 C12.5982,4.0166 12.3012,4 12,4 C7.58172,4 4,7.58172 4,12 C4,16.4183 7.58172,20 12,20 C16.4183,20 20,16.4183 20,12 C20,11.6988 19.9834,11.4018 19.9511,11.1099 C19.8904,10.5609 20.2863,10.0667 20.8352,10.0061 C21.3841,9.94537 21.8783,10.3412 21.939,10.8901 C21.9793,11.2549 22,11.6252 22,12 C22,17.5228 17.5228,22 12,22 C6.47715,22 2,17.5228 2,12 C2,6.47715 6.47715,2 12,2 Z M11.9684,7.87672 C12.1061,8.41157 11.7841,8.95675 11.2493,9.09441 C9.95512,9.4275 9,10.6035 9,12 C9,13.6568 10.3431,15 12,15 C13.3965,15 14.5725,14.0448 14.9055,12.7507 C15.0432,12.2158 15.5884,11.8939 16.1232,12.0315 C16.6581,12.1692 16.9801,12.7144 16.8424,13.2492 C16.2874,15.4055 14.3312,17 12,17 C9.23858,17 7,14.7614 7,12 C7,9.66879 8.59442,7.71254 10.7507,7.15754 C11.2856,7.01988 11.8308,7.34187 11.9684,7.87672 Z M18.504,2.12625 C18.8777,2.28104 19.1214,2.64567 19.1214,3.05013 L19.1214,4.87856 L20.9498,4.87856 C21.3542,4.87856 21.7189,5.1222 21.8737,5.49588 C22.0284,5.86955 21.9429,6.29967 21.6569,6.58567 L18.1214,10.1212 C17.9338,10.3087 17.6795,10.4141 17.4142,10.4141 L15,10.4141 L13.1716,12.2425 C12.7811,12.633 12.1479,12.633 11.7574,12.2425 C11.3669,11.852 11.3669,11.2188 11.7574,10.8283 L13.5858,8.99989 L13.5858,6.58567 C13.5858,6.32045 13.6912,6.0661 13.8787,5.87856 L17.4142,2.34303 C17.7002,2.05703 18.1304,1.97147 18.504,2.12625 Z M17.1214,5.46435 L15.5858,6.99988 L15.5858,8.41409 L17,8.41409 L18.5356,6.87856 L18.1214,6.87856 C17.5691,6.87856 17.1214,6.43085 17.1214,5.87856 L17.1214,5.46435 Z"
                                        id="形状"
                                        fill="#f2f2f3"
                                      >
                                        {" "}
                                      </path>{" "}
                                    </g>{" "}
                                  </g>{" "}
                                </g>{" "}
                              </g>
                            </svg>
                            OKR審核
                            <svg
                              className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                open && "rotate-180"
                              }`}
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                fill=""
                              />
                            </svg>
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
                                  href="/audit/create"
                                  className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                    pathname === "/audit/create" && "text-white"
                                  }`}
                                >
                                  創建流程審核
                                </Link>
                              </li>

                              <li>
                                <Link
                                  href="/audit/feedback"
                                  className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                    pathname === "/audit/feedback" &&
                                    "text-white"
                                  }`}
                                >
                                  反饋流程審核
                                </Link>
                              </li>
                            </ul>
                          </div>
                          {/* <!-- Dropdown Menu End --> */}
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>
                )}

              {/* <!-- Menu Item progress--> */}
              {!me?.roles.find((x) => x.roleName === "Admin") && (
                <SidebarLinkGroup
                  activeCondition={
                    pathname === "/" || pathname.includes("dashboard")
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname === "/progress" ||
                            pathname.includes("progress")
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            fill="#000000"
                          >
                            <g id="SVGRepo_bgCarrier" stroke-width="0" />
                            <g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <title>target_line</title>{" "}
                              <g
                                id="页面-1"
                                stroke="none"
                                stroke-width="1"
                                fill="none"
                                fill-rule="evenodd"
                              >
                                {" "}
                                <g
                                  id="Business"
                                  transform="translate(-576.000000, -192.000000)"
                                  fill-rule="nonzero"
                                >
                                  {" "}
                                  <g
                                    id="target_line"
                                    transform="translate(576.000000, 192.000000)"
                                  >
                                    {" "}
                                    <path
                                      d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
                                      id="MingCute"
                                      fill-rule="nonzero"
                                    >
                                      {" "}
                                    </path>{" "}
                                    <path
                                      d="M12,2 C12.3748,2 12.7451,2.02066 13.1099,2.06098 C13.6588,2.12167 14.0546,2.61586 13.9939,3.1648 C13.9333,3.71374 13.4391,4.10956 12.8901,4.04887 C12.5982,4.0166 12.3012,4 12,4 C7.58172,4 4,7.58172 4,12 C4,16.4183 7.58172,20 12,20 C16.4183,20 20,16.4183 20,12 C20,11.6988 19.9834,11.4018 19.9511,11.1099 C19.8904,10.5609 20.2863,10.0667 20.8352,10.0061 C21.3841,9.94537 21.8783,10.3412 21.939,10.8901 C21.9793,11.2549 22,11.6252 22,12 C22,17.5228 17.5228,22 12,22 C6.47715,22 2,17.5228 2,12 C2,6.47715 6.47715,2 12,2 Z M11.9684,7.87672 C12.1061,8.41157 11.7841,8.95675 11.2493,9.09441 C9.95512,9.4275 9,10.6035 9,12 C9,13.6568 10.3431,15 12,15 C13.3965,15 14.5725,14.0448 14.9055,12.7507 C15.0432,12.2158 15.5884,11.8939 16.1232,12.0315 C16.6581,12.1692 16.9801,12.7144 16.8424,13.2492 C16.2874,15.4055 14.3312,17 12,17 C9.23858,17 7,14.7614 7,12 C7,9.66879 8.59442,7.71254 10.7507,7.15754 C11.2856,7.01988 11.8308,7.34187 11.9684,7.87672 Z M18.504,2.12625 C18.8777,2.28104 19.1214,2.64567 19.1214,3.05013 L19.1214,4.87856 L20.9498,4.87856 C21.3542,4.87856 21.7189,5.1222 21.8737,5.49588 C22.0284,5.86955 21.9429,6.29967 21.6569,6.58567 L18.1214,10.1212 C17.9338,10.3087 17.6795,10.4141 17.4142,10.4141 L15,10.4141 L13.1716,12.2425 C12.7811,12.633 12.1479,12.633 11.7574,12.2425 C11.3669,11.852 11.3669,11.2188 11.7574,10.8283 L13.5858,8.99989 L13.5858,6.58567 C13.5858,6.32045 13.6912,6.0661 13.8787,5.87856 L17.4142,2.34303 C17.7002,2.05703 18.1304,1.97147 18.504,2.12625 Z M17.1214,5.46435 L15.5858,6.99988 L15.5858,8.41409 L17,8.41409 L18.5356,6.87856 L18.1214,6.87856 C17.5691,6.87856 17.1214,6.43085 17.1214,5.87856 L17.1214,5.46435 Z"
                                      id="形状"
                                      fill="#f2f2f3"
                                    >
                                      {" "}
                                    </path>{" "}
                                  </g>{" "}
                                </g>{" "}
                              </g>{" "}
                            </g>
                          </svg>
                          OKR進度
                          <svg
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                              open && "rotate-180"
                            }`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                              fill=""
                            />
                          </svg>
                        </Link>

                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate transform overflow-hidden ${
                            !open && "hidden"
                          }`}
                        >
                          <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                            {me?.roles.find(
                              (x) =>
                                x.roleName === "Secretary" ||
                                x.roleName ===
                                  "HeadCompanyPreliminaryReviewer" ||
                                x.roleName === "HeadCompanyResponsiblePerson",
                            ) && (
                              <li>
                                <Link
                                  href="/progress/create"
                                  className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                    pathname === "/progress/create" &&
                                    "text-white"
                                  }`}
                                >
                                  創建審核進度表
                                </Link>
                              </li>
                            )}

                            <li>
                              <Link
                                href="/progress/feedback"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                  pathname === "/progress/feedback" &&
                                  "text-white"
                                }`}
                              >
                                反饋審核進度表
                              </Link>
                            </li>
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              )}

              {/* <!-- Menu Item Calendar --> */}
              {me !== null &&
                me?.roles.find(
                  (x) => x.roleName === "HeadCompanyResponsiblePerson",
                ) && (
                  <li>
                    <Link
                      href="/rating"
                      className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                        pathname.includes("rating") &&
                        "bg-graydark dark:bg-meta-4"
                      }`}
                    >
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
                          fill=""
                        />
                        <path
                          d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
                          fill=""
                        />
                      </svg>
                      OKR評分
                    </Link>
                  </li>
                )}
              {!me?.roles.find((x) => x.roleName === "Admin") && (
                <SidebarLinkGroup
                  activeCondition={
                    pathname === "/reports" || pathname.includes("reports")
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            (pathname === "/reports" ||
                              pathname.includes("reports")) &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <svg
                            fill="#f7f7f7"
                            version="1.1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 490 490"
                            xmlSpace="preserve"
                            width="18px"
                            height="18px"
                            stroke="#f7f7f7"
                          >
                            <g id="SVGRepo_bgCarrier" stroke-width="0" />
                            <g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <g>
                                    {" "}
                                    <path d="M480,325h-5V45c0-5.523-4.477-10-10-10H300V10c0-5.523-4.477-10-10-10h-90c-5.523,0-10,4.477-10,10v25H25 c-5.523,0-10,4.477-10,10v280h-5c-5.523,0-10,4.477-10,10v35c0,5.523,4.477,10,10,10h152.338l-50.913,84.855l17.149,10.29 L185.662,380H235v110h20V380h49.338l57.087,95.145l17.149-10.29L327.662,380H480c5.523,0,10-4.477,10-10v-35 C490,329.477,485.523,325,480,325z M210,20h70v15h-70V20z M35,55h420v270H35V55z M470,360H20v-15h450V360z" />{" "}
                                    <path d="M170,90c-55.14,0-100,44.86-100,100s44.86,100,100,100s100-44.86,100-100S225.14,90,170,90z M170,270 c-44.112,0-80-35.888-80-80c0-40.724,30.593-74.413,70-79.353V190c0,5.523,4.477,10,10,10h79.353 C244.413,239.407,210.724,270,170,270z M180,180v-69.353c36.128,4.529,64.824,33.225,69.353,69.353H180z" />{" "}
                                    <rect
                                      x="345"
                                      y="130"
                                      width="70"
                                      height="20"
                                    />{" "}
                                    <rect
                                      x="345"
                                      y="160"
                                      width="70"
                                      height="20"
                                    />{" "}
                                    <rect
                                      x="345"
                                      y="190"
                                      width="70"
                                      height="20"
                                    />{" "}
                                    <rect
                                      x="345"
                                      y="100"
                                      width="45"
                                      height="20"
                                    />{" "}
                                    <path d="M324.999,119.999v-20h-45c-2.652,0-5.196,1.054-7.071,2.929l-15,15l14.143,14.143l12.07-12.072H324.999z" />{" "}
                                    <rect
                                      x="310"
                                      y="235"
                                      width="115"
                                      height="20"
                                    />{" "}
                                    <rect
                                      x="280"
                                      y="270"
                                      width="145"
                                      height="20"
                                    />{" "}
                                  </g>{" "}
                                </g>{" "}
                              </g>{" "}
                            </g>
                          </svg>
                          OKR周報
                          <svg
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                              open && "rotate-180"
                            }`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                              fill=""
                            />
                          </svg>
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
                                href="/reports/panel"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                  pathname === "/reports/panel" && "text-white"
                                }`}
                              >
                                OKR數據看版
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/reports/report"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                  pathname === "/reports/report" && "text-white"
                                } `}
                              >
                                OKR數據報表
                              </Link>
                            </li>
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              )}
              {me !== null && me?.roles.find((x) => x.roleName === "Admin") && (
                <SidebarLinkGroup
                  activeCondition={
                    pathname === "/system" || pathname.includes("system")
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            (pathname === "/system" ||
                              pathname.includes("system")) &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <svg
                            fill="#f7f7f7"
                            version="1.1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 490 490"
                            xmlSpace="preserve"
                            width="18px"
                            height="18px"
                            stroke="#f7f7f7"
                          >
                            <g id="SVGRepo_bgCarrier" stroke-width="0" />
                            <g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <g>
                                    {" "}
                                    <path d="M480,325h-5V45c0-5.523-4.477-10-10-10H300V10c0-5.523-4.477-10-10-10h-90c-5.523,0-10,4.477-10,10v25H25 c-5.523,0-10,4.477-10,10v280h-5c-5.523,0-10,4.477-10,10v35c0,5.523,4.477,10,10,10h152.338l-50.913,84.855l17.149,10.29 L185.662,380H235v110h20V380h49.338l57.087,95.145l17.149-10.29L327.662,380H480c5.523,0,10-4.477,10-10v-35 C490,329.477,485.523,325,480,325z M210,20h70v15h-70V20z M35,55h420v270H35V55z M470,360H20v-15h450V360z" />{" "}
                                    <path d="M170,90c-55.14,0-100,44.86-100,100s44.86,100,100,100s100-44.86,100-100S225.14,90,170,90z M170,270 c-44.112,0-80-35.888-80-80c0-40.724,30.593-74.413,70-79.353V190c0,5.523,4.477,10,10,10h79.353 C244.413,239.407,210.724,270,170,270z M180,180v-69.353c36.128,4.529,64.824,33.225,69.353,69.353H180z" />{" "}
                                    <rect
                                      x="345"
                                      y="130"
                                      width="70"
                                      height="20"
                                    />{" "}
                                    <rect
                                      x="345"
                                      y="160"
                                      width="70"
                                      height="20"
                                    />{" "}
                                    <rect
                                      x="345"
                                      y="190"
                                      width="70"
                                      height="20"
                                    />{" "}
                                    <rect
                                      x="345"
                                      y="100"
                                      width="45"
                                      height="20"
                                    />{" "}
                                    <path d="M324.999,119.999v-20h-45c-2.652,0-5.196,1.054-7.071,2.929l-15,15l14.143,14.143l12.07-12.072H324.999z" />{" "}
                                    <rect
                                      x="310"
                                      y="235"
                                      width="115"
                                      height="20"
                                    />{" "}
                                    <rect
                                      x="280"
                                      y="270"
                                      width="145"
                                      height="20"
                                    />{" "}
                                  </g>{" "}
                                </g>{" "}
                              </g>{" "}
                            </g>
                          </svg>
                          系統後臺
                          <svg
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                              open && "rotate-180"
                            }`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                              fill=""
                            />
                          </svg>
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
                                href="/system/employee"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                  pathname === "/system/employee" &&
                                  "text-white"
                                }`}
                              >
                                人員管理
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/system/company"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                  pathname === "/system/company" && "text-white"
                                } `}
                              >
                                人員與公司設置
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/system/period"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                  pathname === "/system/period" && "text-white"
                                } `}
                              >
                                时间设置
                              </Link>
                            </li>
                            {/* <li>
                              <Link
                                href="/system/other"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                  pathname === "/reports/report" && "text-white"
                                } `}
                              >
                                其他設置
                              </Link>
                            </li> */}
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              )}
              {/* <!-- Menu Item Map --> */}
              {/* <li>
                <Link
                  href="/map"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("map") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                <svg width="18px" height="18px" viewBox="0 0 1024 1024"  version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                  <g id="SVGRepo_iconCarrier">
                  <path d="M697.051429 674.157714c-29.622857 0-59.245714 11.922286-83.017143 23.917715L412.013714 542.866286c5.924571-17.92 11.849143-35.84 11.849143-59.757715 0-23.917714-5.851429-41.837714-11.849143-59.757714l194.413715-149.430857c17.773714 17.92 47.469714 29.842286 77.165714 29.842286a147.456 147.456 0 0 0 148.406857-149.430857A147.456 147.456 0 0 0 683.52 4.900571 147.456 147.456 0 0 0 535.259429 154.331429c0 29.915429 11.849143 59.830857 23.698285 83.675428L382.317714 369.517714c-29.696-35.84-65.316571-59.757714-106.788571-65.755428v-65.755429c53.394286-11.922286 89.014857-59.757714 89.014857-113.517714 0-65.828571-53.394286-119.588571-118.710857-119.588572S127.122286 58.733714 127.122286 124.489143c0 53.76 35.547429 101.595429 89.014857 113.517714v65.828572C127.122286 321.682286 61.805714 393.362286 61.805714 483.035429s65.316571 161.426286 148.406857 173.348571v65.755429c-53.394286 11.922286-89.088 59.757714-89.088 113.590857 0 65.755429 53.394286 119.515429 118.710858 119.515428s118.784-53.76 118.784-119.515428c0-53.833143-35.620571-101.668571-89.088-113.590857v-65.755429c41.545143-5.997714 83.090286-29.915429 106.861714-65.755429l196.022857 149.211429c-11.849143 23.917714-23.698286 53.76-23.698286 83.675429 0 83.675429 65.316571 149.430857 148.406857 149.430857a147.456 147.456 0 0 0 148.406858-149.430857 147.456 147.456 0 0 0-148.48-149.430858zM683.666286 64.658286c47.469714 0 89.014857 41.910857 89.014857 89.673143 0 47.835429-41.545143 89.673143-89.014857 89.673142-47.542857 0-89.088-41.837714-89.088-89.673142 0-47.762286 41.545143-89.673143 89.088-89.673143z m-441.782857 300.032c62.244571 0 116.736 54.857143 116.736 117.467428 0 62.683429-54.491429 117.467429-116.662858 117.467429s-116.662857-54.857143-116.662857-117.467429c0-62.610286 54.418286-117.467429 116.662857-117.467428z m-61.293715-240.201143c0-35.84 23.771429-59.830857 59.318857-59.830857 35.620571 0 59.392 23.917714 59.392 59.830857 0 35.84-23.771429 59.757714-59.392 59.757714-35.547429 0-59.318857-23.917714-59.318857-59.757714z m118.710857 717.238857c0 35.84-23.771429 59.830857-59.392 59.830857-35.547429 0-59.318857-23.917714-59.318857-59.830857 0-35.84 23.771429-59.757714 59.318857-59.757714 35.620571 0 59.392 23.917714 59.392 59.757714z m397.897143 71.533714c-47.542857 0-89.014857-41.837714-89.014857-89.673143s41.545143-89.673143 89.014857-89.673142c47.542857 0 89.014857 41.837714 89.014857 89.673142s-41.545143 89.673143-89.014857 89.673143z" fill="#fafafa"/>
                  </g>
                  </svg>
                  OKR地圖
                </Link>
              </li> */}
              {/* <!-- Menu Item Map --> */}
              {/* <!-- Menu Item Settings --> */}
              {/* <li>
                <Link
                  href="/settings"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("settings") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_130_9763)">
                      <path
                        d="M17.0721 7.30835C16.7909 6.99897 16.3971 6.83022 15.9752 6.83022H15.8909C15.7502 6.83022 15.6377 6.74585 15.6096 6.63335C15.5815 6.52085 15.5252 6.43647 15.4971 6.32397C15.4409 6.21147 15.4971 6.09897 15.5815 6.0146L15.6377 5.95835C15.9471 5.6771 16.1159 5.28335 16.1159 4.86147C16.1159 4.4396 15.9752 4.04585 15.6659 3.73647L14.569 2.61147C13.9784 1.99272 12.9659 1.9646 12.3471 2.58335L12.2627 2.6396C12.1784 2.72397 12.0377 2.7521 11.8971 2.69585C11.7846 2.6396 11.6721 2.58335 11.5315 2.55522C11.3909 2.49897 11.3065 2.38647 11.3065 2.27397V2.13335C11.3065 1.26147 10.6034 0.55835 9.73148 0.55835H8.15648C7.7346 0.55835 7.34085 0.7271 7.0596 1.00835C6.75023 1.31772 6.6096 1.71147 6.6096 2.10522V2.21772C6.6096 2.33022 6.52523 2.44272 6.41273 2.49897C6.35648 2.5271 6.32835 2.5271 6.2721 2.55522C6.1596 2.61147 6.01898 2.58335 5.9346 2.49897L5.87835 2.4146C5.5971 2.10522 5.20335 1.93647 4.78148 1.93647C4.3596 1.93647 3.96585 2.0771 3.65648 2.38647L2.53148 3.48335C1.91273 4.07397 1.8846 5.08647 2.50335 5.70522L2.5596 5.7896C2.64398 5.87397 2.6721 6.0146 2.61585 6.09897C2.5596 6.21147 2.53148 6.29585 2.47523 6.40835C2.41898 6.52085 2.3346 6.5771 2.19398 6.5771H2.1096C1.68773 6.5771 1.29398 6.71772 0.984604 7.0271C0.675229 7.30835 0.506479 7.7021 0.506479 8.12397L0.478354 9.69897C0.450229 10.5708 1.15335 11.274 2.02523 11.3021H2.1096C2.25023 11.3021 2.36273 11.3865 2.39085 11.499C2.4471 11.5833 2.50335 11.6677 2.53148 11.7802C2.5596 11.8927 2.53148 12.0052 2.4471 12.0896L2.39085 12.1458C2.08148 12.4271 1.91273 12.8208 1.91273 13.2427C1.91273 13.6646 2.05335 14.0583 2.36273 14.3677L3.4596 15.4927C4.05023 16.1115 5.06273 16.1396 5.68148 15.5208L5.76585 15.4646C5.85023 15.3802 5.99085 15.3521 6.13148 15.4083C6.24398 15.4646 6.35648 15.5208 6.4971 15.549C6.63773 15.6052 6.7221 15.7177 6.7221 15.8302V15.9427C6.7221 16.8146 7.42523 17.5177 8.2971 17.5177H9.8721C10.744 17.5177 11.4471 16.8146 11.4471 15.9427V15.8302C11.4471 15.7177 11.5315 15.6052 11.644 15.549C11.7002 15.5208 11.7284 15.5208 11.7846 15.4927C11.9252 15.4365 12.0377 15.4646 12.1221 15.549L12.1784 15.6333C12.4596 15.9427 12.8534 16.1115 13.2752 16.1115C13.6971 16.1115 14.0909 15.9708 14.4002 15.6615L15.5252 14.5646C16.144 13.974 16.1721 12.9615 15.5534 12.3427L15.4971 12.2583C15.4127 12.174 15.3846 12.0333 15.4409 11.949C15.4971 11.8365 15.5252 11.7521 15.5815 11.6396C15.6377 11.5271 15.7502 11.4708 15.8627 11.4708H15.9471H15.9752C16.819 11.4708 17.5221 10.7958 17.5502 9.92397L17.5784 8.34897C17.5221 8.01147 17.3534 7.5896 17.0721 7.30835ZM16.2284 9.9521C16.2284 10.1208 16.0877 10.2615 15.919 10.2615H15.8346H15.8065C15.1596 10.2615 14.569 10.6552 14.344 11.2177C14.3159 11.3021 14.2596 11.3865 14.2315 11.4708C13.9784 12.0333 14.0909 12.7365 14.5409 13.1865L14.5971 13.2708C14.7096 13.3833 14.7096 13.5802 14.5971 13.6927L13.4721 14.7896C13.3877 14.874 13.3034 14.874 13.2471 14.874C13.1909 14.874 13.1065 14.874 13.0221 14.7896L12.9659 14.7052C12.5159 14.2271 11.8409 14.0865 11.2221 14.3677L11.1096 14.424C10.4909 14.6771 10.0971 15.2396 10.0971 15.8865V15.999C10.0971 16.1677 9.95648 16.3083 9.78773 16.3083H8.21273C8.04398 16.3083 7.90335 16.1677 7.90335 15.999V15.8865C7.90335 15.2396 7.5096 14.649 6.89085 14.424C6.80648 14.3958 6.69398 14.3396 6.6096 14.3115C6.3846 14.199 6.1596 14.1708 5.9346 14.1708C5.54085 14.1708 5.1471 14.3115 4.83773 14.6208L4.78148 14.649C4.66898 14.7615 4.4721 14.7615 4.3596 14.649L3.26273 13.524C3.17835 13.4396 3.17835 13.3552 3.17835 13.299C3.17835 13.2427 3.17835 13.1583 3.26273 13.074L3.31898 13.0177C3.7971 12.5677 3.93773 11.8646 3.6846 11.3021C3.65648 11.2177 3.62835 11.1333 3.5721 11.049C3.3471 10.4583 2.7846 10.0365 2.13773 10.0365H2.05335C1.8846 10.0365 1.74398 9.89585 1.74398 9.7271L1.7721 8.1521C1.7721 8.0396 1.82835 7.98335 1.85648 7.9271C1.8846 7.89897 1.96898 7.84272 2.08148 7.84272H2.16585C2.81273 7.87085 3.40335 7.4771 3.65648 6.88647C3.6846 6.8021 3.74085 6.71772 3.76898 6.63335C4.0221 6.07085 3.9096 5.36772 3.4596 4.91772L3.40335 4.83335C3.29085 4.72085 3.29085 4.52397 3.40335 4.41147L4.52835 3.3146C4.61273 3.23022 4.6971 3.23022 4.75335 3.23022C4.8096 3.23022 4.89398 3.23022 4.97835 3.3146L5.0346 3.39897C5.4846 3.8771 6.1596 4.01772 6.77835 3.7646L6.89085 3.70835C7.5096 3.45522 7.90335 2.89272 7.90335 2.24585V2.13335C7.90335 2.02085 7.9596 1.9646 7.98773 1.90835C8.01585 1.8521 8.10023 1.82397 8.21273 1.82397H9.78773C9.95648 1.82397 10.0971 1.9646 10.0971 2.13335V2.24585C10.0971 2.89272 10.4909 3.48335 11.1096 3.70835C11.194 3.73647 11.3065 3.79272 11.3909 3.82085C11.9815 4.1021 12.6846 3.9896 13.1627 3.5396L13.2471 3.48335C13.3596 3.37085 13.5565 3.37085 13.669 3.48335L14.7659 4.60835C14.8502 4.69272 14.8502 4.7771 14.8502 4.83335C14.8502 4.8896 14.8221 4.97397 14.7659 5.05835L14.7096 5.1146C14.2034 5.53647 14.0627 6.2396 14.2877 6.8021C14.3159 6.88647 14.344 6.97085 14.4002 7.05522C14.6252 7.64585 15.1877 8.06772 15.8346 8.06772H15.919C16.0315 8.06772 16.0877 8.12397 16.144 8.1521C16.2002 8.18022 16.2284 8.2646 16.2284 8.3771V9.9521Z"
                        fill=""
                      />
                      <path
                        d="M9.00029 5.22705C6.89092 5.22705 5.17529 6.94268 5.17529 9.05205C5.17529 11.1614 6.89092 12.8771 9.00029 12.8771C11.1097 12.8771 12.8253 11.1614 12.8253 9.05205C12.8253 6.94268 11.1097 5.22705 9.00029 5.22705ZM9.00029 11.6114C7.59404 11.6114 6.44092 10.4583 6.44092 9.05205C6.44092 7.6458 7.59404 6.49268 9.00029 6.49268C10.4065 6.49268 11.5597 7.6458 11.5597 9.05205C11.5597 10.4583 10.4065 11.6114 9.00029 11.6114Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_130_9763">
                        <rect
                          width="18"
                          height="18"
                          fill="white"
                          transform="translate(0 0.052124)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  賬戶設置
                </Link>
              </li> */}
              {/* <!-- Menu Item Settings --> */}
              {/* <li>
                <Link
                  href="/profile"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("profile") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
                      fill=""
                    />
                    <path
                      d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
                      fill=""
                    />
                  </svg>
                  Setting
                </Link>
              </li> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
