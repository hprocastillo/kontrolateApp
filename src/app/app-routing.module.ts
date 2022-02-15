import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'outs',
    loadChildren: () => import('./modules/outs/outs.module').then(m => m.OutsModule)
  },
  {
    path: 'incomes',
    loadChildren: () => import('./modules/incomes/incomes.module').then(m => m.IncomesModule)
  },
  {
    path: 'balance',
    loadChildren: () => import('./modules/balance/balance.module').then(m => m.BalanceModule)
  },
  {
    path: 'friends',
    loadChildren: () => import('./modules/friends/friends.module').then(m => m.FriendsModule)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
