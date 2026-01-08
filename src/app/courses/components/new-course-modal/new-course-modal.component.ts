import { Component, inject, input, WritableSignal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoursesService } from '@courses/services/courses.service';
import { FormUtils } from '@utils/form-utils';
import { DialogModule } from 'primeng/dialog'
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-new-course-modal',
  imports: [
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    FileUploadModule,
    SelectModule,
  ],
  templateUrl: './new-course-modal.component.html',
})
export class NewCourseModalComponent {
  formUtils = FormUtils
  grade = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  group = ['A', 'B', 'C']

  visible = input.required<WritableSignal<boolean>>()

  private fb = inject(FormBuilder)
  private coursesService = inject(CoursesService)
  private messageService = inject(MessageService)

  form = this.fb.group({
    name: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
    grade: ['1', [Validators.required]],
    group: ['a', [Validators.required]],
    background: [new FormData(), [this.formUtils.hasInfoFileInputValidator]]
  }, {
    validators: [
      this.formUtils.equalValidator('password', 'confirmPassword')
    ]
  })

  get isVisible() {
    return this.visible()
  }

  onSubmit() {
    //console.log(this.form.controls.background.value?.get('file'))
    this.form.markAllAsTouched()
    if (this.form.invalid) return

    this.visible().set(false)

    const data = {
      name: this.form.controls.name.value || '',
      password: this.form.controls.password.value || '',
      grade: this.form.controls.grade.value || '',
      group: this.form.controls.group.value?.toLowerCase() || '',
      background: this.form.controls.background.value || new FormData(),
    }

    this.coursesService.newCourse(data).subscribe((resp) => {
      this.coursesService.coursesResource.reload()

      setTimeout(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Curso creado correctamente',
        })
      }, 200);
    })

  }

  onInputFileChange(e: Event) {


    const file = (e.target as HTMLInputElement).files

    // user delete a file from input
    if (file && file.length === 0) {
      const formData = new FormData();
      this.form.controls.background.setValue(formData)
      return
    }

    if (file && this.form.controls.background.value) {
      const formData = new FormData();
      formData.append('file', file[0]);

      this.form.controls.background.setValue(formData)
    }
  }

}
