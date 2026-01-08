import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { AlertComponent } from '@shared/alert/alert.component';
import { FormUtils } from '@utils/form-utils';
import { catchError } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-account',
  imports: [RouterLink, ReactiveFormsModule, InputTextModule],
  templateUrl: './new-account.component.html',
})
export class NewAccountComponent {

  private fb = inject(FormBuilder)
  private authService = inject(AuthService)
  private messageService = inject(MessageService)

  formUtils = FormUtils

  form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(this.formUtils.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: [''],
  }, {
    validators: [
      this.formUtils.equalValidator('password', 'confirmPassword')
    ]
  }
  )

  onSubmit() {
    this.form.markAllAsTouched()

    if (this.form.invalid) return

    const data = {
      name: this.form.controls.name.value || '',
      email: this.form.controls.email.value || '',
      password: this.form.controls.password.value || ''
    }

    this.authService.createAccount(data)
      .pipe(
        catchError((err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hubo un error',
            detail: err.error.error,
          })
          throw err.error.error
        })
      )
      .subscribe((resp) => {
        this.messageService.add({
            severity: 'success',
            summary: 'Acción realizada con exito',
            detail: String(resp),
          })
          this.form.reset()
      })
  }

}
