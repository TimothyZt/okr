// "use client";
// import React, { useState } from "react";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import { Tab, Tabs } from "@nextui-org/tabs";
// import { Card, CardBody } from "@nextui-org/card";
// import { Button } from "@nextui-org/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableColumn,
//   TableHeader,
//   TableRow,
// } from "@nextui-org/table";
// import KRDetail from "@/components/CreateOKR/KRDetail";
// import {
//   Chip,
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@nextui-org/react";
// import CascadingDropdown from "@/components/CascadingDropdown";
// import AuditOModel from "./audit-content/audit-o-model";
// import AuditContent from "./audit-content";
// import AuditKRTable from "./audit-content/audit-kr-table";
// export default function AuditPage() {
//   const [sidebarOpen, setSidebarOpen] = useState(false); //导航栏
//   const [isChecked, setIsChecked] = useState(false);
//   const [cardSelected1, setCardSelected1] = useState(false);
//   const [cardSelected2, setCardSelected2] = useState(false);

//   const handleAllCheckClick = () => {
//     setIsChecked(!isChecked);
//     setCardSelected1(true);
//     setCardSelected2(true);
//   };

//   const handleOneCheckClick1 = () => {
//     setCardSelected1(!cardSelected1);
//   };

//   const handleOneCheckClick2 = () => {
//     setCardSelected2(!cardSelected2);
//   };

//   const handleAllCheckCancel = () => {
//     setIsChecked(false);
//     setCardSelected1(false);
//     setCardSelected2(false);
//   };
//   return (
//     <DefaultLayout>
//       <div className="absolute right-12 mt-3 flex">
//         <CascadingDropdown></CascadingDropdown>
//       </div>
//       <div className="flex">
//         <div className="h-screen w-full  border-2  border-slate-200 bg-slate-50 sm:h-full">
//           <Tabs
//             aria-label="Options"
//             color="primary"
//             variant="underlined"
//             classNames={{
//               tabList: "gap-6 w-full relative rounded-none p-0  border-divider",
//               cursor: "w-full bg-[#22d3ee]",
//               tab: "max-w-fit px-0 h-12 ml-6",
//               tabContent: "group-data-[selected=true]:text-[#06b6d4]",
//             }}
//           >
//             <Tab
//               key="create"
//               title={
//                 <div className="flex items-center space-x-2">
//                   <span>未處理的</span>
//                   <Chip size="sm" variant="faded">
                    
//                   </Chip>
//                 </div>
//               }
//               className="text-red"
//             >
//               <div className="relative left-0 ml-5 flex">
//                 {isChecked && (
//                   <button
//                     className="btn btn-success btn-sm mr-5 block rounded-md bg-teal-600 text-white"
//                     onClick={handleAllCheckCancel}
//                   >
//                     取消全選
//                   </button>
//                 )}
//                 {!isChecked && (
//                   <button
//                     className="btn btn-success btn-sm mr-5 block rounded-md bg-teal-600 text-white"
//                     onClick={handleAllCheckClick}
//                   >
//                     全選
//                   </button>
//                 )}
//                 <Popover placement="bottom" offset={20} showArrow>
//                   <PopoverTrigger>
//                     <button className="btn btn-success btn-sm mr-5 block rounded-md bg-teal-600 text-white">
//                       批量審核
//                     </button>
//                   </PopoverTrigger>
//                   <PopoverContent>
//                     <div className="border-2 border-slate-400 bg-slate-200">
//                       <button className="btn btn-success btn-sm ml-3 mr-3 mt-3 block rounded-md bg-teal-600 text-white">
//                         通過
//                       </button>
//                       <button className="btn btn-success btn-sm mb-3 ml-3 mr-3 mt-3 block rounded-md bg-teal-600 text-white">
//                         駁回
//                       </button>
//                     </div>
//                   </PopoverContent>
//                 </Popover>
//               </div>
//               <Card>
//                 <CardBody className=" h-full w-full">
//                   <AuditContent auditStatus="doing">
//                     <div className="absolute left-5 top-5">
//                       {isChecked && !cardSelected1 && (
//                         <input
//                           type="checkbox"
//                           className="checkbox checkbox-md"
//                           checked={cardSelected1}
//                           onClick={handleOneCheckClick1}
//                         />
//                       )}
//                       {!(isChecked && !cardSelected1) && (
//                         <input
//                           type="checkbox"
//                           className="checkbox checkbox-md"
//                           checked={cardSelected1 ? cardSelected1 : isChecked}
//                           onClick={handleOneCheckClick1}
//                         />
//                       )}
//                     </div>
//                     <div className="">
//                       <div className="justify-content ml-3 mr-0 flex w-full overflow-hidden bg-center"></div>
//                       <div className="mt-5 w-full">
                        
