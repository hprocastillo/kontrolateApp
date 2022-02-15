import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface Friend {
  id: string;
  addresseeId: string;
  requesterId: string;

  status: boolean;

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}
