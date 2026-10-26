import { Component, inject, input, WritableSignal } from '@angular/core';
import { FormUtils } from '@utils/form-utils';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { CoursesService } from '@courses/services/courses.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ToastService } from 'ngx-toastr-notifier';

@Component({
  selector: 'app-join-course-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './join-course-modal.component.html',
})
export class JoinCourseModalComponent {
  private toastService = inject(ToastService)
  private courseService = inject(CoursesService)

  private fb = inject(FormBuilder)
  private activatedRoute = inject(ActivatedRoute)
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
        this.toastService.success(resp.message)
      } else {
        this.toastService.error(resp.message)
      }
    })
  }

  onHide() {
    this.router.navigateByUrl('/courses/enroll')
  }
}
