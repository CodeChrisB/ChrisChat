import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserModel} from "../../core/models/user";
import {UserService} from "../user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Output("openUserSidebar") openSidebar: EventEmitter<string> = new EventEmitter();
  data: Array<UserModel> = [];

  constructor(private service: UserService) {
    this.service.getUsers();
  }

  ngOnInit() {
    this.service.users.subscribe(users => this.data = users);
  }
}
