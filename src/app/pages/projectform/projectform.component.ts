import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../../model/class/employee';
import { MasterService } from '../../shared/components/header/services/master.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Iproject } from '../../model/interface/master';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projectform',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,AsyncPipe],
  templateUrl: './projectform.component.html',
  styleUrl: './projectform.component.scss'
})
export class ProjectformComponent {
  projectForm:FormGroup=new FormGroup({});
  empList$:Observable<Employee[]>=new Observable<[]>;
  masterService = inject(MasterService);
  aroute=inject(ActivatedRoute);
  constructor(){
    this.empList$ = this.masterService.getAllEmployeeDetails();
    this.intializeForm();
    this.aroute.params.subscribe((res:any)=>{
      if(res.id!==0){
        this.getProjectById(res.id)
      }
    })

  }

  intializeForm(data?:Iproject){
    this.projectForm = new FormGroup({
      projectId: new FormControl(data?data.projectId:0),
      projectName:new FormControl(data?data.projectName:''),
      clientName:new FormControl(data?data.clientName:''),
      startDate:new FormControl(data?data.startDate:''),
      leadByEmpId:new FormControl(data?data.leadByEmpId:''),
      contactPerson:new FormControl(data?data.contactPerson:''),
      contactNo:new FormControl(data?data.contactNo:''),
      emailId:new FormControl(data?data.emailId:''),


    })
  }

  getProjectById(id:number){
    this.masterService.getProjectById(id).subscribe((response:Iproject)=>{
      console.log(response);
     this.intializeForm(response)
    },error=>{
      alert(error.errors[0])
    })
  }
  onSubmit(){
    
    const formValue = this.projectForm.value;
    console.log(formValue)
    this.masterService.createProject(formValue).subscribe((response:Iproject)=>{
      console.log(response);
      alert('Project created successfully')
    },error=>{
      alert(error)
    })

    
  }
  onUpdate(){
     const formValue = this.projectForm.value;
    console.log(formValue)
    this.masterService.updateProject(formValue).subscribe((response:Iproject)=>{
      console.log(response);
      alert('Project created successfully')
    },error=>{
      alert(error)
    })
  }
}
