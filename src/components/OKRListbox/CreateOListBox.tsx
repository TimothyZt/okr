
import React, { use, useEffect, useState } from "react";
import {Listbox, ListboxItem, Chip, ScrollShadow, Avatar, Selection, user} from "@nextui-org/react";
import {ListboxWrapper} from "./ListboxWrapper";
// import {users} from "./data";

interface OrgChart{
  id:string;
  emplNum:string;
  companyName:string;
  sex:string;
  emplName:string;
  departmentName:string;
  emailAddress:string;
  position:string;
}

interface Props{
  users:OrgChart[];
  values:Selection;
  setValues: (keys: Selection) => void;
}

export default function CreateOListBox({users,values,setValues}:Props) {
  const arrayValues = Array.from(values);
  const topContent = React.useMemo(() => {
    if (!arrayValues.length) {
      return null;
    }
    return (
      <ScrollShadow
        hideScrollBar
        className="w-full flex py-0.5 px-2 gap-1 bg-slate-100"
        orientation="horizontal"
      >
        {arrayValues.map((value) => (
          <Chip key={value}>{users.find((user) => `${user.id}` === `${value}`)?.emplName} {users.find((user) => `${user.id}` === `${value}`)?.position} </Chip>
        ))}
      </ScrollShadow>
    );
  }, [arrayValues, users]);
  return (
    <ListboxWrapper>
      <Listbox
        bottomContent={topContent}
        classNames={{
          base: "w-full",
          list: "max-h-[300px] overflow-y-scroll",
        }}
        defaultSelectedKeys={["1"]}
        items={users}
        label="Assigned to"
        selectionMode="single"
        onSelectionChange={setValues}
        variant="flat"
      >
        {(item) => (
          <ListboxItem key={item.id} textValue={item.emplName} className=" border-b-2 border-stroke" >
            <div className="flex gap-2 items-center ">
              <div className="flex flex-col">
                <div className="flex">
                <span className="text-small">{item.emplNum}</span>
                <span className="text-small ml-3">{item.emplName}</span>
                </div>
                <div className="flex">
                <span className="text-tiny text-default-400">{item.companyName}</span>     
                <span className="text-tiny text-default-400 ml-3">{item.departmentName}</span>
               </div>
                
              </div>
            </div>
          </ListboxItem>
        )}
      </Listbox>
    </ListboxWrapper>
  );
  
}
