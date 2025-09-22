export interface IApiResponse{
    message:string,
    result:boolean,
    data:any
}

export interface IParentDept{
    departmentId:number,
    departmentName:string,
    departmentLogo:string
}
export interface IChildDept{
    childDeptId:number,
    departmentName:string,
    departmentLogo:string
}
export interface Iproject{
    projectId:number,
    projectName:string,
    clientName:string,
    startDate:string,
    leadByEmpId:number,
    contactPerson:string,
    contactNo:string,
    emailId:string
}
export interface IprojectEmployee{
    empProjectId:number,
    projectId:number,
    empId:number,
    assignedDate:string,
    role:string,
    isActive:string
}