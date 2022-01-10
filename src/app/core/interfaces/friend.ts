import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface Friend {
  id?: string;
  name: string;
  email: string;
  avatarUrl: string;

  userId: string;
  userDisplayName: string;
  userEmail: string;
  userPhotoUrl: string;

  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface FriendRequest {
  id?: string;
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
