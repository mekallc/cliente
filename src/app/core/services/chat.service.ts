import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatBehavior$ = new BehaviorSubject<any>([]);
  chat$ = this.chatBehavior$.asObservable();
  constructor(private socket: Socket) {
    socket.fromEvent('new_message').subscribe((message: any) => {
      this.setChat(message);
    });
  }

  public setChat(message: any): void {
    const current = this.chatBehavior$.getValue();
    const state = [...current, message];
    this.chatBehavior$.next(state);
  }

  //TODO Enviar mensaje desde el FRONT-> BACKEND
  sendMessage(payload: { message: string; room: string }) {
    const item: any = payload;
    item.type = 'USER';
    this.socket.emit('event_message', item); //TODO FRONT
  }

  joinRoom(room: string): void {
    this.socket.emit('event_join', room);
  }

  leaveRoom(room: string): void {
    this.socket.emit('event_leave', room);
  }

  getMessage() {
    return this.socket.fromEvent('message');
  }

  // SERVICE
  joinService(room: string): void {
    this.socket.emit('event_join', `service-${room}`);
  }

  sendStatusService(payload: { message: string; room: string }) {
    const item: any = payload;
    this.socket.emit('event_message', item); //TODO FRONT
  }


  leaveService(room: string): void {
    this.socket.emit('event_leave', room);
  }

  getService() {
    return this.socket.fromEvent('event_message');
  }
}
