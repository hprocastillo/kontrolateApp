import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../../core/guards/auth.guard";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ViewOutComponent} from "./components/outs/view-out/view-out.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {path: 'dashboard', component: DashboardComponent},

      //Outs
      {path: 'out/view/:id/:userId/:userDisplayName/:userEmail/:userPhotoUrl', component: ViewOutComponent},

      {path: '**', redirectTo: 'dashboard'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
