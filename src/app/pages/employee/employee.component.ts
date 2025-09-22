import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators, FormsModule } from '@angular/forms';
import { MasterService } from '../../shared/components/header/services/master.service';
import { IApiResponse, IChildDept, IParentDept } from '../../model/interface/master';
import { Employee } from '../../model/class/employee';
// import { NgForOf } from "../../../../node_modules/@angular/common/index";

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit{
  masterService = inject(MasterService);
  isFormVisible=signal<boolean>(false);
  parentDeptList = signal<IParentDept[]>([]);
  childDeptList = signal<IChildDept[]>([]);
  employeeObj:Employee=new Employee();
  employeeList=signal<Employee[]>([])
  

  ngOnInit(): void {
    this.getParentDept();
    this.displayEmpData();
  }

  getParentDept(){
      this.masterService.getAllParentDept().subscribe((response:IApiResponse)=>{
      this.parentDeptList.set(response.data);
    })
  }
  onParentIdSelect(eventval:any){
    if(eventval.target.value){
    this.getChildDept(eventval.target.value);
    }

  }
  getChildDept(id:number){
      this.masterService.getAllChildDept(id).subscribe((response:IApiResponse)=>{
      this.childDeptList.set(response.data);
    })
  }
  onSubmit(){
   
    
    this.masterService.createEmployee(this.employeeObj).subscribe((response:IApiResponse)=>{
      console.log(response);
      alert('Employee created successfully');
      
    },error=>{
      console.error(error)
    })
  }

  displayEmpData(){
    this.masterService.getAllEmployeeDetails().subscribe((response:Employee[])=>{
      this.employeeList.set(response);
      console.log(this.employeeList)
    })
  }
  onEdit(emp:Employee){
    this.employeeObj=emp;
    this.isFormVisible.set(true);

  }
  onUpdate(){
    this.masterService.updateEmployee(this.employeeObj).subscribe((response)=>
    {
      console.log(response)
    })

  }
  onDelete(id:number){
    const isDelete = confirm("Are you sure want to delete the record?");
    if(isDelete){
    this.masterService.deleteEmployee(id).subscribe((response)=>{
      console.log(response)
    })
  }

  }




 


}

export class TextFieldValidator{
  static validatetextfield(control:FormControl):ValidationErrors|null{
    if(control.value!=undefined || control.value!= '' || control.value!= null){
      const regex = /^[0-9a-zA-Z ]+$/;
      if(regex.test(control.value)){
        return null;
      }
      else{
        return { validTextField:true}
      }

    }
    else{
      return null;
    }

  }
}
