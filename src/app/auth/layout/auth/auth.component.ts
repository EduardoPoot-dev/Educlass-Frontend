import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { AlertComponent } from '@shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './auth.component.html',
})
export class AuthComponent {

}
