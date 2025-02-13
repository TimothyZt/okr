import React, { useState } from "react";
import { Department } from "../../../../baseInfo/dtos/baseinfo-dtos";
import DepartInCharge from "../../../../baseInfo/components/department/departInCharge";

interface Props {
  btnCss: string;
  deptInCharge: Department[];
  setDeptInCharge: (dept: Department[]) => void;
}
export default function DeptInCharge({
  setDeptInCharge,
  btnCss,
  deptInCharge,
}: Props) {
  return (
    <>
      <DepartInCharge
        btnCss={btnCss}
        deptInCharge={deptInCharge}
        setDeptInCharge={setDeptInCharge} btnDesc={"指派"}      
      ></DepartInCharge>
    </>
  );
}
