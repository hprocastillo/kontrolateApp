import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Out} from "../interfaces/out";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OutService {

  outCollection: AngularFirestoreCollection<Out>;

  constructor(private readonly afs: AngularFirestore) {
    this.outCollection = afs.collection<Out>('outs');
  }

  getOutsByOwnerId(ownerId: string) {
    return this.afs.collection<Out>('outs', ref => ref
      .where('ownerId', '==', ownerId)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Out;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }


  getOutById(id: string) {
    return this.afs.collection<Out>('outs').doc(id).valueChanges();
  }

  saveOut(out: Out, outId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = outId || this.afs.createId();
        const data = {id, ...out};
        const result = await this.outCollection.doc(id).set(data);
        resolve(result);
      } catch (error) {
        reject();
      }
    });
  }

  updateOut(out: Out, outId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = outId;
        const data = {id, ...out};
        const result = await this.outCollection.doc(id).update(data);
        resolve(result);
      } catch (error) {
        reject();
      }
    });
  }

  deleteOut(outId: string | any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.outCollection.doc(outId).delete();
        resolve(result);
      } catch (error) {
        reject();
      }
    });
  }
}
