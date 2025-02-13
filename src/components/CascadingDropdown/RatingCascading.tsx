import React, { useState } from 'react';

const companies = [
    { id: 1, name: '全公司' },
  { id: 2, name: '公司A' },
  { id: 3, name: '公司B' },
];

const departments = [

    { companyId: 1 , name: '全部人員' },
    { companyId: 1, name: '人員1' },
    { companyId: 1, name: '人員2' },
    { companyId: 2, name: '全部人員' },
  { companyId: 2, name: '人員A1' },
  { companyId: 2, name: '人員A2' },
  { companyId: 3, name: '全部人員' },
  { companyId: 3, name: '人員B1' },
  { companyId: 3, name: '人員B1' },

];


const RatingCascading= () => {
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const companyId = parseInt(e.target.value);
    setSelectedCompany(companyId);
    setSelectedDepartment(null);
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value);
  };

  const filteredDepartments = selectedCompany
    ? departments.filter((department) => department.companyId === selectedCompany)
    : [];

  return (
    <div className="flex items-center">
      <select
        value={selectedCompany || ''}
        onChange={handleCompanyChange}
        className="p-1.5 border-2 border-slate-200 mr-3"
      >
        <option disabled value="">選擇公司</option>
        {companies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.name}
          </option>
        ))}
      </select>
      
        {selectedCompany && selectedCompany !== undefined && 
      <select
        value={selectedDepartment || ''}
        onChange={handleDepartmentChange}
        className="p-1.5 border-2 border-slate-200 mr-3"
      >
        <option value="">選擇人員</option>
        {filteredDepartments.map((department) => (
          <option key={department.name} value={department.name}>
            {department.name}
          </option>
        ))}
      </select>}

     
    </div>
  );
};

export default RatingCascading;