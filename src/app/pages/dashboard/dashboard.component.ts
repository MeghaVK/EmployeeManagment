import { Component, OnInit,inject } from '@angular/core';
import { MasterService } from '../../shared/components/header/services/master.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  dashboardData:any;
  masterService = inject(MasterService)
  ngOnInit(): void {
    this.getData()
    
  }
  getData(){
    this.masterService.getDashboardData().subscribe((response)=>{
      console.log(response);
      this.dashboardData=response;
    })
  }

}
