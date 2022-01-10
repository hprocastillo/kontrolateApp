import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface Expense {
  id?: string;
  outId: string;
  description: string;
  amount: number;
  receiptUrl: string;
  status: boolean;

  userId: string;
  userDisplayName: string;
  userEmail: string;
  userPhotoUrl: string;

  createdAt: Timestamp;
  updatedAt: Timestamp;
}
