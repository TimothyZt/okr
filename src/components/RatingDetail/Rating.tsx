
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, CardBody, Card, DatePicker, RadioGroup, Accordion, AccordionItem, Table, TableColumn, TableHeader, TableBody, TableRow, TableCell, Tabs, Tab, Chip} from "@nextui-org/react";
import RatingDropdown from "../RatingDropdown";
import Draggable from "react-draggable";

const content = <>

   <div className="mt-3 flex">
        <div className="w-6/12">
          <div className="mt-0 ml-0 w-10/12">
              <label className="pb-3 block text-sm font-medium  text-black dark:text-white" >
              關鍵結果(KR)描述
              </label>
              <textarea
              rows={6}
              placeholder="請填寫關鍵結果(KR)描述"
              disabled
              className="w-full h-20  rounded-lg border-[1.5px] bg-transparent py-3  text-black border-stroke outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
              ></textarea>           
          </div>
          <div className="mt-5 ml-0 w-10/12">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  承接人
              </label>

              {/* 代替Coordinator */}
              <input
              type="text"
              placeholder="謝祖添 C4503"
              disabled
              className="w-full rounded-none border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
              />
          </div>

          <div className="mt-5 ml-0 w-10/12">

            <div className="mb-5 w-full">
                    <label className="pb-3 block text-sm font-medium  text-black dark:text-white" >
                    進度描述
                    </label>
                    <textarea
                    rows={6}
                    placeholder="請填寫進度描述"
                    disabled
                    className="w-full h-20 rounded-lg border-[1.5px] bg-transparent py-3  text-black border-stroke outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                    ></textarea>           
                </div>

                <div className="mb-5 w-full">
                    <label className="pb-3 block text-sm font-medium  text-black dark:text-white" >
                    現存/潛在問題
                    </label>
                    <textarea
                    rows={6}
                    placeholder="請填寫現存/潛在問題"
                    disabled
                    className="w-full h-20 rounded-lg border-[1.5px] bg-transparent py-3  text-black border-stroke outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                    ></textarea>           
                </div>
            </div>
          </div>
          <div className="w-6/12">
             <div className="mb-5 w-11/12">
                  <label className="pb-3 block text-sm font-medium  text-black dark:text-white" >
                  解決策略
                  </label>
                  <textarea
                  rows={6}
                  placeholder="解決策略"
                  disabled
                  className="w-full h-20 rounded-lg border-[1.5px] bg-transparent py-3  text-black border-stroke outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                  ></textarea>           
              </div>
              <div className="flex w-11/12">
                  
                  <div className="mb-5 w-6/12 mr-5">
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                        進度
                    </label>
                    <input
                    type="text"
                    placeholder="70%"
                    disabled
                    className="w-full rounded-none border-[1.5px]  border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white  dark:disabled:bg-black"
                    />
                </div>
  
                <div className="mb-5 w-6/12 ml-5">
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                        自評
                    </label>
                    <input
                    type="text"
                    placeholder="0.7 / 達到預期目標"
                    disabled
                    className="w-full rounded-none border-[1.5px]  border-stroke bg-transparent px-5 py-3 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white  dark:disabled:bg-black"
                    />
                </div>
                  </div>
               
                <div className='mb-3 w-11/12'>
                    <RatingDropdown title='上評'></RatingDropdown>
                </div>
                <Button className="btn ml-46 btn-success text-white w-25 btn-sm" >
                            確認評分
                  </Button>
             </div>
        </div>

               
  </>


