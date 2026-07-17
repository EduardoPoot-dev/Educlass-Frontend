import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { AlertComponent } from '@shared/alert/alert.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, ToastModule, RouterLinkWithHref],
  templateUrl: './auth.component.html',
})
export class AuthComponent {

}
