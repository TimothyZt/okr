// import React from "react";
// import {
//   Button,
//   useDisclosure,
//   Accordion,
//   AccordionItem,
//   Tabs,
//   Tab,
// } from "@nextui-org/react";
// import FeedbackItem from "./feedback-item";

// export default function TrackFeedback() {
//   return (
//     <>
//       <header className="mb-2  flex gap-1 border-slate-400">
//         <h1 className="ml-2">季度反饋</h1>
//       </header>
//       <div className="overflow-y-auto">
//         <div className="flex w-full flex-col">
//           <Tabs
//             placement="top"
//             aria-label="Options"
//             color="primary"
//             variant="underlined"
//             classNames={{
//               tabList: "gap-6 w-full relative rounded-none p-0 border-divider",
//               cursor: "w-full bg-[#22d3ee]",
//               tab: "max-w-fit px-0  h-5",
//               tabContent: "group-data-[selected=true]:text-[#06b6d4]",
//             }}
//           >
//             {/* 第一季度 */}
//             <Tab
//               key="1"
//               title={
//                 <div className="flex items-center space-x-2">
//                   <span>第一季度</span>
//                 </div>
//               }
//             >
//               <div className="rounded-2xl border-2 border-slate-200">
//                 <Accordion
//                   showDivider={false}
//                   className=" flex w-full  flex-col gap-1 p-2  "
//                   variant="shadow"
//                   itemClasses={{
//                     base: "py-0 w-full",
//                     title: "font-normal text-medium",
//                     trigger:
//                       "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
//                     indicator: "text-medium",
//                     content: "text-small px-2",
//                   }}
//                 >
//                   <AccordionItem
//                     key="1"
//                     aria-label="Accordion 1"
//                     title="KR1：全年实现销售收入6780万，扣除2022年非常规影响，实现8%增长"
//                     className="rounded-2xl border-2 border-slate-300 bg-white  text-sm shadow-14 "
//                     startContent={
//                       <div className="ml-5 mr-5 flex border-r-2 border-slate-600">
//                         <svg
//                           width="40px"
//                           height="40px"
//                           viewBox="-0.48 -0.48 24.96 24.96"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <g id="SVGRepo_bgCarrier" strokeWidth="0" />
//                           <g
//                             id="SVGRepo_tracerCarrier"
//                             stroke-linecap="round"
//                             strokeLinejoin="round"
//                           />
//                           <g id="SVGRepo_iconCarrier">
//                             <path
//                               fillRule="evenodd"
//                               clipRule="evenodd"
//                               d="M19.186 2.09c.521.25 1.136.612 1.625 1.101.49.49.852 1.104 1.1 1.625.313.654.11 1.408-.401 1.92l-7.214 7.213c-.31.31-.688.541-1.105.675l-4.222 1.353a.75.75 0 0 1-.943-.944l1.353-4.221a2.75 2.75 0 0 1 .674-1.105l7.214-7.214c.512-.512 1.266-.714 1.92-.402zm.211 2.516a3.608 3.608 0 0 0-.828-.586l-6.994 6.994a1.002 1.002 0 0 0-.178.241L9.9 14.102l2.846-1.496c.09-.047.171-.107.242-.178l6.994-6.994a3.61 3.61 0 0 0-.586-.828zM4.999 5.5A.5.5 0 0 1 5.47 5l5.53.005a1 1 0 0 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.754.977.978.442.236.866.318 1.627.318h12.154c.76 0 1.185-.082 1.627-.318.42-.224.754-.559.978-.978.236-.442.318-.866.318-1.627V13a1 1 0 1 0-2 0v5.077c0 .459-.021.571-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5z"
//                               fill="#f60909"
//                             />
//                           </g>
//                         </svg>
//                         <div className=" h-5 w-7"></div>
//                       </div>
//                     }
//                     subtitle={
//                       <div className="flex">
//                         <p className="flex items-end"></p>
//                       </div>
//                     }
//                   >
//                     <div className="w-full border-2 border-slate-100"></div>
//                     <div className="ml-13 mt-5">
//                       <FeedbackItem></FeedbackItem>
//                       <Button className="btn btn-success btn-sm  relative left-100 w-25 text-white">
//                         保存
//                       </Button>
//                     </div>
//                   </AccordionItem>
//                   <AccordionItem
//                     key="2"
//                     aria-label="Accordion 2"
//                     title="KR3：合理组织生产人员降低用工成本，人力资源成本下降2.4%，年平均人数控制在210人内"
//                     className="mt-5 rounded-2xl border-2 border-slate-300 bg-white  text-sm shadow-14 "
//                     startContent={
//                       <div className="ml-5 mr-5 flex border-r-2 border-slate-600">
//                         <svg
//                           fill="#06d402"
//                           width="40px"
//                           height="40px"
//                           viewBox="0 0 1920 1920"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <g id="SVGRepo_bgCarrier" stroke-width="0" />
//                           <g
//                             id="SVGRepo_tracerCarrier"
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                           />
//                           <g id="SVGRepo_iconCarrier">
//                             {" "}
//                             <path
//                               d="M960 1807.059c-467.125 0-847.059-379.934-847.059-847.059 0-467.125 379.934-847.059 847.059-847.059 467.125 0 847.059 379.934 847.059 847.059 0 467.125-379.934 847.059-847.059 847.059M960 0C430.645 0 0 430.645 0 960s430.645 960 960 960 960-430.645 960-960S1489.355 0 960 0M854.344 1157.975 583.059 886.69l-79.85 79.85 351.135 351.133L1454.4 717.617l-79.85-79.85-520.206 520.208Z"
//                               fill-rule="evenodd"
//                             />{" "}
//                           </g>
//                         </svg>
//                         <div className=" h-5 w-7"></div>
//                       </div>
//                     }
//                     subtitle={
//                       <div className="flex">
//                         <p className="flex items-end"></p>
//                       </div>
//                     }
//                   >
//                     <div className="w-full border-2 border-slate-100"></div>
//                     <div className="ml-13 mt-5">
//                       <FeedbackItem></FeedbackItem>
//                       <Button className="btn btn-success btn-sm  relative left-100 w-25 text-white">
//                         保存
//                       </Button>
//                     </div>
//                   </AccordionItem>
//                 </Accordion>
//               </div>
//             </Tab>

