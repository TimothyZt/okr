import React, { useState } from "react";
import { TreeNode } from "../../dtos/baseinfo-dtos";
import { toast, Bounce } from "react-toastify";

interface Props {
  node: TreeNode;
  isSelectDept: string[];
  setIsSelectDept: (dept: string[]) => void;
}

export default function TreeNodeComponent({ isSelectDept,node, setIsSelectDept }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChecked, setIsChecked] = useState(isSelectDept.includes(node.selfCode));
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(isSelectDept.length >= 2){
      if(isSelectDept.includes(node.department.id))
        {
          setIsSelectDept(isSelectDept.filter((code) => code !== node.department.id));
          setIsChecked(false);
        }else{
          toast.error("最多選擇兩個部門", {
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
        setIsSelectDept([...isSelectDept, node.department.id]);
    } else {
        setIsSelectDept(isSelectDept.filter((code) => code !== node.department.id));
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
        {node.selfCode.length >= 8 &&
        <input type="checkbox" className="ml-2" checked={isChecked} onChange={handleCheckboxChange} />
        }
        </div>
      {isExpanded && node.children && node.children.length > 0 && (
        <ul>
          {node.children.map((child, index) => (
            <li key={index}>
              <TreeNodeComponent
                node={child}
                isSelectDept={isSelectDept} setIsSelectDept={setIsSelectDept }              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
