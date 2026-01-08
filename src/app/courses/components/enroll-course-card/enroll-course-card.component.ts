import { TitleCasePipe } from '@angular/common';
import { Component, effect, inject, input, linkedSignal, output, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { AvailableCoursesResponse } from '@courses/interfaces/courses.interface';
import { ButtonModule } from 'primeng/button';
import { map } from 'rxjs';

@Component({
  selector: 'app-enroll-course-card',
  imports: [ButtonModule, TitleCasePipe],
  templateUrl: './enroll-course-card.component.html',
})
export class EnrollCourseCardComponent {
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)

  course = input.required<AvailableCoursesResponse>()

  queryParam = toSignal(
    this.activatedRoute.queryParams.pipe(
      map( param => param['courseId']),
    )
  )

  showModal = linkedSignal(() => this.queryParam() ? true : false)
  visible = output<boolean>()

  modalEffect = effect(() => {
    this.visible.emit(this.showModal())
  })

  onModal() {
    this.showModal.set(true)
    this.visible.emit(this.showModal())
  }

  enrollCourse() {
    this.onModal()

    this.router.navigate(['/courses/enroll'], {
      queryParams: {
        courseId: this.course().id
      }
    })
  }



}
