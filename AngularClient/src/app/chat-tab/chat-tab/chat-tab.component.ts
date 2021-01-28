import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatSidenav} from "@angular/material";

@Component({
  selector: 'app-chat-tab',
  templateUrl: './chat-tab.component.html',
  styleUrls: ['./chat-tab.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChatTabComponent {

  @ViewChild("chatSidebar") chatSidebar: MatSidenav;
  @ViewChild("userSidebar") userSidebar: MatSidenav;
  sidebarTitles = {
    user: "",
    chat: ""
  };
  open = {
    me: this,
    userSideBar: function (title: string = "") {
      this.me.userSidebar.open();
      this.me.sidebarTitles.user = title;
    },
    chatSideBar: function (title: string = "") {
      this.me.chatSidebar.open();
      this.me.userSidebar.close();
      this.me.sidebarTitles.chat = title;
    }
  };
}
