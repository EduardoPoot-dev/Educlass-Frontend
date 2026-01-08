import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { TaskService } from '@tasks/services/task.service';
import { StudentFileComponent } from './components/student-file/student-file.component';

@Component({
  selector: 'app-submits-list',
  imports: [
    StudentFileComponent
  ],
  templateUrl: './submits-list.component.html',
})
export class SubmitsListComponent {
  private taskService = inject(TaskService)

  courseId = input.required<string>()
  taskId = input.required<string>()

  studentsSubmitsResource = rxResource({
    request: () => ({
      courseId: this.courseId(), taskId: this.taskId()
    }),
    loader: ({request}) => {
      return this.taskService.getSubmitList(request.courseId, request.taskId)
    }
  })

}
