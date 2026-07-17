import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'home-navigation-mobile',
  imports: [RouterLink],
  templateUrl: './navigation-mobile.component.html',
})
export class NavigationMobileComponent {

  opened = signal(false)

  authService = inject(AuthService)

  isAuthenticated() {
    return this.authService.status() === 'authenticated'
  }

  handleOpened() {
    this.opened.update(prev => !prev)
  }

}
