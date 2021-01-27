import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {UserModel} from "../../core/models/user";
import {Subscription} from "rxjs";
import {UserService} from "../user.service";
import {ChatService} from "../../chat/chat.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  @Output() openChatWindow: EventEmitter<any> = new EventEmitter();
  user: UserModel;
  subscription: Subscription;

  constructor(private service: UserService, private messageService: ChatService) {
  }

  openNewChat() {
    this.messageService.createChat(this.user);
    this.openChatWindow.emit(this.user.username);
  }

  ngOnInit() {
    this.subscription = this.service.active.subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
