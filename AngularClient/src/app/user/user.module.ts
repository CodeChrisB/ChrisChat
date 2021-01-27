import {NgModule} from '@angular/core';
import {CoreModule} from "../core/modules/core.module";
import {UserListComponent} from './user-list/user-list.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {UserItemComponent} from './user-item/user-item.component';
import {UserService} from "./user.service";

@NgModule({
  declarations: [UserListComponent, UserProfileComponent, UserItemComponent],
  exports: [UserListComponent, UserProfileComponent, UserItemComponent],
  imports: [
    CoreModule
  ],
  providers: [UserService]
})
export class UserModule {
}
