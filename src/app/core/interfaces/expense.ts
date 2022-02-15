import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface Expense {
  id?: string;
  outId: string;

  description: string;
  amount: number;
  receiptURL: string;
  status: boolean;

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}
