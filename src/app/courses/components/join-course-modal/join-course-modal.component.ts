import { Component, computed, effect, inject, input, linkedSignal, OnDestroy, output, signal, WritableSignal } from '@angular/core';
import { FormUtils } from '@utils/form-utils';
import { DialogModule } from 'primeng/dialog'
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, switchMap, tap } from 'rxjs';
import { CoursesService } from '@courses/services/courses.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-join-course-modal',
  imports: [
    DialogModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './join-course-modal.component.html',
})
export class JoinCourseModalComponent {
  private courseService = inject(CoursesService)

  private fb = inject(FormBuilder)
  private activatedRoute = inject(ActivatedRoute)
  private messageService = inject(MessageService)
  private router = inject(Router)

  visible = input.required<WritableSignal<boolean>>()

  queryParam = toSignal(
    this.activatedRoute.queryParams.pipe(
      map( param => param['courseId']),
    )
  )

  formUtils = FormUtils

  form = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  get isVisible() {
    return this.visible()
  }

  onSubmit() {
    this.form.markAllAsTouched()

    if(this.form.invalid) return

    const data = {
      password: this.form.controls.password.value || ''
    }

    this.courseService.joinToCourse(data, this.queryParam()).subscribe(resp => {
      this.form.reset()
      this.visible().set(false)

      if(resp.ok) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: resp.message
        })
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: resp.message
        })
      }


    })
  }

  onHide() {
    this.router.navigateByUrl('/courses/enroll')
  }
}
