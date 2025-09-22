import { Component,inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  router = inject(Router);
  loginObj:any={
    username:'',
    password:''
  }

  onLogin(){
    if(this.loginObj.username=='admin' && this.loginObj.password=='admin@123'){
      this.router.navigateByUrl('/dashboard')
    }
    else{
      alert('wrong credentials')
    }
  }

}
