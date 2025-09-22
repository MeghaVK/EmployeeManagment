import { Component,inject } from '@angular/core';
import { RouterLink, RouterLinkActive,Router } from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
    router = inject(Router);
  logout(){
    this.router.navigateByUrl('/login')

  }

}
