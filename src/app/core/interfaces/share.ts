import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface ShareOut {
  id: string;
  outId: string
  addresseeId: string;
  sharerId: string;

  message: string;
  status: boolean;

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}
