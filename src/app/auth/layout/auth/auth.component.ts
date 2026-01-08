import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertComponent } from '@shared/alert/alert.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, ToastModule],
  templateUrl: './auth.component.html',
})
export class AuthComponent {

}