export default function Rating() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <>
    <button onClick={onOpen} className="btn inline-block btn-xs btn-ghost text-green-500 rounded-none">
        評分
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
       <Draggable>
        <ModalContent className="bg-slate-50 shadow-2xl border-2  border-stone-400 w-[1200px] h-[660px] z-9999">
          {(onClose) => (
            <>
            <ModalHeader className="flex  gap-1 mb-2 border-b-2 border-slate-400">
            <h1 className="ml-2">評分</h1>
            </ModalHeader>

              <ModalBody className="overflow-y-auto">
         
              <div className="flex w-full flex-col">
              <Tabs 
                placement="top"
                  aria-label="Options" 
                  color="primary" 
                  variant="underlined"
                  classNames={{
                    tabList: "gap-6 w-full relative rounded-none p-0 border-divider",
                    cursor: "w-full bg-[#22d3ee]",
                    tab: "max-w-fit px-0 h-8",
                    tabContent: "group-data-[selected=true]:text-[#06b6d4]"
                  }}
                >
                  <Tab
                    key="1"
                    title={
                      <div className="flex items-center space-x-2">
                        <span>第一季度</span>
                      </div>
                    }
                  >

                    <Tabs aria-label="SmallOptions"
                        color="success" 
                        placement="top"
                        variant="underlined"
                        classNames={{
                          tabList: "gap-6 w-full relative rounded-none p-0 border-divider",
                          cursor: "w-full bg-[#22d3ee]",
                          tab: "max-w-fit px-0 h-5 w-20 ",
                          tabContent: "group-data-[selected=true]:text-[#06b6d4]"
                        }}
                    className="text-sm"
                    >
                      <Tab key="doing" 
                        title={
                          <div className="flex items-center space-x-2">
                            <span>未處理</span>
                            {/* <Chip size="sm" variant="faded">9</Chip> */}
                          </div>
                        }
                        className=""
                      >
                    <div className="border-slate-200 rounded-2xl border-2">
                      <Accordion
                      showDivider={false}
                      className="p-2 flex flex-col gap-1 w-full "
                      variant="shadow"
                      itemClasses={{
                        base: "py-0 w-full",
                        title: "font-normal text-medium",
                        trigger: "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
                        indicator: "text-medium",
                        content: "text-small px-2",
                      }}
                      >
                        <AccordionItem key="1" aria-label="Accordion 1" title="KR1：全年实现销售收入6780万，扣除2022年非常规影响，实现8%增长" className="border-2 text-sm border-slate-300 rounded-2xl  bg-white shadow-14" 
                          startContent={
                            <div className="flex ml-5 mr-5 border-r-2 border-slate-600">

                              <svg width="40px" height="40px" viewBox="-0.48 -0.48 24.96 24.96" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"/>
                              <g id="SVGRepo_iconCarrier">
                              <path fillRule="evenodd" clipRule="evenodd" d="M19.186 2.09c.521.25 1.136.612 1.625 1.101.49.49.852 1.104 1.1 1.625.313.654.11 1.408-.401 1.92l-7.214 7.213c-.31.31-.688.541-1.105.675l-4.222 1.353a.75.75 0 0 1-.943-.944l1.353-4.221a2.75 2.75 0 0 1 .674-1.105l7.214-7.214c.512-.512 1.266-.714 1.92-.402zm.211 2.516a3.608 3.608 0 0 0-.828-.586l-6.994 6.994a1.002 1.002 0 0 0-.178.241L9.9 14.102l2.846-1.496c.09-.047.171-.107.242-.178l6.994-6.994a3.61 3.61 0 0 0-.586-.828zM4.999 5.5A.5.5 0 0 1 5.47 5l5.53.005a1 1 0 0 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.754.977.978.442.236.866.318 1.627.318h12.154c.76 0 1.185-.082 1.627-.318.42-.224.754-.559.978-.978.236-.442.318-.866.318-1.627V13a1 1 0 1 0-2 0v5.077c0 .459-.021.571-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5z" fill="#f60909"/>
                              </g>
                              </svg>
                              <div className=" w-7 h-5"></div>
                            </div>
                  
                            }      
                          subtitle={
                            <div className="flex">
                              <p className="flex items-end">
                              </p>
                            </div>
                          }
                        >
                          <div className="border-t-2 border-slate-300"></div>
                          <div className="ml-13 ">
                          {content}
                           
                          </div>
                        </AccordionItem>

                        <AccordionItem key="2" aria-label="Accordion 2" title="KR3：合理组织生产人员降低用工成本，人力资源成本下降2.4%，年平均人数控制在210人内" className="border-2 text-sm border-slate-300 mt-5 rounded-2xl  bg-white shadow-14" 
                          startContent={
                            <div className="flex ml-5 mr-5 border-r-2 border-slate-600">

                              <svg width="40px" height="40px" viewBox="-0.48 -0.48 24.96 24.96" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"/>
                              <g id="SVGRepo_iconCarrier">
                              <path fillRule="evenodd" clipRule="evenodd" d="M19.186 2.09c.521.25 1.136.612 1.625 1.101.49.49.852 1.104 1.1 1.625.313.654.11 1.408-.401 1.92l-7.214 7.213c-.31.31-.688.541-1.105.675l-4.222 1.353a.75.75 0 0 1-.943-.944l1.353-4.221a2.75 2.75 0 0 1 .674-1.105l7.214-7.214c.512-.512 1.266-.714 1.92-.402zm.211 2.516a3.608 3.608 0 0 0-.828-.586l-6.994 6.994a1.002 1.002 0 0 0-.178.241L9.9 14.102l2.846-1.496c.09-.047.171-.107.242-.178l6.994-6.994a3.61 3.61 0 0 0-.586-.828zM4.999 5.5A.5.5 0 0 1 5.47 5l5.53.005a1 1 0 0 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.754.977.978.442.236.866.318 1.627.318h12.154c.76 0 1.185-.082 1.627-.318.42-.224.754-.559.978-.978.236-.442.318-.866.318-1.627V13a1 1 0 1 0-2 0v5.077c0 .459-.021.571-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5z" fill="#f60909"/>
                              </g>
                              </svg>
                              <div className=" w-7 h-5"></div>
                            </div>
                  
                            }      
                          subtitle={
                            <div className="flex">
                              <p className="flex items-end">
                              </p>
                            </div>
                          }
                        >
                          <div className="border-t-2 border-slate-300"></div>
                          <div className="ml-13 ">
                          {content}
                          
                          </div>
                        </AccordionItem>
                      </Accordion>
                      </div>
                      </Tab>
                      <Tab key="completed" title="已處理">
                        <Card className='w-full h-60 border-2 border-slate-200 rounded-2xl '>
                          <CardBody className='bg-white border-2 border-stroke overflow-y-auto'>
                            <Table aria-label="Example static collection table" title="評分記錄">
                              <TableHeader>
                                  <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200'>序號</TableColumn>
                                  <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200' >評分對象</TableColumn>
                                  <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200' >自評</TableColumn>
                                  <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200' >上評</TableColumn>

                                  <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200'>時間</TableColumn>
                              </TableHeader>
                              <TableBody>
                                  <TableRow key="1">
                                  <TableCell className='text-sm border-b-2 border-slate-200'>1</TableCell>
                                  <TableCell className='text-sm border-b-2 border-slate-200'>KR1</TableCell>
                                  <TableCell className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200' >0.3</TableCell>
                                  <TableCell className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200' >0.7</TableCell>
                                  <TableCell className='text-sm border-b-2 border-slate-200'>2024年7月9日</TableCell>
                                  </TableRow>
                              </TableBody>
                              </Table>
                          </CardBody>
                        </Card> 
                      </Tab>
                      </Tabs>
                  </Tab>

                  {/* 第二季度*/}
                  <Tab
                    key="2"
                    title={
                      <div className="flex items-center space-x-2">
                        <span>第二季度</span>
                      </div>
                    }
                  >

                    <Tabs aria-label="SmallOptions"
                        color="success" 
                        placement="top"
                        variant="underlined"
                        classNames={{
                          tabList: "gap-6 w-full relative rounded-none p-0 border-divider",
                          cursor: "w-full bg-[#22d3ee]",
                          tab: "max-w-fit px-0 h-5 w-20 ",
                          tabContent: "group-data-[selected=true]:text-[#06b6d4]"
                        }}
                        className="text-sm"
                    >
                      <Tab key="doing" 
                        title={
                          <div className="flex items-center space-x-2">
                            <span>未處理</span>
                            {/* <Chip size="sm" variant="faded">9</Chip> */}
                          </div>
                        }
                        className=""
                      >
                     <div className="border-slate-200 rounded-2xl border-2">
                      <Accordion
                      showDivider={false}
                      className="p-2 flex flex-col gap-1 w-full "
                      variant="shadow"
                      itemClasses={{
                        base: "py-0 w-full",
                        title: "font-normal text-medium",
                        trigger: "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
                        indicator: "text-medium",
                        content: "text-small px-2",
                      }}
                      >
                        <AccordionItem key="1" aria-label="Accordion 1" title="KR1：全年实现销售收入6780万，扣除2022年非常规影响，实现8%增长" className="border-2 text-sm border-slate-300 rounded-2xl  bg-white shadow-14" 
                          startContent={
                            <div className="flex ml-5 mr-5 border-r-2 border-slate-600">

                              <svg width="40px" height="40px" viewBox="-0.48 -0.48 24.96 24.96" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"/>
                              <g id="SVGRepo_iconCarrier">
                              <path fillRule="evenodd" clipRule="evenodd" d="M19.186 2.09c.521.25 1.136.612 1.625 1.101.49.49.852 1.104 1.1 1.625.313.654.11 1.408-.401 1.92l-7.214 7.213c-.31.31-.688.541-1.105.675l-4.222 1.353a.75.75 0 0 1-.943-.944l1.353-4.221a2.75 2.75 0 0 1 .674-1.105l7.214-7.214c.512-.512 1.266-.714 1.92-.402zm.211 2.516a3.608 3.608 0 0 0-.828-.586l-6.994 6.994a1.002 1.002 0 0 0-.178.241L9.9 14.102l2.846-1.496c.09-.047.171-.107.242-.178l6.994-6.994a3.61 3.61 0 0 0-.586-.828zM4.999 5.5A.5.5 0 0 1 5.47 5l5.53.005a1 1 0 0 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.754.977.978.442.236.866.318 1.627.318h12.154c.76 0 1.185-.082 1.627-.318.42-.224.754-.559.978-.978.236-.442.318-.866.318-1.627V13a1 1 0 1 0-2 0v5.077c0 .459-.021.571-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5z" fill="#f60909"/>
                              </g>
                              </svg>
                              <div className=" w-7 h-5"></div>
                            </div>
                  
                            }      
                          subtitle={
                            <div className="flex">
                              <p className="flex items-end">
                              </p>
                            </div>
                          }
                        >
                          <div className="border-t-2 border-slate-300"></div>
                          <div className="ml-13 ">
                          {content}
                  
                          </div>
                        </AccordionItem>

                        <AccordionItem key="2" aria-label="Accordion 2" title="KR3：合理组织生产人员降低用工成本，人力资源成本下降2.4%，年平均人数控制在210人内" className="border-2 text-sm border-slate-300 mt-5 rounded-2xl  bg-white shadow-14" 
                          startContent={
                            <div className="flex ml-5 mr-5 border-r-2 border-slate-600">

                              <svg width="40px" height="40px" viewBox="-0.48 -0.48 24.96 24.96" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"/>
                              <g id="SVGRepo_iconCarrier">
                              <path fillRule="evenodd" clipRule="evenodd" d="M19.186 2.09c.521.25 1.136.612 1.625 1.101.49.49.852 1.104 1.1 1.625.313.654.11 1.408-.401 1.92l-7.214 7.213c-.31.31-.688.541-1.105.675l-4.222 1.353a.75.75 0 0 1-.943-.944l1.353-4.221a2.75 2.75 0 0 1 .674-1.105l7.214-7.214c.512-.512 1.266-.714 1.92-.402zm.211 2.516a3.608 3.608 0 0 0-.828-.586l-6.994 6.994a1.002 1.002 0 0 0-.178.241L9.9 14.102l2.846-1.496c.09-.047.171-.107.242-.178l6.994-6.994a3.61 3.61 0 0 0-.586-.828zM4.999 5.5A.5.5 0 0 1 5.47 5l5.53.005a1 1 0 0 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.754.977.978.442.236.866.318 1.627.318h12.154c.76 0 1.185-.082 1.627-.318.42-.224.754-.559.978-.978.236-.442.318-.866.318-1.627V13a1 1 0 1 0-2 0v5.077c0 .459-.021.571-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5z" fill="#f60909"/>
                              </g>
                              </svg>
                              <div className=" w-7 h-5"></div>
                            </div>
                  
                            }      
                          subtitle={
                            <div className="flex">
                              <p className="flex items-end">
                              </p>
                            </div>
                          }
                        >
                          <div className="border-t-2 border-slate-300"></div>
                          <div className="ml-13 ">
                          {content}
                            
                          </div>
                        </AccordionItem>
                      </Accordion>
                      </div>
                      </Tab>
                      <Tab key="completed" title="已處理">
                        <Card className='w-full h-60 border-2 border-slate-200 rounded-2xl '>
                          <CardBody className='bg-white border-2 border-stroke overflow-y-auto'>
                            <Table aria-label="Example static collection table" title="評分記錄">
                              <TableHeader>
                                  <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200'>序號</TableColumn>
                                  <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200' >評分對象</TableColumn>
                                  <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200' >自評</TableColumn>
                                  <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200' >上評</TableColumn>

                                  <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200'>時間</TableColumn>
                              </TableHeader>
                              <TableBody>
                                  <TableRow key="1">
                                  <TableCell className='text-sm border-b-2 border-slate-200'>1</TableCell>
                                  <TableCell className='text-sm border-b-2 border-slate-200'>KR1</TableCell>
                                  <TableCell className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200' >0.3</TableCell>
                                  <TableCell className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200' >0.7</TableCell>
                                  <TableCell className='text-sm border-b-2 border-slate-200'>2024年7月9日</TableCell>
                                  </TableRow>
                              </TableBody>
                              </Table>
                          </CardBody>
                        </Card> 
                      </Tab>
                      </Tabs>
                  </Tab>
                  

                  {/* 第三季度*/}
                  <Tab
                    key="3"
                    title={
                      <div className="flex items-center space-x-2">
                        <span>第三季度</span>
                      </div>
                    }
                  >

                    <Tabs aria-label="SmallOptions"
                        color="success" 
                        placement="top"
                        variant="underlined"
                        classNames={{
                          tabList: "gap-6 w-full relative rounded-none p-0 border-divider",
                          cursor: "w-full bg-[#22d3ee]",
                          tab: "max-w-fit px-0 h-5 w-20 ",
                          tabContent: "group-data-[selected=true]:text-[#06b6d4]"
                        }}
                        className="text-sm"
                    >
                      <Tab key="doing" 
                        title={
                          <div className="flex items-center space-x-2">
                            <span>未處理</span>
                            {/* <Chip size="sm" variant="faded">9</Chip> */}
                          </div>
                        }
                        className=""
                      >
                    
                    <div className="border-slate-200 rounded-2xl border-2">
                      <Accordion
                      showDivider={false}
                      className="p-2 flex flex-col gap-1 w-full "
                      variant="shadow"
                      itemClasses={{
                        base: "py-0 w-full",
                        title: "font-normal text-medium",
                        trigger: "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
                        indicator: "text-medium",
                        content: "text-small px-2",
                      }}
                      >
                        <AccordionItem key="1" aria-label="Accordion 1" title="KR1：全年实现销售收入6780万，扣除2022年非常规影响，实现8%增长" className="border-2 text-sm border-slate-300 rounded-2xl  bg-white shadow-14" 
                          startContent={
                            <div className="flex ml-5 mr-5 border-r-2 border-slate-600">

                              <svg width="40px" height="40px" viewBox="-0.48 -0.48 24.96 24.96" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"/>
                              <g id="SVGRepo_iconCarrier">
                              <path fillRule="evenodd" clipRule="evenodd" d="M19.186 2.09c.521.25 1.136.612 1.625 1.101.49.49.852 1.104 1.1 1.625.313.654.11 1.408-.401 1.92l-7.214 7.213c-.31.31-.688.541-1.105.675l-4.222 1.353a.75.75 0 0 1-.943-.944l1.353-4.221a2.75 2.75 0 0 1 .674-1.105l7.214-7.214c.512-.512 1.266-.714 1.92-.402zm.211 2.516a3.608 3.608 0 0 0-.828-.586l-6.994 6.994a1.002 1.002 0 0 0-.178.241L9.9 14.102l2.846-1.496c.09-.047.171-.107.242-.178l6.994-6.994a3.61 3.61 0 0 0-.586-.828zM4.999 5.5A.5.5 0 0 1 5.47 5l5.53.005a1 1 0 0 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.754.977.978.442.236.866.318 1.627.318h12.154c.76 0 1.185-.082 1.627-.318.42-.224.754-.559.978-.978.236-.442.318-.866.318-1.627V13a1 1 0 1 0-2 0v5.077c0 .459-.021.571-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5z" fill="#f60909"/>
                              </g>
                              </svg>
                              <div className=" w-7 h-5"></div>
                            </div>
                  
                            }      
                          subtitle={
                            <div className="flex">
                              <p className="flex items-end">
                              </p>
                            </div>
                          }
                        >
                          <div className="border-t-2 border-slate-300"></div>
                          <div className="ml-13 ">
                          {content}
                            
                          </div>
                        </AccordionItem>

                        <AccordionItem key="2" aria-label="Accordion 2" title="KR3：合理组织生产人员降低用工成本，人力资源成本下降2.4%，年平均人数控制在210人内" className="border-2 text-sm border-slate-300 mt-5 rounded-2xl  bg-white shadow-14" 
                          startContent={
                            <div className="flex ml-5 mr-5 border-r-2 border-slate-600">

                              <svg width="40px" height="40px" viewBox="-0.48 -0.48 24.96 24.96" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"/>
                              <g id="SVGRepo_iconCarrier">
                              <path fillRule="evenodd" clipRule="evenodd" d="M19.186 2.09c.521.25 1.136.612 1.625 1.101.49.49.852 1.104 1.1 1.625.313.654.11 1.408-.401 1.92l-7.214 7.213c-.31.31-.688.541-1.105.675l-4.222 1.353a.75.75 0 0 1-.943-.944l1.353-4.221a2.75 2.75 0 0 1 .674-1.105l7.214-7.214c.512-.512 1.266-.714 1.92-.402zm.211 2.516a3.608 3.608 0 0 0-.828-.586l-6.994 6.994a1.002 1.002 0 0 0-.178.241L9.9 14.102l2.846-1.496c.09-.047.171-.107.242-.178l6.994-6.994a3.61 3.61 0 0 0-.586-.828zM4.999 5.5A.5.5 0 0 1 5.47 5l5.53.005a1 1 0 0 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.754.977.978.442.236.866.318 1.627.318h12.154c.76 0 1.185-.082 1.627-.318.42-.224.754-.559.978-.978.236-.442.318-.866.318-1.627V13a1 1 0 1 0-2 0v5.077c0 .459-.021.571-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5z" fill="#f60909"/>
                              </g>
                              </svg>
                              <div className=" w-7 h-5"></div>
                            </div>
                  
                            }      
                          subtitle={
                            <div className="flex">
                              <p className="flex items-end">
                              </p>
                            </div>
                          }
                        >
                          <div className="border-t-2 border-slate-300"></div>
                          <div className="ml-13 ">
                          {content}
                            
                          </div>
                        </AccordionItem>
                      </Accordion>
                      </div>
                      </Tab>
                      <Tab key="completed" title="已處理">
                        <Card className='w-full h-60 border-2 border-slate-200 rounded-2xl '>
                          <CardBody className='bg-white border-2 border-stroke overflow-y-auto'>
                            <Table aria-label="Example static collection table" title="評分記錄">
                              <TableHeader>
                                  <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200'>序號</TableColumn>
                                  <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200' >評分對象</TableColumn>
                                  <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200' >自評</TableColumn>
                                  <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200' >上評</TableColumn>

                                  <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200'>時間</TableColumn>
                              </TableHeader>
                              <TableBody>
                                  <TableRow key="1">
                                  <TableCell className='text-sm border-b-2 border-slate-200'>1</TableCell>
                                  <TableCell className='text-sm border-b-2 border-slate-200'>KR1</TableCell>
                                  <TableCell className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200' >0.3</TableCell>
                                  <TableCell className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200' >0.7</TableCell>
                                  <TableCell className='text-sm border-b-2 border-slate-200'>2024年7月9日</TableCell>
                                  </TableRow>
                              </TableBody>
                              </Table>
                          </CardBody>
                        </Card> 
                      </Tab>

                      
                      </Tabs>
                  </Tab>

                  {/* 第四季度*/}
                  <Tab
                    key="4"
                    title={
                      <div className="flex items-center space-x-2">
                        <span>第四季度</span>
                      </div>
                    }
                  >

                    <Tabs aria-label="SmallOptions"
                        color="success" 
                        placement="top"
                        variant="underlined"
                        classNames={{
                          tabList: "gap-6 w-full relative rounded-none p-0 border-divider",
                          cursor: "w-full bg-[#22d3ee]",
                          tab: "max-w-fit px-0 h-5 w-20 ",
                          tabContent: "group-data-[selected=true]:text-[#06b6d4]"
                        }}
                        className="text-sm"
                    >
                      <Tab key="doing" 
                        title={
                          <div className="flex items-center space-x-2">
                            <span>未處理</span>
                            {/* <Chip size="sm" variant="faded">9</Chip> */}
                          </div>
                        }
                        className=""
                      >
                    <div className="border-slate-200 rounded-2xl border-2">
                      <Accordion
                      showDivider={false}
                      className="p-2 flex flex-col gap-1 w-full "
                      variant="shadow"
                      itemClasses={{
                        base: "py-0 w-full",
                        title: "font-normal text-medium",
                        trigger: "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
                        indicator: "text-medium",
                        content: "text-small px-2",
                      }}
                      >
                        <AccordionItem key="1" aria-label="Accordion 1" title="KR1：全年实现销售收入6780万，扣除2022年非常规影响，实现8%增长" className="border-2 text-sm border-slate-300 rounded-2xl  bg-white shadow-14" 
                          startContent={
                            <div className="flex ml-5 mr-5 border-r-2 border-slate-600">

                              <svg width="40px" height="40px" viewBox="-0.48 -0.48 24.96 24.96" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"/>
                              <g id="SVGRepo_iconCarrier">
                              <path fillRule="evenodd" clipRule="evenodd" d="M19.186 2.09c.521.25 1.136.612 1.625 1.101.49.49.852 1.104 1.1 1.625.313.654.11 1.408-.401 1.92l-7.214 7.213c-.31.31-.688.541-1.105.675l-4.222 1.353a.75.75 0 0 1-.943-.944l1.353-4.221a2.75 2.75 0 0 1 .674-1.105l7.214-7.214c.512-.512 1.266-.714 1.92-.402zm.211 2.516a3.608 3.608 0 0 0-.828-.586l-6.994 6.994a1.002 1.002 0 0 0-.178.241L9.9 14.102l2.846-1.496c.09-.047.171-.107.242-.178l6.994-6.994a3.61 3.61 0 0 0-.586-.828zM4.999 5.5A.5.5 0 0 1 5.47 5l5.53.005a1 1 0 0 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.754.977.978.442.236.866.318 1.627.318h12.154c.76 0 1.185-.082 1.627-.318.42-.224.754-.559.978-.978.236-.442.318-.866.318-1.627V13a1 1 0 1 0-2 0v5.077c0 .459-.021.571-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5z" fill="#f60909"/>
                              </g>
                              </svg>
                              <div className=" w-7 h-5"></div>
                            </div>
                  
                            }      
                          subtitle={
                            <div className="flex">
                              <p className="flex items-end">
                              </p>
                            </div>
                          }
                        >
                          <div className="border-t-2 border-slate-300"></div>
                          <div className="ml-13 ">
                          {content}
                            
                          </div>
                        </AccordionItem>

                        <AccordionItem key="2" aria-label="Accordion 2" title="KR3：合理组织生产人员降低用工成本，人力资源成本下降2.4%，年平均人数控制在210人内" className="border-2 text-sm border-slate-300 mt-5 rounded-2xl  bg-white shadow-14" 
                          startContent={
                            <div className="flex ml-5 mr-5 border-r-2 border-slate-600">

                              <svg width="40px" height="40px" viewBox="-0.48 -0.48 24.96 24.96" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"/>
                              <g id="SVGRepo_iconCarrier">
                              <path fillRule="evenodd" clipRule="evenodd" d="M19.186 2.09c.521.25 1.136.612 1.625 1.101.49.49.852 1.104 1.1 1.625.313.654.11 1.408-.401 1.92l-7.214 7.213c-.31.31-.688.541-1.105.675l-4.222 1.353a.75.75 0 0 1-.943-.944l1.353-4.221a2.75 2.75 0 0 1 .674-1.105l7.214-7.214c.512-.512 1.266-.714 1.92-.402zm.211 2.516a3.608 3.608 0 0 0-.828-.586l-6.994 6.994a1.002 1.002 0 0 0-.178.241L9.9 14.102l2.846-1.496c.09-.047.171-.107.242-.178l6.994-6.994a3.61 3.61 0 0 0-.586-.828zM4.999 5.5A.5.5 0 0 1 5.47 5l5.53.005a1 1 0 0 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.754.977.978.442.236.866.318 1.627.318h12.154c.76 0 1.185-.082 1.627-.318.42-.224.754-.559.978-.978.236-.442.318-.866.318-1.627V13a1 1 0 1 0-2 0v5.077c0 .459-.021.571-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5z" fill="#f60909"/>
                              </g>
                              </svg>
                              <div className=" w-7 h-5"></div>
                            </div>
                  
                            }      
                          subtitle={
                            <div className="flex">
                              <p className="flex items-end">
                              </p>
                            </div>
                          }
                        >
                          <div className="border-t-2 border-slate-300"></div>
                          <div className="ml-13 ">
                          {content}
                            
                          </div>
                        </AccordionItem>
                      </Accordion>
                      </div>
                      </Tab>
                      <Tab key="completed" title="已處理">
                        <Card className='w-full h-60 border-2 border-slate-200 rounded-2xl '>
                          <CardBody className='bg-white border-2 border-stroke overflow-y-auto'>
                            <Table aria-label="Example static collection table" title="評分記錄">
                              <TableHeader>
                                  <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200'>序號</TableColumn>
                                  <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200' >評分對象</TableColumn>
                                  <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200' >自評</TableColumn>
                                  <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200' >上評</TableColumn>

                                  <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200'>時間</TableColumn>
                              </TableHeader>
                              <TableBody>
                                  <TableRow key="1">
                                  <TableCell className='text-sm border-b-2 border-slate-200'>1</TableCell>
                                  <TableCell className='text-sm border-b-2 border-slate-200'>KR1</TableCell>
                                  <TableCell className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200' >0.3</TableCell>
                                  <TableCell className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200' >0.7</TableCell>
                                  <TableCell className='text-sm border-b-2 border-slate-200'>2024年7月9日</TableCell>
                                  </TableRow>
                              </TableBody>
                              </Table>
                          </CardBody>
                        </Card> 
                      </Tab>

                      
                      </Tabs>
                  </Tab>

                </Tabs>
              </div>  
              </ModalBody>
            </>
          )}
        </ModalContent>
        </Draggable>
      </Modal>
    </>
  );
}
