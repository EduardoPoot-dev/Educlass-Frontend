import { Component, computed, inject, signal } from '@angular/core';
import { ProgressTrackerComponent } from "@courses/components/progress-tracker/progress-tracker.component";
import { TaskDataComponent } from '@courses/components/task-data/task-data.component';
import { CourseHeaderComponent } from '@courses/components/course-header/course-header.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { CoursesService } from '@courses/services/courses.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-course',
  imports: [
    ProgressTrackerComponent,
    TaskDataComponent,
    CourseHeaderComponent,
    RouterLink,
    ButtonModule,
  ],
  templateUrl: './course.component.html',
})
export class CourseComponent {
  private courseService = inject(CoursesService)
  private activatedRoute = inject(ActivatedRoute)

  isCourseCreator = computed(() => this.courseService.isCourseCreator())
  courseId = this.activatedRoute.snapshot.paramMap.get('courseId')
  progress = signal(0)

  courseResource = rxResource({
    request: () => ({courseId: this.courseId}),
    loader: ({request}) => this.courseService.getCourse(request.courseId || '')
  })

  course = computed(() => this.courseResource.value())

  courseData = computed(() => ({
    name: this.course()?.name,
    creatorName: this.course()?.creator.name,
    studentsQuantity: this.course()?.users.length,
    tasksQuantity: this.course()?.tasks.length || 0
  }))



}
