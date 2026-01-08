import { Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CoursesService } from '@courses/services/courses.service';
import { TaskService } from '@tasks/services/task.service';
import { SubmitFormComponent } from '@tasks/components/submit-form/submit-form.component';
import { SubmitedTaskComponent } from "../submited-task/submited-task.component";
import { SubmitsListComponent } from "../submits-list/submits-list.component";
import { SubmitResponse } from '@tasks/interfaces/task.interface';

@Component({
  selector: 'app-task',
  imports: [SubmitFormComponent, SubmitedTaskComponent, SubmitsListComponent],
  templateUrl: './task.component.html',
})
export class TaskComponent {
  private taskSevice = inject(TaskService)

  taskDueDate = input.required<Date | string>()
  courseId = input.required<string>()
  taskId = input.required<string>()

  task = input.required<SubmitResponse>()

  isCourseCreator = computed(() => this.taskSevice.isCourseCreator())
}
