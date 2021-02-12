import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';
import { Message } from '../model/message';
import { Event } from '../model/event';

import * as socketIo from 'socket.io-client';
import { Action } from '../model/action';

const SERVER_URL = 'http://localhost:8080';

@Injectable()
export class SocketService {
    private socket;

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    public send(message: Message): void {
      message.time =this.getTimeString();
        this.socket.emit('message', message);
    }

    public sendMedia(message:Message):void{
      message.time =this.getTimeString();
      message.action = Action.MEDIA;
      this.socket.emit('message', message);
    }

    public onMessage(): Observable<Message> {
        return new Observable<Message>(observer => {
            this.socket.on('message', (data: Message) => observer.next(data));
        });
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }

    private getTimeString():string{
      var d = new Date();
      var n = d.toLocaleTimeString();
      n = n.substring(0,n.length-3)
      return n;
    }
}
