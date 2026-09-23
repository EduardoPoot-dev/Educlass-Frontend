import { Component, computed, effect, inject, input, linkedSignal, OnDestroy, output, signal, WritableSignal } from '@angular/core';
import { FormUtils } from '@utils/form-utils';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, switchMap, tap } from 'rxjs';
import { CoursesService } from '@courses/services/courses.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-join-course-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './join-course-modal.component.html',
})
export class JoinCourseModalComponent {
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
        window.alert(resp.message)
      } else {
        window.alert(resp.message)
      }


    })
  }

  onHide() {
    this.router.navigateByUrl('/courses/enroll')
  }
}