//             {/* 第二季度 */}
//             <Tab
//               key="2"
//               title={
//                 <div className="flex items-center space-x-2">
//                   <span>第二季度</span>
//                 </div>
//               }
//             >
//               <div className="rounded-2xl border-2 border-slate-200">
//                 <Accordion
//                   showDivider={false}
//                   className=" flex w-full  flex-col gap-1 p-2  "
//                   variant="shadow"
//                   itemClasses={{
//                     base: "py-0 w-full",
//                     title: "font-normal text-medium",
//                     trigger:
//                       "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
//                     indicator: "text-medium",
//                     content: "text-small px-2",
//                   }}
//                 >
//                   <AccordionItem
//                     key="1"
//                     aria-label="Accordion 1"
//                     title="KR1：全年实现销售收入6780万，扣除2022年非常规影响，实现8%增长"
//                     className="rounded-2xl border-2 border-slate-300 bg-white  text-sm shadow-14 "
//                     startContent={
//                       <div className="ml-5 mr-5 flex border-r-2 border-slate-600">
//                         <svg
//                           width="40px"
//                           height="40px"
//                           viewBox="-0.48 -0.48 24.96 24.96"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <g id="SVGRepo_bgCarrier" strokeWidth="0" />
//                           <g
//                             id="SVGRepo_tracerCarrier"
//                             stroke-linecap="round"
//                             strokeLinejoin="round"
//                           />
//                           <g id="SVGRepo_iconCarrier">
//                             <path
//                               fillRule="evenodd"
//                               clipRule="evenodd"
//                               d="M19.186 2.09c.521.25 1.136.612 1.625 1.101.49.49.852 1.104 1.1 1.625.313.654.11 1.408-.401 1.92l-7.214 7.213c-.31.31-.688.541-1.105.675l-4.222 1.353a.75.75 0 0 1-.943-.944l1.353-4.221a2.75 2.75 0 0 1 .674-1.105l7.214-7.214c.512-.512 1.266-.714 1.92-.402zm.211 2.516a3.608 3.608 0 0 0-.828-.586l-6.994 6.994a1.002 1.002 0 0 0-.178.241L9.9 14.102l2.846-1.496c.09-.047.171-.107.242-.178l6.994-6.994a3.61 3.61 0 0 0-.586-.828zM4.999 5.5A.5.5 0 0 1 5.47 5l5.53.005a1 1 0 0 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.754.977.978.442.236.866.318 1.627.318h12.154c.76 0 1.185-.082 1.627-.318.42-.224.754-.559.978-.978.236-.442.318-.866.318-1.627V13a1 1 0 1 0-2 0v5.077c0 .459-.021.571-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5z"
//                               fill="#f60909"
//                             />
//                           </g>
//                         </svg>
//                         <div className=" h-5 w-7"></div>
//                       </div>
//                     }
//                     subtitle={
//                       <div className="flex">
//                         <p className="flex items-end"></p>
//                       </div>
//                     }
//                   >
//                     <div className="w-full border-2 border-slate-100"></div>
//                     <div className="ml-13 mt-5">
//                       <FeedbackItem></FeedbackItem>
//                       <Button className="btn btn-success btn-sm  relative left-100 w-25 text-white">
//                         保存
//                       </Button>
//                     </div>
//                   </AccordionItem>
//                   <AccordionItem
//                     key="2"
//                     aria-label="Accordion 2"
//                     title="KR3：合理组织生产人员降低用工成本，人力资源成本下降2.4%，年平均人数控制在210人内"
//                     className="rounded-2xl border-2 border-slate-300 bg-white  text-sm shadow-14 "
//                     startContent={
//                       <div className="ml-5 mr-5 flex border-r-2 border-slate-600">
//                         <svg
//                           width="40px"
//                           height="40px"
//                           viewBox="-0.48 -0.48 24.96 24.96"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <g id="SVGRepo_bgCarrier" strokeWidth="0" />
//                           <g
//                             id="SVGRepo_tracerCarrier"
//                             stroke-linecap="round"
//                             strokeLinejoin="round"
//                           />
//                           <g id="SVGRepo_iconCarrier">
//                             <path
//                               fillRule="evenodd"
//                               clipRule="evenodd"
//                               d="M19.186 2.09c.521.25 1.136.612 1.625 1.101.49.49.852 1.104 1.1 1.625.313.654.11 1.408-.401 1.92l-7.214 7.213c-.31.31-.688.541-1.105.675l-4.222 1.353a.75.75 0 0 1-.943-.944l1.353-4.221a2.75 2.75 0 0 1 .674-1.105l7.214-7.214c.512-.512 1.266-.714 1.92-.402zm.211 2.516a3.608 3.608 0 0 0-.828-.586l-6.994 6.994a1.002 1.002 0 0 0-.178.241L9.9 14.102l2.846-1.496c.09-.047.171-.107.242-.178l6.994-6.994a3.61 3.61 0 0 0-.586-.828zM4.999 5.5A.5.5 0 0 1 5.47 5l5.53.005a1 1 0 0 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.754.977.978.442.236.866.318 1.627.318h12.154c.76 0 1.185-.082 1.627-.318.42-.224.754-.559.978-.978.236-.442.318-.866.318-1.627V13a1 1 0 1 0-2 0v5.077c0 .459-.021.571-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5z"
//                               fill="#f60909"
//                             />
//                           </g>
//                         </svg>
//                         <div className=" h-5 w-7"></div>
//                       </div>
//                     }
//                     subtitle={
//                       <div className="flex">
//                         <p className="flex items-end"></p>
//                       </div>
//                     }
//                   >
//                     <div className="w-full border-2 border-slate-100"></div>
//                     <div className="ml-13 mt-5">
//                       <FeedbackItem></FeedbackItem>
//                       <Button className="btn btn-success btn-sm  relative left-100 w-25 text-white">
//                         保存
//                       </Button>
//                     </div>
//                   </AccordionItem>
//                 </Accordion>
//               </div>
//             </Tab>
//             {/* 第三季度 */}
//             <Tab
//               key="3"
//               title={
//                 <div className="flex items-center space-x-2">
//                   <span>第三季度</span>
//                 </div>
//               }
//             >
//               <div className="rounded-2xl border-2 border-slate-200">
//                 <Accordion
//                   showDivider={false}
//                   className=" flex w-full  flex-col gap-1 p-2  "
//                   variant="shadow"
//                   itemClasses={{
//                     base: "py-0 w-full",
//                     title: "font-normal text-medium",
//                     trigger:
//                       "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
//                     indicator: "text-medium",
//                     content: "text-small px-2",
//                   }}
//                 >
//                   <AccordionItem
//                     key="1"
//                     aria-label="Accordion 1"
//                     title="KR1：全年实现销售收入6780万，扣除2022年非常规影响，实现8%增长"
//                     className="rounded-2xl border-2 border-slate-300 bg-white  text-sm shadow-14 "
//                     startContent={
//                       <div className="ml-5 mr-5 flex border-r-2 border-slate-600">
//                         <svg
//                           width="40px"
//                           height="40px"
//                           viewBox="-0.48 -0.48 24.96 24.96"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <g id="SVGRepo_bgCarrier" strokeWidth="0" />
//                           <g
//                             id="SVGRepo_tracerCarrier"
//                             stroke-linecap="round"
//                             strokeLinejoin="round"
//                           />
//                           <g id="SVGRepo_iconCarrier">
//                             <path
//                               fillRule="evenodd"
//                               clipRule="evenodd"
//                               d="M19.186 2.09c.521.25 1.136.612 1.625 1.101.49.49.852 1.104 1.1 1.625.313.654.11 1.408-.401 1.92l-7.214 7.213c-.31.31-.688.541-1.105.675l-4.222 1.353a.75.75 0 0 1-.943-.944l1.353-4.221a2.75 2.75 0 0 1 .674-1.105l7.214-7.214c.512-.512 1.266-.714 1.92-.402zm.211 2.516a3.608 3.608 0 0 0-.828-.586l-6.994 6.994a1.002 1.002 0 0 0-.178.241L9.9 14.102l2.846-1.496c.09-.047.171-.107.242-.178l6.994-6.994a3.61 3.61 0 0 0-.586-.828zM4.999 5.5A.5.5 0 0 1 5.47 5l5.53.005a1 1 0 0 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.754.977.978.442.236.866.318 1.627.318h12.154c.76 0 1.185-.082 1.627-.318.42-.224.754-.559.978-.978.236-.442.318-.866.318-1.627V13a1 1 0 1 0-2 0v5.077c0 .459-.021.571-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5z"
//                               fill="#f60909"
//                             />
//                           </g>
//                         </svg>
//                         <div className=" h-5 w-7"></div>
//                       </div>
//                     }
//                     subtitle={
//                       <div className="flex">
//                         <p className="flex items-end"></p>
//                       </div>
//                     }
//                   >
//                     <div className="w-full border-2 border-slate-100"></div>
//                     <div className="ml-13 mt-5">
//                       <FeedbackItem></FeedbackItem>
//                       <Button className="btn btn-success btn-sm  relative left-100 w-25 text-white">
//                         保存
//                       </Button>
//                     </div>
//                   </AccordionItem>
//                   <AccordionItem
//                     key="2"
//                     aria-label="Accordion 2"
//                     title="KR3：合理组织生产人员降低用工成本，人力资源成本下降2.4%，年平均人数控制在210人内"
//                     className="rounded-2xl border-2 border-slate-300 bg-white  text-sm shadow-14 "
//                     startContent={
//                       <div className="ml-5 mr-5 flex border-r-2 border-slate-600">
//                         <svg
//                           width="40px"
//                           height="40px"
//                           viewBox="-0.48 -0.48 24.96 24.96"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <g id="SVGRepo_bgCarrier" strokeWidth="0" />
//                           <g
//                             id="SVGRepo_tracerCarrier"
//                             stroke-linecap="round"
//                             strokeLinejoin="round"
//                           />
//                           <g id="SVGRepo_iconCarrier">
//                             <path
//                               fillRule="evenodd"
//                               clipRule="evenodd"
//                               d="M19.186 2.09c.521.25 1.136.612 1.625 1.101.49.49.852 1.104 1.1 1.625.313.654.11 1.408-.401 1.92l-7.214 7.213c-.31.31-.688.541-1.105.675l-4.222 1.353a.75.75 0 0 1-.943-.944l1.353-4.221a2.75 2.75 0 0 1 .674-1.105l7.214-7.214c.512-.512 1.266-.714 1.92-.402zm.211 2.516a3.608 3.608 0 0 0-.828-.586l-6.994 6.994a1.002 1.002 0 0 0-.178.241L9.9 14.102l2.846-1.496c.09-.047.171-.107.242-.178l6.994-6.994a3.61 3.61 0 0 0-.586-.828zM4.999 5.5A.5.5 0 0 1 5.47 5l5.53.005a1 1 0 0 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.754.977.978.442.236.866.318 1.627.318h12.154c.76 0 1.185-.082 1.627-.318.42-.224.754-.559.978-.978.236-.442.318-.866.318-1.627V13a1 1 0 1 0-2 0v5.077c0 .459-.021.571-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5z"
//                               fill="#f60909"
//                             />
//                           </g>
//                         </svg>
//                         <div className=" h-5 w-7"></div>
//                       </div>
//                     }
//                     subtitle={
//                       <div className="flex">
//                         <p className="flex items-end"></p>
//                       </div>
//                     }
//                   >
//                     <div className="w-full border-2 border-slate-100"></div>
//                     <div className="ml-13 mt-5">
//                       <FeedbackItem></FeedbackItem>
//                       <Button className="btn btn-success btn-sm  relative left-100 w-25 text-white">
//                         保存
//                       </Button>
//                     </div>
//                   </AccordionItem>
//                 </Accordion>
//               </div>
//             </Tab>
//             {/* 第四季度 */}
//             <Tab
//               key="4"
//               title={
//                 <div className="flex items-center space-x-2">
//                   <span>第四季度</span>
//                 </div>
//               }
//             >
//               <div className="rounded-2xl border-2 border-slate-200">
//                 <Accordion
//                   showDivider={false}
//                   className=" flex w-full  flex-col gap-1 p-2  "
//                   variant="shadow"
//                   itemClasses={{
//                     base: "py-0 w-full",
//                     title: "font-normal text-medium",
//                     trigger:
//                       "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
//                     indicator: "text-medium",
//                     content: "text-small px-2",
//                   }}
//                 >
//                   <AccordionItem
//                     key="1"
//                     aria-label="Accordion 1"
//                     title="KR1：全年实现销售收入6780万，扣除2022年非常规影响，实现8%增长"
//                     className="rounded-2xl border-2 border-slate-300 bg-white  text-sm shadow-14 "
//                     startContent={
//                       <div className="ml-5 mr-5 flex border-r-2 border-slate-600">
//                         <svg
//                           width="40px"
//                           height="40px"
//                           viewBox="-0.48 -0.48 24.96 24.96"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <g id="SVGRepo_bgCarrier" strokeWidth="0" />
//                           <g
//                             id="SVGRepo_tracerCarrier"
//                             stroke-linecap="round"
//                             strokeLinejoin="round"
//                           />
//                           <g id="SVGRepo_iconCarrier">
//                             <path
//                               fillRule="evenodd"
//                               clipRule="evenodd"
//                               d="M19.186 2.09c.521.25 1.136.612 1.625 1.101.49.49.852 1.104 1.1 1.625.313.654.11 1.408-.401 1.92l-7.214 7.213c-.31.31-.688.541-1.105.675l-4.222 1.353a.75.75 0 0 1-.943-.944l1.353-4.221a2.75 2.75 0 0 1 .674-1.105l7.214-7.214c.512-.512 1.266-.714 1.92-.402zm.211 2.516a3.608 3.608 0 0 0-.828-.586l-6.994 6.994a1.002 1.002 0 0 0-.178.241L9.9 14.102l2.846-1.496c.09-.047.171-.107.242-.178l6.994-6.994a3.61 3.61 0 0 0-.586-.828zM4.999 5.5A.5.5 0 0 1 5.47 5l5.53.005a1 1 0 0 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.754.977.978.442.236.866.318 1.627.318h12.154c.76 0 1.185-.082 1.627-.318.42-.224.754-.559.978-.978.236-.442.318-.866.318-1.627V13a1 1 0 1 0-2 0v5.077c0 .459-.021.571-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5z"
//                               fill="#f60909"
//                             />
//                           </g>
//                         </svg>
//                         <div className=" h-5 w-7"></div>
//                       </div>
//                     }
//                     subtitle={
//                       <div className="flex">
//                         <p className="flex items-end"></p>
//                       </div>
//                     }
//                   >
//                     <div className="w-full border-2 border-slate-100"></div>
//                     <div className="ml-13 mt-5">
//                       <FeedbackItem></FeedbackItem>
//                       <Button className="btn btn-success btn-sm  relative left-100 w-25 text-white">
//                         保存
//                       </Button>
//                     </div>
//                   </AccordionItem>
//                   <AccordionItem
//                     key="2"
//                     aria-label="Accordion 2"
//                     title="KR3：合理组织生产人员降低用工成本，人力资源成本下降2.4%，年平均人数控制在210人内"
//                     className="rounded-2xl border-2 border-slate-300 bg-white  text-sm shadow-14 "
//                     startContent={
//                       <div className="ml-5 mr-5 flex border-r-2 border-slate-600">
//                         <svg
//                           width="40px"
//                           height="40px"
//                           viewBox="-0.48 -0.48 24.96 24.96"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <g id="SVGRepo_bgCarrier" strokeWidth="0" />
//                           <g
//                             id="SVGRepo_tracerCarrier"
//                             stroke-linecap="round"
//                             strokeLinejoin="round"
//                           />
//                           <g id="SVGRepo_iconCarrier">
//                             <path
//                               fillRule="evenodd"
//                               clipRule="evenodd"
//                               d="M19.186 2.09c.521.25 1.136.612 1.625 1.101.49.49.852 1.104 1.1 1.625.313.654.11 1.408-.401 1.92l-7.214 7.213c-.31.31-.688.541-1.105.675l-4.222 1.353a.75.75 0 0 1-.943-.944l1.353-4.221a2.75 2.75 0 0 1 .674-1.105l7.214-7.214c.512-.512 1.266-.714 1.92-.402zm.211 2.516a3.608 3.608 0 0 0-.828-.586l-6.994 6.994a1.002 1.002 0 0 0-.178.241L9.9 14.102l2.846-1.496c.09-.047.171-.107.242-.178l6.994-6.994a3.61 3.61 0 0 0-.586-.828zM4.999 5.5A.5.5 0 0 1 5.47 5l5.53.005a1 1 0 0 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.754.977.978.442.236.866.318 1.627.318h12.154c.76 0 1.185-.082 1.627-.318.42-.224.754-.559.978-.978.236-.442.318-.866.318-1.627V13a1 1 0 1 0-2 0v5.077c0 .459-.021.571-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5z"
//                               fill="#f60909"
//                             />
//                           </g>
//                         </svg>
//                         <div className=" h-5 w-7"></div>
//                       </div>
//                     }
//                     subtitle={
//                       <div className="flex">
//                         <p className="flex items-end"></p>
//                       </div>
//                     }
//                   >
//                     <div className="w-full border-2 border-slate-100"></div>
//                     <div className="ml-13 mt-5">
//                       <FeedbackItem></FeedbackItem>
//                       <Button className="btn btn-success btn-sm  relative left-100 w-25 text-white">
//                         保存
//                       </Button>
//                     </div>
//                   </AccordionItem>
//                 </Accordion>
//               </div>
//             </Tab>
//           </Tabs>
//         </div>
//       </div>
//     </>
//   );
// }
