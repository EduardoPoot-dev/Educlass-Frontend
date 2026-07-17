import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'home-navigation-desktop',
  imports: [RouterLink],
  templateUrl: './navigation-desktop.component.html',
})
export class NavigationDesktopComponent {
  authService = inject(AuthService)

  isAuthenticated() {
    return this.authService.status() === 'authenticated'
  }

}
