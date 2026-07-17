import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'home-navigation-mobile',
  imports: [RouterLink],
  templateUrl: './navigation-mobile.component.html',
})
export class NavigationMobileComponent {

  opened = signal(false)

  handleOpened() {
    this.opened.update(prev => !prev)
  }

}
