import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-header',
  imports: [
    TitleCasePipe,
    DatePipe,
    RouterLink
  ],
  templateUrl: './task-header.component.html',
})
export class TaskHeaderComponent {

  name = input<string>()
  dueDate = input<string | Date>()
  courseId = input<string>()

}
