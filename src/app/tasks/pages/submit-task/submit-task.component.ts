import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '@tasks/services/task.service';
import { FileUploadModule } from 'primeng/fileupload';
import { TaskHeaderComponent } from '@tasks/components/task-header/task-header.component';
import { TaskDescriptionComponent } from "@tasks/components/task-description/task-description.component";
import { SidebarComponent } from "@tasks/components/sidebar/sidebar.component";
import { TaskComponent } from '@tasks/components/task/task.component';

@Component({
  selector: 'app-submit-task',
  imports: [
    FileUploadModule,
    TaskHeaderComponent,
    TaskDescriptionComponent,
    SidebarComponent,
    TaskComponent,
],
  templateUrl: './submit-task.component.html',
})
export class SubmitTaskComponent {
  private activatedRoute = inject(ActivatedRoute)
  private taskService = inject(TaskService)

  courseId = this.activatedRoute.snapshot.paramMap.get('courseId')!
  taskId = this.activatedRoute.snapshot.paramMap.get('taskId')!

  taskResource = rxResource({
    request: () => ({courseId: this.courseId, taskId: this.taskId}),
    loader: ({request}) => this.taskService.getTask(request.courseId, request.taskId)
  })

  submitedTaskResource = rxResource({
    request: () => ({
      courseId: this.courseId!,
      taskId: this.taskId!
    }),
    loader: ({request}) => this.taskService.getTaskSubmited(request.courseId, request.taskId)
  })

}
