import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../shared/components/header/services/master.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Employee } from '../../model/class/employee';
import { Iproject, IprojectEmployee } from '../../model/interface/master';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-employee',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,AsyncPipe],
  templateUrl: './project-employee.component.html',
  styleUrl: './project-employee.component.scss'
})
export class ProjectEmployeeComponent implements OnInit {
  masterService= inject(MasterService);
  projectEmpList$=signal<IprojectEmployee[]>([]);
  form:FormGroup=new FormGroup({});
  projectList$:Observable<Iproject[]>=new Observable<Iproject[]>;
   empList$:Observable<Employee[]>=new Observable<Employee[]>

constructor(){
  this.initializeForm();
  this.projectList$ = this.masterService.getAllProjects();
  this.empList$ = this.masterService.getAllEmployeeDetails();
}
getAllProjEmp(){
   this.masterService.getAllProjectEmployee().subscribe((response:IprojectEmployee[])=>{
      console.log(response);
      this.projectEmpList$.set(response);
    });
}
  ngOnInit(): void {
   this.getAllProjEmp();
    
  }
  initializeForm(){
    this.form = new FormGroup({
       empProjectId:new FormControl(0),
    projectId:new FormControl(0),
    empId:new FormControl(0),
    assignedDate:new FormControl(''),
    role:new FormControl(''),
    isActive:new FormControl('')
    })
  }
  onEdit(projemp:IprojectEmployee){
    // this.form.

  }
  onDelete(projemp:number){

  }
  onSubmit(){

    const formValue = this.form.value;
    this.masterService.createProjectEmployee(formValue).subscribe((response:Iproject)=>{
      alert('Project Employee created successfully')
     this.getAllProjEmp();
    },error=>{
      console.log(error)
    })
  }

}
