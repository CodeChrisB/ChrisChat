import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {ChatService} from "../chat.service";
import {MessageControlService} from "../../core/services/message-control.service";
import {ChatModel} from "../../core/models/chat";
import { PickerModule } from '@ctrl/ngx-emoji-mart';
@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss']
})
export class ChatDetailComponent implements OnInit, OnDestroy {
  @ViewChild("scrollable", {static: false}) scrollable;
  subscription: Subscription;
  chat: ChatModel;
  sending: boolean = false;
  showEmoji:boolean = false;
  text:string;
  emojis:string[] = ["😀", "😃", "😄", "😁", "😆" ,"😅", "😂" ]


  constructor(private service: ChatService, private control: MessageControlService,) {}

  ngOnInit() {
    this.subscription = this.service.chat.subscribe(messages => {
      this.chat = messages;
      this.sending = false;
      this.scrollToBottom();
    });
  }

  scrollToBottom() {
    setTimeout(() => {
      this.scrollable.nativeElement.scrollTop = this.scrollable.nativeElement.scrollHeight;
    }, 100);
  }

  saveMessage($event) {
    const value = $event.target.value;
    if ($event.key == "Enter" && this.control.isSendable(value)) {
      this.scrollToBottom();
      this.service.saveMessage(this.chat.id, value);
      this.sending = true;
      $event.target.value = "";
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  emojiPickerDialog(){

  }

  addToText(emoji:string,$event){

    $event.target.value +=emoji
  }

  animal: string;
  name: string;


  openDialog(): void {

  }
}
