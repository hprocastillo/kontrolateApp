import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Subject, takeUntil} from "rxjs";
import {Expense} from "../../../../../core/interfaces/expense";
import {OutService} from "../../../../../core/services/out.service";
import {ExpenseService} from "../../../../../core/services/expense.service";

@Component({
  selector: 'app-delete-out',
  templateUrl: './delete-out.component.html',
  styleUrls: ['./delete-out.component.scss']
})
export class DeleteOutComponent implements OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS
  @Input() outId: string | any;
  @Input() outDescription: string | any;

  //OUTPUTS
  @Output() delete = new EventEmitter<boolean>();

  constructor(
    public activeModal: NgbActiveModal,
    private outSvc: OutService,
    private expenseSvc: ExpenseService) {
  }

  getDelete(outId: string) {
    this.expenseSvc.getExpensesByOut(outId).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: Expense[]) => {
        let counter = 0;
        if (counter === 0) {
          if (res.length > 0) {
            for (let i: number = 0; i < res.length; i++) {
              this.expenseSvc.deleteExpense(res[i].id).then();
            }
          }
          counter++;
          this.outSvc.deleteOut(outId).then();
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
