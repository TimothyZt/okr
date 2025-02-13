"use client";
import React, { useState } from "react";
import { FilterCompaniesDtos } from "../../../features/baseInfo/dtos/baseinfo-dtos";

// const companies = [
//     { id: 1, name: '全公司' },
//   { id: 2, name: '公司A' },
//   { id: 3, name: '公司B' },
// ];

// const departments = [
//     { companyId: 2, name: '全體部門' },
//   { companyId: 2, name: '部門A1' },
//   { companyId: 2, name: '部門A2' },
//   { companyId: 3, name: '全體部門' },
//   { companyId: 3, name: '部門B1' },
//   { companyId: 3, name: '部門B2' },

// ];

interface Props {
  filterCompanyDtos: FilterCompaniesDtos;
  selectedCompany: string;
  setSelectedCompany: (id:string) => {};
  selectedDepartment: string;
  setSelectedDepartment: (id:string) => {};
}

const CascadingDropdown = ({
  filterCompanyDtos,
  selectedCompany,
  setSelectedCompany,
  selectedDepartment,
  setSelectedDepartment,
}: Props) => {
  var com =
    filterCompanyDtos.filterCompanies! &&
    filterCompanyDtos.filterCompanies.flatMap((x) => [
      { id: x.sortId, name: x.companyName },
    ]);
  var de =
    filterCompanyDtos.filterDepartments! &&
    filterCompanyDtos.filterDepartments.flatMap((x) => [
      { companyId: x.sortId, name: x.departmentName },
    ]);
  const [companies, setCompanies] =
    useState<{ id: number; name: string }[]>(com);
  const [departments, setDepartments] =
    useState<{ companyId: number; name: string }[]>(de);
  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const companyId = parseInt(e.target.value);
    const name = filterCompanyDtos.filterCompanies.find((x) => x.sortId == companyId)!;
    setSelectedCompany(name.companyName);
    setSelectedDepartment("");
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value);
  };

  // const filteredDepartments = selectedCompany
  //   ? departments.filter(
  //       (department) => department.companyId === selectedCompany,
  //     )
  //   : [];

  return (
    <div className="flex items-center">
      <select
        value={selectedCompany || ""}
        onChange={handleCompanyChange}
        className="mr-3 border-2 border-slate-200 p-1.5"
      >
        <option disabled value="">
          選擇公司
        </option>
        {companies! &&
          companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
      </select>

      {/* {selectedCompany && selectedCompany !== undefined && selectedCompany !== 1 &&
      <select
        value={selectedDepartment || ''}
        onChange={handleDepartmentChange}
        className="p-1.5 border-2 border-slate-200 mr-3"
      >
        <option value="">選擇部門</option>
        {filteredDepartments.map((department) => (
          <option key={department.name} value={department.name}>
            {department.name}
          </option>
        ))}
      </select>} */}
    </div>
  );
};

export default CascadingDropdown;