//                         <AuditOModel
//                           auditStatus="doing"
//                           sidebarOpen={sidebarOpen}
//                           okrLevel="公司級"
//                           setSidebarOpen={setSidebarOpen}
//                           okrCheckPerson="M3303"
//                           okrCardType="O1"
//                           okrTitle="OKR調研"
//                           oStatus="audit"
//                         />
//                         <div
//                           className="bottom-line ml-5"
//                           style={{
//                             borderBottom: "1px solid gray",
//                             width: "97%",
//                             opacity: 0.3,
//                           }}
//                         />
//                         <div className="m ml-5 mr-5 overflow-auto">
//                           <AuditKRTable oStatus="audit" auditStatus="">
//                             <AuditKRTableItem
//                               auditStatus=""
//                               KRPermission={true}
//                               weight={50}
//                               completiondegree={0}
//                               KRId={1}
//                               OKRType={true}
//                               KRItemName="蒲公英測試"
//                             />
//                             <AuditKRTableItem
//                               auditStatus=""
//                               KRPermission={true}
//                               weight={50}
//                               completiondegree={0}
//                               KRId={2}
//                               OKRType={false}
//                               KRItemName="蒲公英測試"
//                             ></AuditKRTableItem>
//                           </AuditKRTable>
//                         </div>
//                         <div
//                           className="bottom-line ml-5"
//                           style={{
//                             borderBottom: "1px solid gray",
//                             width: "97%",
//                             opacity: 0.3,
//                           }}
//                         />
//                       </div>
//                     </div>
//                   </AuditCard>
//                 </CardBody>
//               </Card>

//               <Card>
//                 <CardBody>
//                   <AuditCard auditStatus="doing">
//                     <div className="absolute left-5 top-5">
//                       {isChecked && !cardSelected2 && (
//                         <input
//                           type="checkbox"
//                           className="checkbox checkbox-md"
//                           checked={cardSelected2}
//                           onClick={handleOneCheckClick2}
//                         />
//                       )}
//                       {!(isChecked && !cardSelected2) && (
//                         <input
//                           type="checkbox"
//                           className="checkbox checkbox-md"
//                           checked={cardSelected2 ? cardSelected2 : isChecked}
//                           onClick={handleOneCheckClick2}
//                         />
//                       )}
//                     </div>
//                     <div className="">
//                       <div className="justify-content ml-3 mr-0 flex w-full overflow-hidden bg-center"></div>
//                       <div className="mt-5 w-full">
//                         <div className=""></div>
//                         <AudtitOModel
//                           auditStatus="doing"
//                           sidebarOpen={sidebarOpen}
//                           okrLevel="公司級"
//                           setSidebarOpen={setSidebarOpen}
//                           okrCheckPerson="M3303"
//                           okrCardType="O3"
//                           okrTitle="OKR調研"
//                           oStatus="audit"
//                         ></AudtitOModel>
//                         <div
//                           className="bottom-line ml-5"
//                           style={{
//                             borderBottom: "1px solid gray",
//                             width: "97%",
//                             opacity: 0.3,
//                           }}
//                         />
//                         <div className="m ml-5 mr-5 overflow-auto">
//                           <AuditKRTable oStatus="audit" auditStatus="">
//                             <tr className="hover border-none">
//                               <td>
//                                 <div className="flex text-center">
//                                   <button className="btn btn-xs w-12 rounded-xl bg-green-100 text-center text-green-600">
//                                     KR1
//                                   </button>
//                                   <label
//                                     id="itemname"
//                                     className="ml-2 mt-0.5 text-center"
//                                   >
//                                     蒲公英測試
//                                   </label>
//                                 </div>
//                               </td>

