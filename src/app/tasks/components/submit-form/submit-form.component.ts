import { Component, computed, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '@tasks/services/task.service';
import { ToastService } from 'ngx-toastr-notifier';

@Component({
  selector: 'app-submit-form',
  imports: [ReactiveFormsModule],
  templateUrl: './submit-form.component.html',
})
export class SubmitFormComponent {
  private toastService = inject(ToastService)
  private taskService = inject(TaskService)
  private fb = inject(FormBuilder)

  courseId = input.required<string>()
  taskId = input.required<string>()

  taskDueDate = input.required<Date | string>()
  formatedDueDate = computed(() => new Date(this.taskDueDate()).getTime())
  currentTime = new Date(Date.now()).getTime()

  filesToSend: FormData[] | null = null
  btnSubmitDisabled = signal(false)

  form = this.fb.group({
    files: []
  })

  onSubmit() {
    this.btnSubmitDisabled.set(true)

    this.taskService.submitTask(
      this.filesToSend!, this.courseId(), this.taskId()
    ).subscribe((resp) => {
      this.toastService.success(resp)
      window.location.reload()
    })
  }

  onInputFileChange(e: Event) {
    const files = (e.target as HTMLInputElement).files

    if(!files) return

    const list = []

    for(let i = 0; i < files.length; i++ ) {
      const formData = new FormData()
      formData.append('files', files[i])
      list.push(formData)
    }

    this.filesToSend = list
  }
}
