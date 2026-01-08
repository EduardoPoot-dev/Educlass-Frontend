import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { LoginUser, NewUser, User } from '@auth/interfaces/auth.interface';
import { enviroment } from '@enviroment/enviroment';
import { rxResource } from "@angular/core/rxjs-interop"
import { catchError, map, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  private http = inject(HttpClient)
  private baseUrl = `${enviroment.backendUrl}`

  _token = signal<string | null>(localStorage.getItem('TOKEN'))
  _user = signal<User | null>(null)
  _status = signal('checking')

  token = computed(() => this._token())

  status = computed(() => {
    if(this._status() === 'checking') {
      return 'checking'
    }

    if(this._user()) {
      return 'authenticated'
    }

    return 'no-authenticated'
  })

  authResource = rxResource({
    loader: () => this.authenticate()
  })

  createAccount(data: NewUser) {
    return this.http.post(`${this.baseUrl}/auth/create-account`, data)
  }

  login(data: LoginUser) {
    return this.http.post(`${this.baseUrl}/auth/login`, data).pipe(
      tap((resp) => localStorage.setItem('TOKEN', `${resp}`)),
      tap((resp) => this._token.set(`${resp}`))
      //catcherror
    )
  }

  authenticate() {
    return this.http.get<User>(`${this.baseUrl}/auth/user`).pipe(
      tap((resp) => this._user.set(resp)),
      tap(() => this._status.set('authenticated')),
      map(() => true),
      catchError(() => {
        this._status.set('no-authenticated')
        return of(false)
      })
    )
  }

  logOut() {
    this._token.set(null)
    this._user.set(null)
    this._status.set('no-authenticated')

    localStorage.removeItem('TOKEN')
  }



}
