import { DatePipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { CoursesService } from '@courses/services/courses.service';
import { SubmitResponse } from '@tasks/interfaces/task.interface';

@Component({
  selector: 'app-sidebar',
  imports: [
    DatePipe
  ],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  private courseService = inject(CoursesService)
  isCourseCreator = computed(() => this.courseService.isCourseCreator())

  task = input.required<SubmitResponse>()

  dueDate = input<Date | string>()
  dueDateTime = computed(() => new Date(this.dueDate()!).getTime())
  currentTime = Date.now()


}
