import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbNavModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OutsRoutingModule} from './outs-routing.module';

//Components
import {OutsComponent} from "./components/outs/outs.component";
import {ListExpensesComponent} from "./components/expenses/list-expenses/list-expenses.component";
import {NewExpenseComponent} from "./components/expenses/new-expense/new-expense.component";
import {ViewExpenseComponent} from "./components/expenses/view-expense/view-expense.component";
import {ListOutsComponent} from "./components/outs/list-outs/list-outs.component";
import {NewOutComponent} from "./components/outs/new-out/new-out.component";
import {ViewOutComponent} from "./components/outs/view-out/view-out.component";
import {ListOutsItemComponent} from "./components/outs/list-outs/list-outs-item/list-outs-item.component";
import {
  ListExpensesItemComponent
} from "./components/expenses/list-expenses/list-expenses-item/list-expenses-item.component";
import {ModalDeleteExpenseComponent} from './components/expenses/modal-delete-expense/modal-delete-expense.component';
import {ModalDeleteOutComponent} from './components/outs/modal-delete-out/modal-delete-out.component';

@NgModule({
  declarations: [
    OutsComponent,
    ListExpensesComponent,
    NewExpenseComponent,
    ViewExpenseComponent,
    ListOutsComponent,
    NewOutComponent,
    ViewOutComponent,
    ListOutsItemComponent,
    ListExpensesItemComponent,
    ModalDeleteExpenseComponent,
    ModalDeleteOutComponent,
  ],
  imports: [
    CommonModule,
    OutsRoutingModule,
    NgbNavModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class OutsModule {
}