//                               <td className="text-center text-rose-600">60%</td>
//                               <td className="text-center">
//                                 <div>
//                                   <Button className="text-md  btn btn-xs h-6 w-18 items-center rounded-none  bg-yellow-500 text-center text-white">
//                                     待审核
//                                   </Button>
//                                 </div>
//                               </td>
//                               <td className="text-center">
//                                 <KRDetail btnName="詳情"></KRDetail>
//                               </td>
//                             </tr>

//                             <tr className="hover border-none">
//                               <td>
//                                 <div className="flex text-center">
//                                   <button className="btn btn-xs w-12 rounded-xl bg-green-100 text-center text-green-600">
//                                     KR2
//                                   </button>
//                                   <label
//                                     id="itemname"
//                                     className="ml-2 mt-0.5 text-center text-rose-500"
//                                   >
//                                     蒲公英測試2
//                                   </label>
//                                 </div>
//                               </td>

//                               <td className="text-center  text-rose-600">
//                                 40%
//                               </td>
//                               <td className="text-center">
//                                 <div>
//                                   <Button className="text-md  btn btn-xs h-6 w-18 items-center rounded-none  bg-yellow-500 text-center text-white">
//                                     待審核
//                                   </Button>
//                                 </div>
//                               </td>
//                               <td className="text-center">
//                                 <KRDetail btnName="詳情"></KRDetail>
//                               </td>
//                             </tr>
//                           </AuditKRTable>
//                         </div>
//                         <div
//                           className="bottom-line ml-5"
//                           style={{
//                             borderBottom: "1px solid gray",
//                             width: "97%",
//                             opacity: 0.3,
//                           }}
//                         />
//                       </div>
//                     </div>
//                   </AuditCard>
//                 </CardBody>
//               </Card>
//             </Tab>
//             {/* <Tab key="update" title="更新審核" className="">
//                 <Card>
//                     <CardBody>

//                     <Accordion selectionMode="multiple">
//                         <AccordionItem key="3" aria-label="O1 修改申請" title="O1 修改申請" className="">
//                             <UpdateAuditOKR></UpdateAuditOKR>
//                         </AccordionItem>
//                         </Accordion>

//                     </CardBody>
//                 </Card>  
//                 </Tab> */}
//             <Tab key="complete" title="已處理的">
//               <Card>
//                 <CardBody className=" h-full w-full">
//                   <AuditCard auditStatus="failed">
//                     <div className="absolute left-5 top-5"></div>
//                     <div className="">
//                       <div className="justify-content ml-3 mr-0 flex w-full overflow-hidden bg-center"></div>
//                       <div className="mt-5 w-full">
//                         <div className=""></div>
//                         <AudtitOModel
//                           auditStatus="completed"
//                           sidebarOpen={sidebarOpen}
//                           okrLevel="公司級"
//                           setSidebarOpen={setSidebarOpen}
//                           okrCheckPerson="M3303"
//                           okrCardType="O2"
//                           okrTitle="OKR調研"
//                           oStatus="audit"
//                         ></AudtitOModel>
//                         <div
//                           className="bottom-line ml-5"
//                           style={{
//                             borderBottom: "1px solid gray",
//                             width: "97%",
//                             opacity: 0.3,
//                           }}
//                         />
//                         <div className="m ml-5 mr-5 overflow-auto">
//                           <AuditKRTable oStatus="audit" auditStatus="">
//                             <tr className="hover border-none">
//                               <td>
//                                 <div className="flex text-center">
//                                   <button className="btn btn-xs w-12 rounded-xl bg-green-100 text-center text-green-600">
//                                     KR1
//                                   </button>
//                                   <label
//                                     id="itemname"
//                                     className="ml-2 mt-0.5 text-center"
//                                   >
//                                     蒲公英測試
//                                   </label>
//                                 </div>
//                               </td>

