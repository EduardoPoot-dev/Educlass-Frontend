import { Routes } from "@angular/router";
import { CoursesLayoutComponent } from "./layout/courses-layout/courses-layout.component";
import { AllCoursesComponent } from "./pages/all-courses/all-courses.component";
import { coursesGuard } from "./guards/courses.guard";
import { EnrollCourseComponent } from "./pages/enroll-course/enroll-course.component";
import { CourseComponent } from "./pages/course/course.component";
import { UsersComponent } from "./pages/users/users.component";

const coursesRoutes: Routes = [
  {
    path: '',
    component: CoursesLayoutComponent,
    canMatch: [coursesGuard],
    children: [
      {
        path: '',
        component: AllCoursesComponent,
      },
      {
        path: 'enroll',
        component: EnrollCourseComponent
      },
      {
        path: 'course/:courseId',
        component: CourseComponent
      },
      {
        path: 'course/:courseId/users',
        component: UsersComponent
      },
      {
        path: 'course/:courseId/task',
        loadChildren: () => import('../tasks/task.routes')
      }
    ]

  }
]
export default coursesRoutes
