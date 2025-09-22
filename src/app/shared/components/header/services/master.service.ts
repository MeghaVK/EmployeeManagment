import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IApiResponse, Iproject, IprojectEmployee } from '../../../../model/interface/master';
import { Employee } from '../../../../model/class/employee';

@Injectable({
  providedIn: 'root'
})
export class MasterService  {

  constructor() { }
   _http = inject(HttpClient);

   getAllParentDept() :Observable<IApiResponse>{
    return this._http.get<IApiResponse>(environment.BASE_API_URL+'GetParentDepartment');
   }
    getAllChildDept(id:number) :Observable<IApiResponse>{
      // console.log(environment.BASE_API_URL+`GetChildDepartmentByParentId?${id}`)
    return this._http.get<IApiResponse>(environment.BASE_API_URL+`GetChildDepartmentByParentId?deptId=${id}`);
   }

   createEmployee(obj:Employee):Observable<IApiResponse>{

    return this._http.post<IApiResponse>(environment.BASE_API_URL+`CreateEmployee`,obj);

   }
   getAllEmployeeDetails():Observable<Employee[]>{
    return this._http.get<Employee[]>(environment.BASE_API_URL+'GetAllEmployees');
   }

   updateEmployee(obj:Employee):Observable<IApiResponse>{
    return this._http.put<IApiResponse>(environment.BASE_API_URL+'UpdateEmployee/'+ obj.employeeId,obj)
   }
   deleteEmployee(obj:number):Observable<IApiResponse>{
    return this._http.delete<IApiResponse>(environment.BASE_API_URL+'DeleteEmployee/'+ obj
      
    )
   }

   createProject(obj:Employee):Observable<Iproject>{
    return this._http.post<Iproject>(environment.BASE_API_URL+'createProject',obj)
   }
   getAllProjects():Observable<Iproject[]>{
    return this._http.get<Iproject[]>(environment.BASE_API_URL+'GetAllProjects');
   }
   getProjectById(id:number):Observable<Iproject>{
    return this._http.get<Iproject>(environment.BASE_API_URL+'GetProject/'+ id)
   }
      deleteProject(obj:number):Observable<IApiResponse>{
    return this._http.delete<IApiResponse>(environment.BASE_API_URL+'DeleteProject/'+ obj
      
    )
   }

    updateProject(obj:Iproject):Observable<Iproject>{
    return this._http.put<Iproject>(environment.BASE_API_URL+'UpdateProject/'+ obj.projectId,obj)
   }
   getAllProjectEmployee():Observable<IprojectEmployee[]>{
    return this._http.get<IprojectEmployee[]>(environment.BASE_API_URL+'GetAllProjectEmployees');
   }
   createProjectEmployee(obj:IprojectEmployee):Observable<Iproject>{
    return this._http.post<Iproject>(environment.BASE_API_URL+'createProjectEmployee',obj)
   }
    updateProjectEmployee(obj:IprojectEmployee):Observable<IprojectEmployee>{
    return this._http.put<IprojectEmployee>(environment.BASE_API_URL+'UpdateProjectEmployee/'+ obj.empProjectId,obj)
   }

   getDashboardData():Observable<any>{
    return this._http.get(environment.BASE_API_URL+'GetDashboard');
   }
}
