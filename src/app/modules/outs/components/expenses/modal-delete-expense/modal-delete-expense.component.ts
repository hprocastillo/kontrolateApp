import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {OutService} from "../../../../../core/services/out.service";
import {ExpenseService} from "../../../../../core/services/expense.service";
import {Out} from "../../../../../core/interfaces/out";

@Component({
  selector: 'app-modal-delete-expense',
  templateUrl: './modal-delete-expense.component.html',
  styleUrls: ['./modal-delete-expense.component.scss']
})
export class ModalDeleteExpenseComponent implements OnDestroy {

  @Input() outId: string | any;
  @Input() expenseId: string | any;
  @Input() description: string | any;
  @Input() amount: number | any;
  @Output() delete = new EventEmitter<boolean>();

  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  constructor(
    public activeModal: NgbActiveModal,
    private outSvc: OutService,
    private expenseSvc: ExpenseService) {
  }

  deleteExpense(outId: string, expenseId: string, amount: number) {
    let out = {} as Out;
    let counter = 0;

    this.outSvc.getOutById(this.outId).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: any) => {
        out.currentAmount = res.currentAmount - amount;

        if (counter === 0) {
          this.outSvc.updateOut(out, this.outId).then();
          counter++;
          this.expenseSvc.deleteExpense(expenseId).then();
          this.delete.emit(true);
          this.activeModal.close();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
