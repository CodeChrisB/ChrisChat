import {Injectable} from '@angular/core';
import {UserHttpService} from "../core/services/http/user-http.service";
import {BehaviorSubject} from "rxjs";
import {UserModel} from "../core/models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users = new BehaviorSubject<Array<UserModel>>(null);
  active = new BehaviorSubject<UserModel>(null);

  constructor(private http: UserHttpService) {
  }

  getUsers() {
    this.http.getUsers().then(response =>{
      this.users.next(response)
      console.log(this.users)
    });
  }
}
