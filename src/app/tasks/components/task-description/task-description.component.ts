import { Component, input } from '@angular/core';

@Component({
  selector: 'app-task-description',
  imports: [],
  templateUrl: './task-description.component.html',
})
export class TaskDescriptionComponent {

  description = input<string>()

}
