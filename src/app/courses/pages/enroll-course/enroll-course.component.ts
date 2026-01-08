import { Component, inject, signal } from '@angular/core';
import { EnrollCourseCardComponent } from "../../components/enroll-course-card/enroll-course-card.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { CoursesService } from '@courses/services/courses.service';
import { DataViewModule } from 'primeng/dataview';
import { JoinCourseModalComponent } from "../../components/join-course-modal/join-course-modal.component";

@Component({
  selector: 'app-enroll-course',
  imports: [EnrollCourseCardComponent, DataViewModule, JoinCourseModalComponent],
  templateUrl: './enroll-course.component.html',
})
export class EnrollCourseComponent {

  private courseService = inject(CoursesService)

  visible = signal(false)

  //TODO: Pasar la id del usuario para que, si se inicia una nueva sesion se haga de nuevo la peticion
  availableCoursesResource = rxResource({
    request: () => ({}),
    loader: () => {
      return this.courseService.getCousesAvailables()
    }
  })

  isVisible(e: boolean) {
    this.visible.set(e)
  }



}
