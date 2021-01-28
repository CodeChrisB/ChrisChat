import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {ChatService} from "../chat.service";
import {MessageControlService} from "../../core/services/message-control.service";
import {ChatModel} from "../../core/models/chat";

@Component({
  selector: 'emoji-picker',
  templateUrl: './chat-emoji.component.html',
  styleUrls: ['./chat-emoji.component.scss']
})
export class ChatDetailComponent implements OnInit, OnDestroy {
  @ViewChild("scrollable") scrollable;
  subscription: Subscription;
  chat: ChatModel;
  sending: boolean = false;

  constructor(private service: ChatService, private control: MessageControlService) {
  }

  ngOnInit() {

  }

  scrollToBottom() {

  }

  saveMessage($event) {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  emojiPickerDialog(){

  }
}
