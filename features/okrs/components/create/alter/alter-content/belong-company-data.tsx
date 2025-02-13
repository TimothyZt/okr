import React, { useState } from "react";
import { TreeNode } from "../../../../../baseInfo/dtos/baseinfo-dtos";
import { toast, Bounce } from "react-toastify";

interface Props {
  node: TreeNode;
  isSelectCompany: string[];
  setIsSelectCompany: (dept: string[]) => void;
}

export default function BelongToCompanyData({ isSelectCompany,node, setIsSelectCompany}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChecked, setIsChecked] = useState(isSelectCompany.includes(node.selfCode));
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(isSelectCompany.length >= 1){
      if(isSelectCompany.includes(node.department.id))
        {
          setIsSelectCompany(isSelectCompany.filter((code) => code !== node.department.id));
          setIsChecked(false);
        }else{
          toast.error("最多選擇一個歸屬公司", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      return ;
    }
    const newValue = event.target.checked;
    setIsChecked(newValue);
    if (newValue) {
        setIsSelectCompany([...isSelectCompany, node.department.id]);
    } else {
        setIsSelectCompany(isSelectCompany.filter((code) => code !== node.department.id));
    }
};
  return (
    <div style={{ marginLeft: "20px" }}>
      <div className="flex">
        <span onClick={handleToggle} style={{ cursor: "pointer" }}>
          {node.department.name}
          {node.children && node.children.length > 0 && (
            <span style={{ marginLeft: "5px" }}>{isExpanded ? "▲" : "▼"}</span>
          )}
        </span>
        {node.children && node.selfCode.length === 6 &&
        <input type="checkbox" className="ml-2" checked={isChecked} onChange={handleCheckboxChange} />
        }
        </div>
      {isExpanded && node.children && node.children.length > 0 && (
        <ul>
          {node.children.map((child, index) => (
            <li key={index}>
              <BelongToCompanyData
                node={child}
                isSelectCompany={isSelectCompany} setIsSelectCompany={setIsSelectCompany}              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
