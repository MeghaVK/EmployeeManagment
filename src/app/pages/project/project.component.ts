import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MasterService } from '../../shared/components/header/services/master.service';
import { Iproject } from '../../model/interface/master';
import { Observable } from 'rxjs';
import { isPromise } from 'rxjs/internal/util/isPromise';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit,OnDestroy {
  _router=inject(Router);
  masterService=inject(MasterService);
  projectList$:Iproject[]=[];

  addProject(){

  }
  ngOnInit(): void {
    this.getProjectList()
  }

  getProjectList(){
    this.masterService.getAllProjects().subscribe((response:Iproject[])=>{
      console.log(response);
      this.projectList$=response;
    })
  }
  ngOnDestroy(): void {
    
  }
  onEdit(obj:Iproject){
    this._router.navigate(['new-project',obj.projectId]);

  }
  onDelete(proj:number){

  }
}
