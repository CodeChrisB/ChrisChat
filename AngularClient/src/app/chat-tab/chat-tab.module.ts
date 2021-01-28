import {NgModule} from '@angular/core';
import {CoreModule} from "../core/modules/core.module";
import {ChatModule} from "../chat/chat.module";
import {UserModule} from "../user/user.module";
import {ChatTabComponent} from './chat-tab/chat-tab.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ChatTabComponent],
  imports: [
    CoreModule,
    ChatModule,
    UserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ChatTabComponent
  ]
})
export class ChatTabModule {
}

