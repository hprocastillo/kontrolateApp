import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginGuard} from "../../core/guards/login.guard";
import {AuthComponent} from "./components/auth/auth.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [LoginGuard],
    children: [
      {path: 'auth', component: AuthComponent},
      {path: '**', redirectTo: 'auth'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
