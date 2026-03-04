import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthService } from '@auth/services/auth.service';
import { AvailableCoursesResponse, CourseResponse, JoinToCourseForm, NewCourseForm, SingleCourseResponse, StudentsResponse } from '@courses/interfaces/courses.interface';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CoursesService {

  private http = inject(HttpClient)
  private baseUrl = `${environment.backendUrl}/course`
  private authService = inject(AuthService)

  isCourseCreator = signal<boolean | null>(null)

   coursesResource = rxResource({
    request: () => ({id: this.authService._user()?.id}),
    loader: () => {
      return this.getUserCourses()
    }
  })

  getUserCourses() {
    return this.http.get<CourseResponse>(`${this.baseUrl}`).pipe(
      map((resp) => [...resp.createdCourses, ...resp.enrolledCourses] ),
    )
  }

  newCourse(formData: NewCourseForm) {
    const { background, ...rest } = formData

    return this.http.post<string>(`${this.baseUrl}/image`, background).pipe(
      switchMap((resp) => {
        const data = {
          ...rest,
          background: resp
        }
        return this.http.post<string>(`${this.baseUrl}`, data)
      })
    )
  }

  getCousesAvailables() {
    return this.http.get<AvailableCoursesResponse[]>(`${this.baseUrl}/available-courses`)
  }

  joinToCourse(data: JoinToCourseForm, courseId: string) {
    return this.http.post<string>(`${this.baseUrl}/${courseId}`, data).pipe(
      map(resp => ({ok: true, message: resp})),
      catchError(resp => of({ok: false, message: resp.error.error}))
    )
  }

  getCourse(courseId: string) {
    return this.http.get<SingleCourseResponse>(`${this.baseUrl}/${courseId}`).pipe(
      tap((resp) => {
        if(+resp.creator.id === this.authService._user()?.id) {
          this.isCourseCreator.set(true)
        } else {
          this.isCourseCreator.set(false)
        }
      })
    )
  }

  getStudents(courseId: string) {
    return this.http.get<StudentsResponse>(`${this.baseUrl}/${courseId}/students`).pipe(
      map(resp => resp.users )
    )
  }

  getSubmitsCourse(courseId: string) {
    const url = `${environment.backendUrl}/submit/${courseId}/user-submits`
    return this.http.get<{id: string}[]>(url)
  }

}
