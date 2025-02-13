import { Card, CardBody } from '@nextui-org/card';
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { Tab, Tabs } from '@nextui-org/tabs';
import React, { useState } from 'react'
import Draggable from 'react-draggable';
interface Props {
    isOpen: boolean;
    onOpenChange: () => void;
    title:string;
  }
const PanelOKRCardBtn2 = (props:Props) => {
   
  return (
    <div>
        
        <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}
      // className="bg-white w-230 h-150  shadow-2xl rounded-md"
      className="bg-slate-100 w-180 h-125  shadow-2xl rounded-md  border-2 border-slate-400"
      >
           <Draggable>
        <ModalContent className="">
        {(onClose) => (
          <>
     
          <ModalHeader className="flex  gap-1 mb-1 border-b-2 border-slate-400">
            <h1 className="ml-2">{props.title}</h1>
            <div className="block">
   
                  {/* <Button className="btn btn-outline h-4  ml-3 absolute right-10 text-green-500 w-20  btn-xs" onPress={onClose}>
                    關閉
                  </Button> */}
            </div>
            </ModalHeader>
            <ModalBody className="flex">
                    
            <Tabs aria-label="Options" 
               color="primary" 
               variant="underlined"
               classNames={{
                 tabList: "gap-6 w-full relative rounded-none p-0  border-divider",
                 cursor: "w-full bg-[#22d3ee]",
                 tab: "max-w-fit px-0 h-12 ml-6",
                 tabContent: "group-data-[selected=true]:text-[#06b6d4]"
               }}>
                <Tab key="doing" title="未完成">
                    
                    <Card className=''>
                    <CardBody className='bg-white border-2 border-stroke'>

                            <Table aria-label="Example static collection table">
                                <TableHeader>
                                    <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200'>序號</TableColumn>
                                    <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200'>部門</TableColumn>
                                    <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200' >KR名稱</TableColumn>
                                    <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200'>進度</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    <TableRow key="1">
                                    <TableCell className='text-sm border-b-2 border-slate-200'>1</TableCell>
                                    <TableCell className='text-sm border-b-2 border-slate-200'>中華商務聯合印刷</TableCell>
                                    <TableCell className='text-sm border-b-2 border-slate-200'>KR1</TableCell>
                                    <TableCell className='text-sm border-b-2 border-slate-200'>0.3</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        
                    </CardBody>
                    </Card>  
                </Tab>

                <Tab key="complete" title="已完成">
                    
                    <Card className=''>
                    <CardBody className='bg-white border-2 border-stroke'>

                            <Table aria-label="Example static collection table">
                                <TableHeader>
                                    <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200'>序號</TableColumn>
                                    <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200'>部門</TableColumn>
                                    <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200' >KR名稱</TableColumn>
                                    <TableColumn className='text-sm bg-slate-50 shadow-14 border-b-2 border-slate-200'>進度</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    <TableRow key="1">
                                    <TableCell className='text-sm border-b-2 border-slate-200'>1</TableCell>
                                    <TableCell className='text-sm border-b-2 border-slate-200'>中華商務聯合印刷</TableCell>
                                    <TableCell className='text-sm border-b-2 border-slate-200'>KR1</TableCell>
                                    <TableCell className='text-sm border-b-2 border-slate-200'>0.7</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                           
                    </CardBody>
                    </Card>  
                </Tab>
            </Tabs>
              </ModalBody>
           
              </>)}
        </ModalContent>
        </Draggable>
      </Modal>
    </div>
  )
}

export default PanelOKRCardBtn2

