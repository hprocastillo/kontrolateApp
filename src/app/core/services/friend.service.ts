import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs";
import {Friend} from "../interfaces/friend";

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  friendCollection: AngularFirestoreCollection<Friend>;

  constructor(private readonly afs: AngularFirestore) {
    this.friendCollection = afs.collection<Friend>('friends');
  }

  getFriends() {
    return this.friendCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Friend;
      const id = a.payload.doc.id;
      return {id, ...data};
    })));
  }

  getFriendsByUserId(userId: string) {
    return this.afs.collection<Friend>('friends', ref => ref
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Friend;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getFriendById(id: string) {
    return this.afs.collection<Friend>('friends').doc(id).valueChanges();
  }

  saveFriend(friend: Friend, friendId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = friendId || this.afs.createId();
        const data = {id, ...friend};
        const result = await this.friendCollection.doc(id).set(data);
        resolve(result);
      } catch (error) {
        reject();
      }
    });
  }

  updateFriend(friend: Friend, friendId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = friendId;
        const data = {id, ...friend};
        const result = await this.friendCollection.doc(id).update(data);
        resolve(result);
      } catch (error) {
        reject();
      }
    });
  }

  deleteFriend(friendId: string | any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.friendCollection.doc(friendId).delete();
        resolve(result);
      } catch (error) {
        reject();
      }
    });
  }
}