//                               <td className="text-center">50%</td>
//                               <td className="text-center">
//                                 <div>
//                                   <Button className="text-md  btn btn-xs h-6 w-18 items-center rounded-none  bg-green-600 text-center text-white">
//                                     通過
//                                   </Button>
//                                 </div>
//                               </td>
//                               <td className="text-center">
//                                 <KRDetail btnName="詳情"></KRDetail>
//                               </td>
//                             </tr>

//                             <tr className="hover border-none">
//                               <td>
//                                 <div className="flex text-center">
//                                   <button className="btn btn-xs w-12 rounded-xl bg-green-100 text-center text-green-600">
//                                     KR1
//                                   </button>
//                                   <label
//                                     id="itemname"
//                                     className="ml-2 mt-0.5 text-center"
//                                   >
//                                     蒲公英測試
//                                   </label>
//                                 </div>
//                               </td>

//                               <td className="text-center">50%</td>
//                               <td className="text-center">
//                                 <div>
//                                   <Button className="btn   btn-xs h-6 w-18 rounded-none bg-rose-600   text-center text-white">
//                                     駁回
//                                   </Button>
//                                 </div>
//                               </td>
//                               <td className="text-center">
//                                 <KRDetail btnName="詳情"></KRDetail>
//                               </td>
//                             </tr>
//                           </AuditKRTable>
//                         </div>
//                         <div
//                           className="bottom-line ml-5"
//                           style={{
//                             borderBottom: "1px solid gray",
//                             width: "97%",
//                             opacity: 0.3,
//                           }}
//                         />
//                       </div>
//                     </div>
//                   </AuditCard>
//                 </CardBody>
//               </Card>
//               <Card>
//                 <CardBody>
//                   <AuditCard auditStatus="success">
//                     <div className="absolute left-5 top-5"></div>
//                     <div className="">
//                       <div className="justify-content ml-3 mr-0 flex w-full overflow-hidden bg-center"></div>
//                       <div className="mt-5 w-full">
//                         <div className=""></div>
//                         <AudtitOModel
//                           auditStatus="completed"
//                           sidebarOpen={sidebarOpen}
//                           okrLevel="公司級"
//                           setSidebarOpen={setSidebarOpen}
//                           okrCheckPerson="M3303"
//                           okrCardType="O3"
//                           okrTitle="OKR調研"
//                           oStatus="audit"
//                         ></AudtitOModel>
//                         <div
//                           className="bottom-line ml-5"
//                           style={{
//                             borderBottom: "1px solid gray",
//                             width: "97%",
//                             opacity: 0.3,
//                           }}
//                         />
//                         <div className="m ml-5 mr-5 overflow-auto">
//                           <AuditKRTable oStatus="audit" auditStatus="">
//                             <tr className="hover border-none">
//                               <td>
//                                 <div className="flex text-center">
//                                   <button className="btn btn-xs w-12 rounded-xl bg-green-100 text-center text-green-600">
//                                     KR1
//                                   </button>
//                                   <label
//                                     id="itemname"
//                                     className="ml-2 mt-0.5 text-center"
//                                   >
//                                     蒲公英測試
//                                   </label>
//                                 </div>
//                               </td>

//                               <td className="text-center">50%</td>
//                               <td className="text-center">
//                                 <div>
//                                   <Button className="text-md  btn btn-xs h-6 w-18 items-center rounded-none  bg-green-600 text-center text-white">
//                                     通過
//                                   </Button>
//                                 </div>
//                               </td>
//                               <td className="text-center">
//                                 <KRDetail btnName="詳情"></KRDetail>
//                               </td>
//                             </tr>

//                             <tr className="hover border-none">
//                               <td>
//                                 <div className="flex text-center">
//                                   <button className="btn btn-xs w-12 rounded-xl bg-green-100 text-center text-green-600">
//                                     KR2
//                                   </button>
//                                   <label
//                                     id="itemname"
//                                     className="ml-2 mt-0.5 text-center"
//                                   >
//                                     蒲公英測試
//                                   </label>
//                                 </div>
//                               </td>

