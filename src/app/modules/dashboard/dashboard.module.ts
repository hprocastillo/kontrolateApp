import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { IncomesComponent } from './components/incomes/incomes.component';
import { OutsComponent } from './components/outs/outs.component';
import { EditExpenseComponent } from './components/expenses/edit-expense/edit-expense.component';
import { ListExpensesComponent } from './components/expenses/list-expenses/list-expenses.component';
import { NewExpenseComponent } from './components/expenses/new-expense/new-expense.component';
import { ViewExpenseComponent } from './components/expenses/view-expense/view-expense.component';
import { ListOutsComponent } from './components/outs/list-outs/list-outs.component';
import { NewOutComponent } from './components/outs/new-out/new-out.component';
import { ViewOutComponent } from './components/outs/view-out/view-out.component';
import {NgbNavModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ViewReceiptComponent } from './components/receipt/view-receipt/view-receipt.component';
import { ListOutsViewComponent } from './components/outs/list-outs/list-outs-view/list-outs-view.component';
import { DeleteOutComponent } from './components/outs/delete-out/delete-out.component';
import { EditOutComponent } from './components/outs/edit-out/edit-out.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ExpensesComponent,
    IncomesComponent,
    OutsComponent,
    EditExpenseComponent,
    ListExpensesComponent,
    NewExpenseComponent,
    ViewExpenseComponent,
    ListOutsComponent,
    NewOutComponent,
    ViewOutComponent,
    ViewReceiptComponent,
    ListOutsViewComponent,
    DeleteOutComponent,
    EditOutComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        NgbNavModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class DashboardModule { }
