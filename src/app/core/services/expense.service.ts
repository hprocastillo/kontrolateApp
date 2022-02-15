import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Expense} from "../interfaces/expense";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  expenseCollection: AngularFirestoreCollection<Expense>;

  constructor(private readonly afs: AngularFirestore) {
    this.expenseCollection = afs.collection<Expense>('expenses');
  }

  getExpensesByOut(outId: string) {
    return this.afs.collection<Expense>('expenses', ref => ref
      .where('outId', '==', outId)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Expense;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getExpenseById(id: string) {
    return this.afs.collection<Expense>('expenses').doc(id).valueChanges();
  }

  saveExpense(expense: Expense, expenseId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = expenseId || this.afs.createId();
        const data = {id, ...expense};
        const result = await this.expenseCollection.doc(id).set(data);
        resolve(result);
      } catch (error) {
        reject();
      }
    });
  }

  updateExpense(expense: Expense, expenseId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = expenseId;
        const data = {id, ...expense};
        const result = await this.expenseCollection.doc(id).update(data);
        resolve(result);
      } catch (error) {
        reject();
      }
    });
  }

  deleteExpense(expenseId: string | any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.expenseCollection.doc(expenseId).delete();
        resolve(result);
      } catch (error) {
        reject();
      }
    });
  }
}
