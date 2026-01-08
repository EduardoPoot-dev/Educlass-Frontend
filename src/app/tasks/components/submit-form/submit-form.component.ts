import { Component, computed, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '@tasks/services/task.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-submit-form',
  imports: [
    ReactiveFormsModule,
    ToastModule
  ],
  templateUrl: './submit-form.component.html',
})
export class SubmitFormComponent {
  private taskService = inject(TaskService)
  private fb = inject(FormBuilder)
  private messageService = inject(MessageService)

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
      this.messageService.add({
        severity: 'success',
        summary: resp
      })
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
