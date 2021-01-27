import {NgModule} from '@angular/core';
import {CoreModule} from "../core/modules/core.module";
import {ChatModule} from "../chat/chat.module";
import {UserModule} from "../user/user.module";
import {ChatTabComponent} from './chat-tab/chat-tab.component';

@NgModule({
  declarations: [ChatTabComponent],
  imports: [
    CoreModule,
    ChatModule,
    UserModule,
  ],
  exports: [
    ChatTabComponent
  ]
})
export class ChatTabModule {
}

