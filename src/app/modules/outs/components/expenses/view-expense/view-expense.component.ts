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
  @Input() user = {} as User;
  @Input() outId: string | any;
  @Input() expenseId: string | any;
  @Output() backToOut = new EventEmitter<string>();

  //RESULTS
  expense = {} as Expense;
  listExpenses: Expense[] = [];
  out = {} as Out;

  //VARIABLES
  today = new Date();
  editForm: boolean = false;
  public imagePreview: string | any;
  public file: string | any;
  public basePath: string = '/images';
  public filePath: string | any;
  public uploadPercent: Observable<number> | undefined;
  public downloadURL: string = '';
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();
  private task: AngularFireUploadTask | undefined;

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

  showExpenseForm() {
    this.editForm = true;
  }

  hideExpenseForm() {
    this.editForm = false;
  }

  getBackToOut(event: string) {
    if (event) {
      this.backToOut.emit(event);
    }
  }

  async getPreview(event: any) {
    this.file = event.target.files[0];
    this.filePath = `${this.basePath}/${this.file.name}`;
    let reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(this.file);
    this.task = this.storage.upload(this.filePath, this.file);
    // @ts-ignore
    this.uploadPercent = this.task.percentageChanges();
    (await this.task).ref.getDownloadURL().then(url => {
      this.downloadURL = url;

    });
  }


  getUpload(expenseId: string) {
    if (confirm("Desea subir la foto del recibo?")) {
      this.expense.receiptURL = this.downloadURL;
      // @ts-ignore
      this.expense.updatedAt = this.today;
      this.expenseSvc.updateExpense(this.expense, expenseId).then();
    }
  }

  getEdit(expenseId: string, out: Out) {
    if (confirm("Desea guardar cambios?")) {
      // @ts-ignore
      this.expense.updatedAt = this.today;
      this.expenseSvc.updateExpense(this.expense, expenseId).then();

      let total = 0;
      for (let i: number = 0; i < this.listExpenses.length; i++) {
        if (this.listExpenses[i].id !== this.expenseId) {
          total = total + this.listExpenses[i].amount;
        }
      }
      out.currentAmount = total + this.expense.amount;
      this.outSvc.updateOut(out, this.outId).then();
      this.backToOut.emit(this.outId);
      this.hideExpenseForm();
    }
  }

  getDeleteReceipt(expenseId: string) {
    if (confirm("Desea borrar la foto del recibo?")) {
      this.expense.receiptURL = '';
      // @ts-ignore
      this.expense.updatedAt = this.today;
      this.expenseSvc.updateExpense(this.expense, expenseId).then();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
