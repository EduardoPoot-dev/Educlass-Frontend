import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { enviroment } from '@enviroment/enviroment';
import { NewTaskForm, SubmitResponse, TaskResponse } from '@tasks/interfaces/task.interface';
import { catchError, forkJoin, map, of, switchMap, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TaskService {
  private baseUrl = `${enviroment.backendUrl}/tasks`
  private http = inject(HttpClient)
  private authService = inject(AuthService)

  isCourseCreator = signal<boolean | null>(null)

  newTask(courseId: string, newTask: NewTaskForm) {
    return this.http.post<string>(`${this.baseUrl}/${courseId}`, newTask).pipe(
      map(resp => ({ok: true, message: resp})),
      catchError((err) => of({ok: false, message: err.error.error}))
    )
  }

  getTask(courseId: string, taskId: string) {
    return this.http.get<TaskResponse>(`${this.baseUrl}/${courseId}/${taskId}`).pipe(
      tap((resp) => {
        if(+resp.creatorId === this.authService._user()?.id) {
          this.isCourseCreator.set(true)
        } else {
          this.isCourseCreator.set(false)
        }
      })
    )
  }

  uploadFiles(fileList: FormData[]) {
    const files = fileList.map(file => {
      return this.uploadFile(file)
    })

    return forkJoin(files)
  }

  uploadFile(formData: FormData) {
    const url = `${enviroment.backendUrl}/tasks/files`
    return this.http.post<string[]>(url, formData).pipe(
      map(resp => resp[0])
    )
  }

  submitTask(fileList: FormData[], courseId: string, taskId: string) {
    return this.uploadFiles(fileList).pipe(
      map(resp => ({files: resp})),
      switchMap(resp => this.newSubmit(resp, courseId, taskId)),
    )
  }

  getTaskSubmited(courseId: string, taskId: string) {
    const url = `${enviroment.backendUrl}/submit/${courseId}/${taskId}/submit`
    return this.http.get<SubmitResponse>(url)
  }

  newSubmit(files: {files: string[]}, courseId: string, taskId: string) {
    const url = `${enviroment.backendUrl}/submit/${courseId}/${taskId}`
    return this.http.post<string>(url, files)
  }

  getSubmitList(courseId: string, taskId: string) {
    const url = `${enviroment.backendUrl}/submit/${courseId}/${taskId}`

    return this.http.get<SubmitResponse[]>(url)
  }





}
