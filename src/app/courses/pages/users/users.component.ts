import { TitleCasePipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CoursesService } from '@courses/services/courses.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-users',
  imports: [TableModule, TitleCasePipe, RouterLink],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  private activatedRoute = inject(ActivatedRoute)
  private courseService = inject(CoursesService)

  courseId = this.activatedRoute.snapshot.paramMap.get('courseId')

  studentsResource = rxResource({
    request: () => ({courseId: this.courseId}),
    loader: ({request}) => this.courseService.getStudents(request.courseId!)
  })

  get students() {
    return this.studentsResource.value() || []
  }

}
