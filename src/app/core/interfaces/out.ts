import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface Out {
  id?: string;
  description: string;
  amount: number;
  amountGoal: number;
  status: boolean;

  userId: string;
  userDisplayName: string;
  userEmail: string;
  userPhotoUrl: string;

  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface OutShare {
  id?: string;
  outId: string;
  status: boolean;

  guessId: string;
  guessDisplayName: string;
  guessEmail: string;
  guessPhotoUrl: string;

  userId: string;
  userDisplayName: string;
  userEmail: string;
  userPhotoUrl: string;

  createdAt: Timestamp;
  updatedAt: Timestamp;
}


export interface OutRequest {
  id?: string;
  outId: string;
  message: string;
  status: boolean;

  guessId: string;
  guessDisplayName: string;
  guessEmail: string;
  guessPhotoUrl: string;

  userId: string;
  userDisplayName: string;
  userEmail: string;
  userPhotoUrl: string;

  createdAt: Timestamp;
  updatedAt: Timestamp;
}
