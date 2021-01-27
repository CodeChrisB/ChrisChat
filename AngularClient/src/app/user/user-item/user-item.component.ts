import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserModel} from "../../core/models/user";
import {UserService} from "../user.service";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent {
  @Output() openSidebar: EventEmitter<string> = new EventEmitter();
  @Input() user: UserModel;

  constructor(private service: UserService) {
  }

  showProfile() {
    this.service.active.next(this.user);
    this.openSidebar.emit(this.user.name);
  }
}
