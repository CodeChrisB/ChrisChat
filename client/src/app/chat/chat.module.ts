import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../shared/material/material.module';

import { ChatComponent } from './chat.component';
import { SocketService } from './shared/services/socket.service';
import { DialogUserComponent } from './dialog-user/dialog-user.component';
import { StoreUserService } from './shared/services/store-user.service';
import { DialogImageComponent } from './dialog-image/dialog-image.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [ChatComponent, DialogUserComponent,DialogImageComponent],
  providers: [SocketService,StoreUserService],
  entryComponents: [DialogUserComponent]
})
export class ChatModule { }
