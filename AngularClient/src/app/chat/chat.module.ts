import {NgModule} from '@angular/core';
import {CoreModule} from "../core/modules/core.module";

import {ChatListComponent} from './chat-list/chat-list.component';
import {MessageBubbleComponent} from './message-bubble/message-bubble.component';
import {ChatService} from "./chat.service";
import {ChatItemComponent} from './chat-item/chat-item.component';
import {ChatDetailComponent} from './chat-detail/chat-detail.component';

@NgModule({
  declarations: [ChatListComponent, MessageBubbleComponent, ChatItemComponent, ChatDetailComponent],
  exports: [
    ChatListComponent,
    ChatDetailComponent
  ],
  imports: [
    CoreModule
  ],
  providers: [ChatService]
})
export class ChatModule {
}
