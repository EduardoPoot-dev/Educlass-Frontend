import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { firstValueFrom } from 'rxjs';

export  const coursesGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  const isAuthenticated = await firstValueFrom(authService.authenticate())

  if(!isAuthenticated) {
    router.navigateByUrl('/auth/login')
    return false
  }

  return true;
}
