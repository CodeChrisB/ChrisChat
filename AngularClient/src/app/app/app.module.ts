import { NgModule } from '@angular/core';
import { AppComponent } from './app/app.component';
import {CoreModule} from "../core/modules/core.module";
import {ChatTabModule} from "../chat-tab/chat-tab.module";
import {UserModule} from "../user/user.module";
import {AppRoutingModule} from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    ChatTabModule,
    UserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }
