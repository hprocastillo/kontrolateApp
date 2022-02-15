import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface Out {
  id?: string;
  ownerId: string;

  description: string;
  currentAmount: number;
  goalAmount: number;
  exceededAmount: number;
  status: boolean;
  shared: boolean;

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}

export interface Partner {
  id: string;
  outId: string;
  partnerId: string;

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}