//                               <td className="text-center">50%</td>
//                               <td className="text-center">
//                                 <div>
//                                   <Button className="text-md  btn btn-xs h-6 w-18 items-center rounded-none  bg-green-600 text-center text-white">
//                                     通過
//                                   </Button>
//                                 </div>
//                               </td>
//                               <td className="text-center">
//                                 <KRDetail btnName="詳情"></KRDetail>
//                               </td>
//                             </tr>
//                           </AuditKRTable>
//                         </div>
//                         <div
//                           className="bottom-line ml-5"
//                           style={{
//                             borderBottom: "1px solid gray",
//                             width: "97%",
//                             opacity: 0.3,
//                           }}
//                         />
//                       </div>
//                     </div>
//                   </AuditCard>
//                 </CardBody>
//               </Card>
//             </Tab>

//             <Tab key="remake" title="撤銷記錄">
//               <Card>
//                 <CardBody className="h-screen w-full bg-white">
//                   <Table aria-label="Example static collection table">
//                     <TableHeader>
//                       <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
//                         公司名稱
//                       </TableColumn>
//                       <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
//                         目標(O)描述
//                       </TableColumn>
//                       <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
//                         負責人編號
//                       </TableColumn>
//                       <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
//                         負責人名稱
//                       </TableColumn>
//                       <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
//                         審核狀態
//                       </TableColumn>
//                       <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
//                         更新時間
//                       </TableColumn>
//                     </TableHeader>
//                     <TableBody>
//                       <TableRow key="1">
//                         <TableCell className="border-b-2 border-slate-200 text-sm">
//                           中華商務聯合印刷
//                         </TableCell>
//                         <TableCell className="border-b-2 border-slate-200 text-sm">
//                           O1
//                         </TableCell>
//                         <TableCell className="border-b-2 border-slate-200 text-sm">
//                           T0345
//                         </TableCell>
//                         <TableCell className="border-b-2 border-slate-200 text-sm">
//                           YYY
//                         </TableCell>
//                         <TableCell className="border-b-2 border-slate-200 text-sm">
//                           撤回
//                         </TableCell>
//                         <TableCell className="border-b-2 border-slate-200 text-sm">
//                           2024年7月8日
//                         </TableCell>
//                       </TableRow>
//                     </TableBody>
//                   </Table>
//                 </CardBody>
//               </Card>
//             </Tab>

//             <Tab key="records" title="歷史記錄" className="">
//               <Card>
//                 <CardBody className="h-screen w-full bg-white">
//                   <Table aria-label="Example static collection table">
//                     <TableHeader>
//                       <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
//                         公司名稱
//                       </TableColumn>
//                       <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
//                         目標(O)描述
//                       </TableColumn>
//                       <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
//                         負責人編號
//                       </TableColumn>
//                       <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
//                         負責人名稱
//                       </TableColumn>
//                       <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
//                         審核結果
//                       </TableColumn>
//                       <TableColumn className="border-b-2 border-slate-200 bg-slate-50 text-sm shadow-14">
//                         審核時間
//                       </TableColumn>
//                     </TableHeader>
//                     <TableBody>
//                       <TableRow key="1">
//                         <TableCell className="border-b-2 border-slate-200 text-sm">
//                           中華商務聯合印刷
//                         </TableCell>
//                         <TableCell className="border-b-2 border-slate-200 text-sm">
//                           O1
//                         </TableCell>
//                         <TableCell className="border-b-2 border-slate-200 text-sm">
//                           Test2
//                         </TableCell>
//                         <TableCell className="border-b-2 border-slate-200 text-sm">
//                           YYY
//                         </TableCell>
//                         <TableCell className="border-b-2 border-slate-200 text-sm">
//                           已通過
//                         </TableCell>
//                         <TableCell className="border-b-2 border-slate-200 text-sm">
//                           2024年7月8日
//                         </TableCell>
//                       </TableRow>
//                     </TableBody>
//                   </Table>
//                 </CardBody>
//               </Card>
//             </Tab>
//           </Tabs>
//         </div>
//       </div>
//     </DefaultLayout>
//   );
// }
