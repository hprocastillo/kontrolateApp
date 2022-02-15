import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface RequestFriendship {
  id: string;
  message: string;
  status: boolean;

  addresseeId: string;
  requesterId: string;

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}
