import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { FormUtils } from '@utils/form-utils';
import { catchError } from 'rxjs';
import { ToastService } from 'ngx-toastr-notifier';

@Component({
  selector: 'app-new-account',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './new-account.component.html',
})
export class NewAccountComponent {

  private fb = inject(FormBuilder)
  private authService = inject(AuthService)
  private toastService = inject(ToastService);

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
        catchError((error) => {
          this.toastService.error(error.error.error)
          throw error.error.error
        })
      )
      .subscribe((resp) => {
        this.toastService.success("Cuenta creada correctamente")
      })
  }

}
