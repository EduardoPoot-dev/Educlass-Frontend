import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '@auth/services/auth.service';
import { NavigationDesktopComponent } from '@home/components/navigation-desktop/navigation-desktop.component';
import { NavigationMobileComponent } from "@home/components/navigation-mobile/navigation-mobile.component";

@Component({
  selector: 'app-home',
  imports: [RouterLink, NavigationDesktopComponent, NavigationMobileComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  authService = inject(AuthService)

  currentYear = new Date().getFullYear()

  isAuthenticated() {
    return this.authService.status() === 'authenticated'
  }
}
