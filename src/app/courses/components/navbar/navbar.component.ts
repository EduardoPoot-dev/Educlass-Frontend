import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  private authService = inject(AuthService)
  private router = inject(Router)

  onLogOut() {
    this.authService.logOut()
    this.router.navigateByUrl('/auth/login')
  }

}
