import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {UserModel} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserHttpService extends HttpService {
  getUsers(): Promise<Array<UserModel>> {


    return this.get("users.json");
  }
}
