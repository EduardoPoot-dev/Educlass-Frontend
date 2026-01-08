import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { FormUtils } from '@utils/form-utils';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, InputTextModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder)
  private authService = inject(AuthService)
  private router = inject(Router)
  private messageService = inject(MessageService)

  formUtils = FormUtils

  form = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  onSubmit() {
    this.form.markAllAsTouched()

    const data = {
      email: this.form.controls.email.value || '',
      password: this.form.controls.password.value || ''
    }

    if(this.form.invalid) return

    this.authService.login(data)
      .pipe(
        catchError((error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hubo un error',
            detail: error.error.error,
          })
          return error
        })
      )
      .subscribe((resp) => {
        this.router.navigateByUrl('/courses')
      })

  }



}
