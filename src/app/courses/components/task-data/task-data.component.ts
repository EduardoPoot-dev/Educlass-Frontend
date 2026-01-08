import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Task } from '@courses/interfaces/courses.interface';

@Component({
  selector: 'app-task-data',
  imports: [TitleCasePipe, DatePipe, RouterLink],
  templateUrl: './task-data.component.html',
})
export class TaskDataComponent {
  courseId = input.required<string>()
  task = input.required<Task>()

}
