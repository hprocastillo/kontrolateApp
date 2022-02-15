import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import firebase from "firebase";
import {Expense} from "../../../../../core/interfaces/expense";
import {Subject, takeUntil} from "rxjs";
import {ExpenseService} from "../../../../../core/services/expense.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import User = firebase.User;

@Component({
  selector: 'app-list-expenses',
  templateUrl: './list-expenses.component.html',
  styleUrls: ['./list-expenses.component.scss']
})
export class ListExpensesComponent implements OnInit, OnDestroy {
  @Input() user = {} as User;
  @Input() outId: string | any;
  @Output() selectedExpenseId = new EventEmitter<string>();

  //RESULTS
  listExpenses: Expense[] = [];

  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  constructor(
    private modalService: NgbModal,
    private expenseSvc: ExpenseService) {
  }

  ngOnInit(): void {
    //Get expenses list by Out ID
    if (this.outId) {
      this.expenseSvc.getExpensesByOut(this.outId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Expense[]) => {
          this.listExpenses = res;
        }
      );
    }
  }

  getSelectedExpenseId(event: string) {
    if (event) {
      this.selectedExpenseId.emit(event);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
