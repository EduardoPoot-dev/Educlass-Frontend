import { Route } from "@angular/router";
import { AuthComponent } from "./layout/auth/auth.component";
import { NewAccountComponent } from "./pages/new-account/new-account.component";
import { LoginComponent } from "./pages/login/login.component";


const routes: Route[] = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'new-account',
        component: NewAccountComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
]
export default routes
