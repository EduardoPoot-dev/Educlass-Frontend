import { PercentPipe, TitleCasePipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CoursesService } from '@courses/services/courses.service';

interface CourseData {
    name: string
    creatorName: string
    studentsQuantity: number
    tasksQuantity: number
    submitQuantity: number
    progress: number
}

@Component({
  selector: 'app-course-header',
  imports: [PercentPipe, TitleCasePipe, RouterLink],
  templateUrl: './course-header.component.html',
})
export class CourseHeaderComponent {
  private activatedRoute = inject(ActivatedRoute)
  private courseService = inject(CoursesService)

  progress = input<number>()
  courseData = input<Partial<CourseData>>()
  isCourseCreator = computed(() => this.courseService.isCourseCreator())

  courseId = this.activatedRoute.snapshot.paramMap.get('courseId')

}
