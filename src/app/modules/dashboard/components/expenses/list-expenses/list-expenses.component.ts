import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import firebase from "firebase";
import {Expense} from "../../../../../core/interfaces/expense";
import {Subject, takeUntil} from "rxjs";
import {ExpenseService} from "../../../../../core/services/expense.service";
import {OutService} from "../../../../../core/services/out.service";
import {Out} from "../../../../../core/interfaces/out";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ViewReceiptComponent} from "../../receipt/view-receipt/view-receipt.component";
import User = firebase.User;

@Component({
  selector: 'app-list-expenses',
  templateUrl: './list-expenses.component.html',
  styleUrls: ['./list-expenses.component.scss']
})
export class ListExpensesComponent implements OnInit, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Input() outId: string | any;
  @Output() expenseId = new EventEmitter<string>();

  //RESULTS
  listExpenses: Expense[] = [];

  constructor(
    private modalService: NgbModal,
    private expenseSvc: ExpenseService,
    private outSvc: OutService) {
  }

  ngOnInit(): void {
    if (this.outId) {
      this.expenseSvc.getExpensesByOutByUserId(this.outId, this.user.uid).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Expense[]) => {
          this.listExpenses = res;
        }
      );
    }
  }

  getDelete(expense: Expense) {
    if (confirm("Desea borrar el gasto: " + expense.description + " ?")) {
      let out = {} as Out;
      let counter = 0;
      this.outSvc.getOutById(this.outId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          out.amount = res.amount - expense.amount;
          if (counter === 0) {
            this.outSvc.updateOut(out, this.outId).then();
            counter++;
            this.expenseSvc.deleteExpense(expense.id).then();
          }
        }
      );
    }
  }

  getView(expense: Expense) {
    this.expenseId.emit(expense.id);
  }

  getReceipt(expense: Expense) {
    const modalRef = this.modalService.open(ViewReceiptComponent);
    modalRef.componentInstance.receiptUrl = expense.receiptUrl;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
