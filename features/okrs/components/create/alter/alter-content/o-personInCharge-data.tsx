import React, { Key, useState } from "react";
import {
  Listbox,
  ListboxItem,
  Chip,
  ScrollShadow,
  Avatar,
  Selection,
  user,
} from "@nextui-org/react";
import { ListboxWrapper } from "../../../../../baseInfo/components/ListBoxWrapper";
// import {users} from "./data";

interface OrgChart {
  id: string;
  emplNum: string;
  emplId:string;
  companyName: string;
  sex: string;
  emplName: string;
  departmentName: string;
  emailAddress: string;
  position: string;
}

interface Props {
  users: OrgChart[];
  values: Selection;
  setValues: (keys: Selection) => void;
}

export default function OPersonInChargeListBox({
  users,
  values,
  setValues,
}: Props) {
  const [valus, SetValus] = useState<Selection>();
  const [arrayValues, SetArrayValues] = useState<Key[]>(Array.from(values));
  const handleSelectClick = (value: Selection) => {
    setValues(value);
    const keys = Array.from(value);
    SetArrayValues(keys);
  };
  const topContent = React.useMemo(() => {
    if (!arrayValues!.length) {
      return null;
    }
    return (
      <ScrollShadow
        hideScrollBar
        className="flex w-full gap-1 bg-slate-100 px-2 py-0.5"
        orientation="horizontal"
      >
        {arrayValues.map((value) => (
          <Chip key={value}>
            {users.find((user) => `${user.id}` === `${value}`)?.emplName}{" "}
            {users.find((user) => `${user.id}` === `${value}`)?.position}{" "}
          </Chip>
        ))}
      </ScrollShadow>
    );
  }, [arrayValues.length]);
  return (
    <ListboxWrapper>
      <Listbox
        bottomContent={topContent}
        classNames={{
          base: "w-full",
          list: "max-h-[300px] overflow-y-scroll",
        }}
        // defaultSelectedKeys={["1"]}
        items={users}
        label="Assigned to"
        selectionMode="single"
        onSelectionChange={handleSelectClick}
        variant="flat"
        className="bg-slate-50"
      >
        {(item) => (
          <ListboxItem
            key={item.id}
            textValue={item.emplName}
            className=" border-b-2 border-stroke"
          >
            <div className="flex items-center gap-2 ">
              <div className="flex flex-col">
                <div className="flex">
                  <span className="text-small">{item.emplNum}</span>
                  <span className="text-small ml-3">{item.emplName}</span>
                </div>
                <div className="flex">
                  <span className="text-tiny text-default-400">
                    {item.companyName}
                  </span>
                  <span className="text-tiny text-default-400 ml-3">
                    {item.departmentName}
                  </span>
                  {arrayValues.find(x=>x === item.id) && (
                    <label className="text-black">✔</label>
                  )}
                </div>
              </div>
            </div>
          </ListboxItem>
        )}
      </Listbox>
    </ListboxWrapper>
  );
}
