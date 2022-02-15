import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ExpenseService} from "../../../../../../core/services/expense.service";
import {Subject, takeUntil} from "rxjs";
import {Expense} from "../../../../../../core/interfaces/expense";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalDeleteExpenseComponent} from "../../modal-delete-expense/modal-delete-expense.component";

@Component({
  selector: 'app-list-expenses-item',
  templateUrl: './list-expenses-item.component.html',
  styleUrls: ['./list-expenses-item.component.scss']
})
export class ListExpensesItemComponent implements OnInit, OnDestroy {

  @Input() expenseId: string | any;
  @Output() selectedExpenseId = new EventEmitter<string>();

  //RESULTS
  expense = {} as Expense;

  //VARIABLES
  toolbar: boolean = false;

  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  constructor(
    private modalService: NgbModal,
    private expenseSvc: ExpenseService) {
  }

  ngOnInit(): void {
    //Get expense by ID
    if (this.expenseId) {
      this.expenseSvc.getExpenseById(this.expenseId)
        .pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
        (res: any) => {
          this.expense = res;
        }
      );
    }
  }

  showToolbar() {
    this.toolbar = !this.toolbar;
  }

  getModalDelete(expense: Expense, expenseId: string) {
    const modalRef = this.modalService.open(ModalDeleteExpenseComponent, {centered: true});
    modalRef.componentInstance.expenseId = expenseId;
    modalRef.componentInstance.outId = expense.outId;
    modalRef.componentInstance.description = expense.description;
    modalRef.componentInstance.amount = expense.amount;
  }

  selectExpense(id: string) {
    this.selectedExpenseId.emit(id);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
