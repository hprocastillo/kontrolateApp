import {Component, Input, OnDestroy} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {OutService} from "../../../../../core/services/out.service";
import {ExpenseService} from "../../../../../core/services/expense.service";
import {Expense} from "../../../../../core/interfaces/expense";

@Component({
  selector: 'app-modal-delete-out',
  templateUrl: './modal-delete-out.component.html',
  styleUrls: ['./modal-delete-out.component.scss']
})
export class ModalDeleteOutComponent implements OnDestroy {

  @Input() id: string | any;
  @Input() description: string | any;

  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

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
