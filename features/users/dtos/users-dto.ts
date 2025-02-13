import { DepartmentDto } from "../../baseInfo/dtos/baseinfo-dtos";

export interface UserRequest{
    email:string;
    password: string;
    twoFactorCode: string;
    twoFactorRecoveryCode: string;
}

export interface RoleDto{
    roleId:string;
    roleName:string;
}

export interface Me{
    id:string;
    userName: string;
    companyId: string;
    loginId: string;
    emplId:string;
    emplName: string;
    lastLanguage: string;
    tel1: string;
    tel2: string;
    roles:RoleDto[];
    departmentDto:DepartmentDto;
    userCompanyRoles:string[];
}