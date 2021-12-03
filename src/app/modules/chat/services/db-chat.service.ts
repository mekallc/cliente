import { Injectable } from '@angular/core';

import { Room } from './interfaces';
import { Observable } from 'rxjs';
import { collection, Firestore, collectionData, addDoc, doc, setDoc, docData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DbChatService {

  constructor(
    private fs: Firestore
  ) { }

  addRoom(id: string, room: any) {
    const notesRef = collection(this.fs, 'rooms');
    return setDoc(doc(notesRef, id), room);
  }

  getRoomById(id: string) {
    const notesRef = doc(this.fs, `rooms/${id}`);
    return docData(notesRef, { idField: id }) as Observable<Room>;
  }

  getRooms(): Observable<Room[]> {
    const notesRef = collection(this.fs, 'rooms');
    return collectionData(notesRef, { idField: 'id'}) as Observable<Room[]>;
  }

  createMessage(id, mesg: any) {
    const roomRef = doc(this.fs, `rooms/${id}`);
    const message = collection(roomRef, 'messages');
    return addDoc(message, mesg);
  }
}


