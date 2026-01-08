import { Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CourseCardComponent } from '@courses/components/course-card/course-card.component';
import { CoursesService } from '@courses/services/courses.service';
import { NewCourseModalComponent } from "@courses/components/new-course-modal/new-course-modal.component";
import { ButtonModule } from 'primeng/button';
import { AuthService } from '@auth/services/auth.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-all-courses',
  imports: [
    CourseCardComponent,
    RouterLink,
    NewCourseModalComponent,
    ButtonModule,
    TitleCasePipe
  ],
  templateUrl: './all-courses.component.html',
})
export class AllCoursesComponent {
  private authService = inject(AuthService)
  private coursesService = inject(CoursesService)

  courses = computed(() => this.coursesService.coursesResource.value())
  userName = computed(() => this.authService._user()?.name
)

  visible = signal(false)

  showDialog() {
    this.visible.set(true)
  }

}
