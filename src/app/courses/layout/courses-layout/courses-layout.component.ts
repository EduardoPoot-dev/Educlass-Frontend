import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { AuthService } from '@auth/services/auth.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-courses-layout',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './courses-layout.component.html',
})
export class CoursesLayoutComponent {

}
