import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import firebase from "firebase";
import {Expense} from "../../../../../core/interfaces/expense";
import {Out} from "../../../../../core/interfaces/out";
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/storage";
import {Observable, Subject, takeUntil} from "rxjs";
import {OutService} from "../../../../../core/services/out.service";
import {ExpenseService} from "../../../../../core/services/expense.service";
import User = firebase.User;

@Component({
  selector: 'app-view-expense',
  templateUrl: './view-expense.component.html',
  styleUrls: ['./view-expense.component.scss']
})
export class ViewExpenseComponent implements OnInit, OnDestroy {
  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Input() outId: string | any;
  @Input() expenseId: string | any;
  @Output() btnBack = new EventEmitter<string>();

  //RESULTS
  listExpenses: Expense[] = [];
  expense = {} as Expense;
  out = {} as Out;

  //VARIABLES
  today = new Date();
  downloadURL: string = '';
  imagePreviewURL: string | any;
  basePath: string = '/images';
  file: string | any;
  filePath: string | any;
  task: AngularFireUploadTask | undefined;
  uploadPercent: Observable<number> | undefined;
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  constructor(
    private outSvc: OutService,
    private expenseSvc: ExpenseService,
    private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    //GET EXPENSE
    if (this.expenseId) {
      this.expenseSvc.getExpenseById(this.expenseId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.expense = res;
        }
      );
    }
    if (this.outId) {
      //GET OUT
      this.outSvc.getOutById(this.outId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.out = res;
        }
      );
      //GET EXPENSES BY OUT
      this.expenseSvc.getExpensesByOut(this.outId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Expense[]) => {
          this.listExpenses = res;
        }
      );
    }
  }

  getBack(event: string) {
    if (event) {
      this.btnBack.emit(event);
    }
  }

  async getPhoto(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      this.filePath = `${this.basePath}/${this.file.name}`;
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        // @ts-ignore
        this.imagePreviewURL = event.target.result;
      }
      this.task = this.storage.upload(this.filePath, this.file);
      // @ts-ignore
      this.uploadPercent = this.task.percentageChanges();

      (await this.task).ref.getDownloadURL().then(url => {
        this.downloadURL = url;
      });
    }
  }

  getSave(expenseId: string, out: Out) {
    if (confirm("Desea guardar cambios?")) {
      this.expense.receiptUrl = this.downloadURL;
      // @ts-ignore
      this.expense.updatedAt = this.today;
      this.expenseSvc.updateExpense(this.expense, expenseId).then();

      let total = 0;
      for (let i: number = 0; i < this.listExpenses.length; i++) {
        if (this.listExpenses[i].id !== this.expenseId) {
          total = total + this.listExpenses[i].amount;
        }
      }
      out.amount = total + this.expense.amount;
      this.outSvc.updateOut(out, this.outId).then();
      this.btnBack.emit(this.outId);
    }
  }

  getBtnSave(event: any) {
    if (event === true) {
      this.getSave(this.expenseId, this.out);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
