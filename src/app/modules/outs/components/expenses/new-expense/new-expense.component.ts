import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import firebase from "firebase";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {OutService} from "../../../../../core/services/out.service";
import {ExpenseService} from "../../../../../core/services/expense.service";
import {Out} from "../../../../../core/interfaces/out";
import User = firebase.User;

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.scss']
})
export class NewExpenseComponent implements OnDestroy {
  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Input() outId: string | any;
  @Output() btnBack = new EventEmitter<boolean>();
  //FORM
  newForm: FormGroup;
  //VARIABLES
  today = new Date();
  //PAGES
  pageDefault = true;
  pageForm = false;
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  constructor(private fb: FormBuilder, private outSvc: OutService, private expenseSvc: ExpenseService) {
    this.newForm = this.fb.group({
      description: ['', [Validators.required]],
      amount: ['', [Validators.required]],
    });
  }

  showForm() {
    this.pageDefault = false;
    this.pageForm = true;
  }

  saveExpense(user: User, outId: string) {
    if (this.newForm.valid) {
      const expense = this.newForm.value;
      const expenseId = expense?.id || null;
      expense.outId = outId;
      expense.status = true;
      expense.createdBy = user.uid;
      expense.createdAt = this.today;
      this.expenseSvc.saveExpense(expense, expenseId).then();

      let out = {} as Out;
      let counter = 0;
      this.outSvc.getOutById(this.outId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          if (isNaN(res.amount)) {
            res.amount = 0;
            out.currentAmount = res.currentAmount + expense.amount;
            if (counter === 0) {
              this.outSvc.updateOut(out, this.outId).then();
              counter++;
            }
          } else {
            out.currentAmount = res.currentAmount + expense.amount;
            if (counter === 0) {
              this.outSvc.updateOut(out, this.outId).then();
              counter++;
            }
          }

        }
      );

      this.newForm.reset();
      this.getCancel();
    }
  }

  getBack() {
    this.btnBack.emit(true);
  }

  getCancel() {
    this.pageDefault = true;
    this.pageForm = false;
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
