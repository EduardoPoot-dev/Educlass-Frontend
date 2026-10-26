import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@utils/form-utils';
import { TaskService } from '@tasks/services/task.service';
import { ToastService } from 'ngx-toastr-notifier';

@Component({
  selector: 'app-new-task',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './new-task.component.html',
})
export class NewTaskComponent {
  private toastService = inject(ToastService)
  private activatedRoute = inject(ActivatedRoute)
  private fb = inject(FormBuilder)
  private taskService = inject(TaskService)
  private router = inject(Router)

  courseId = this.activatedRoute.snapshot.paramMap.get('courseId')!

  formUtils = FormUtils

  form = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    dueDate: ['', [Validators.required]]
  })

  onSubmit() {
    this.form.markAllAsTouched()

    if (this.form.invalid) return

    const data = {
      name: this.form.value.name || '',
      description: this.form.value.description || '',
      dueDate: this.form.value.dueDate || '',
    }

    this.taskService.newTask(this.courseId, data).subscribe(resp => {
      if (resp.ok) {
        this.toastService.success(resp.message)
        setTimeout(() => this.goToTask(), 500)
      } else {
        this.toastService.error(resp.message)
      }
      this.form.reset()
    })
  }

  goToTask() {
    this.router.navigateByUrl(`/courses/course/${this.courseId}`)
  }

}
