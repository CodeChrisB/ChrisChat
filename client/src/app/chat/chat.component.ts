import { Component, OnInit, ViewChildren, ViewChild, AfterViewInit, QueryList, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatList, MatListItem } from '@angular/material/list';

import { Action } from './shared/model/action';
import { Event } from './shared/model/event';
import { Message } from './shared/model/message';
import { User } from './shared/model/user';
import { SocketService } from './shared/services/socket.service';
import { DialogUserComponent } from './dialog-user/dialog-user.component';
import { DialogUserType } from './dialog-user/dialog-user-type';

import { StoreUserService } from './shared/services/store-user.service';
import { DialogImageComponent } from './dialog-image/dialog-image.component';
import { DialogCanvasComponent } from './dialog-canvas/dialog-user.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PdfMake } from 'src/service/pdf/pdfMake';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  action = Action;
  user: User;
  messages: Message[] = [];
  messageContent: string="";
  ioConnection: any;
  storedUserName: string;
  dialogRef: MatDialogRef<any> | null;
  defaultDialogUserParams: any = {
    disableClose: true,
    data: {
      title: 'Welcome',
      title_pt: 'Bem-vindo',
      dialogType: DialogUserType.NEW
    }
  };

  //I got all the emojis from https://getemoji.com/ putting them all in a array took way to long...
  emojis:string[] = [
    "😂","😝","😁","😱","😍","😉","😡","👿","😓","😳","😘","😜","😵","👶","👸","💩", //Faces
    "👉","🙌","🙏","👋","💪","👌","✌","👊","🖕",//Hand
    "💝","💙","❤","💛","💚","💘","💜",//Hearts
    "🐵","🐮","🐩","🐎","🐻","🐶","🐬","🐟","🐫","🐰","🐷","🐍",//Animals
    //Random
    "🍻","🔥","🌈","☀","🎈","🌹","💄","🎀","⚽","🎾",
    "🏁","🍀","👀","🚗","🍎"
    ,"🍸","🔑","💖","🌟","🎉","🌺","🎶","👠","🏈","⚾","🏆","👽","💀",
   "💣","👃","👂","🍓","💋",
    "🚽","💃","💎","🚀","🌙","🎁","⛄","🌊","⛵","🏀","🎱","💰",
    "🔫","👄","🚲","🍉","👨‍💻","👩‍💻","🤵‍","💯","🏳️‍🌈","⚽️", "🏀", "🏈","⚾️",
    "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🪀", "🏓", "🏸", "🏒", "🏑", "🥍", "🏏","🥅", "⛳️", "🪁", "🏹",
    "🎣", "🤿", "🥊", "🥋", "🎽", "🛹","💸", "💵", "💴", "💶", "💷", "⌛️", "⏳","🔫","🩹","📊", "📈", "📉",
    "🧺", "🧻", "🚽", "🚰", "🚿","🛁", "🛀", "🧼","⚱️", "🏺", "🔮", "📿", "🧿"
  ]
  showEmojiKeyboard=false;

  // getting a reference to the overall list, which is the parent container of the list items
  @ViewChild(MatList, { read: ElementRef, static: true }) matList: ElementRef;

  // getting a reference to the items/messages within the list
  @ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

  constructor(private socketService: SocketService,
    private storedUser: StoreUserService,
    public dialog: MatDialog,
    private sanitizer:DomSanitizer,
    private _snackBar: MatSnackBar) {
    }







  ngOnInit(): void {
    this.initModel();
    setTimeout(() => {
      this.openUserPopup(this.defaultDialogUserParams);
    }, 0);
  }

  ngAfterViewInit(): void {
    // subscribing to any changes in the list of items / messages
    this.matListItems.changes.subscribe(elements => {
      this.scrollToBottom();
    });
  }

  private scrollToBottom(): void {
    try {
      this.matList.nativeElement.scrollTop = this.matList.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  private initModel(): void {
    const randomId = this.getRandomId();
    this.user = {
      id: randomId,
      avatar: "" //maybe make it possible to input url to image
    };
  }



  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        this.messages.push(message);
      });


    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });

    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }

  private getRandomId(): number {
    return Math.floor(Math.random() * (1000000)) + 1;
  }

  public onClickUserInfo() {
    this.openUserPopup({
      data: {
        username: this.user.name,
        title: 'Edit Details',
        title_pt: 'Alterar',
        dialogType: DialogUserType.EDIT
      }
    });
  }

  private openUserPopup(params): void {
    this.dialogRef = this.dialog.open(DialogUserComponent, params);
    this.dialogRef.afterClosed().subscribe(paramsDialog => {
      if (!paramsDialog) {
        return;
      }
      this.storedUserName = this.storedUser.getStoredUser();

      this.user.name = paramsDialog.username;

      if (paramsDialog.dialogType === DialogUserType.NEW) {
        this.storedUser.storeUser(this.user.name);
        this.initIoConnection();
        this.sendNotification(paramsDialog, Action.JOINED);
      } else if (paramsDialog.dialogType === DialogUserType.EDIT) {
        this.storedUser.storeUser(this.user.name);
        this.sendNotification(paramsDialog, Action.RENAME);
      }
    });
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.socketService.send({
      from: this.user,
      content: message
    });
    this.messageContent = null;
  }

  public sendNotification(params: any, action: Action): void {
    let message: Message;

    if (action === Action.JOINED) {
      message = {
        from: this.user,
        action
      };
    } else if (action === Action.RENAME) {
      message = {
        action,
        content: {
          username: this.user.name,
          previousUsername: params.previousUsername
        }
      };
    }

    this.socketService.send(message);
  }


  getCssId(message:Message){
    //what we need
    //me --> text on right side
    //you --> text on left side
    //action --> text centerd
    let cssId=""
    if(message.action===undefined || message.action == Action.MEDIA)
    {
      cssId = message.from.id === this.user.id ? "me" : 'you'
    }else{
      cssId ="action"
    }
    return cssId;
  }

  trustUrl(url:string):SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  copyMessage(message:string):void{
    if(message==undefined)
    return; //we do not want to copy a action

    //copying stuff to clipboard is weird in javascript you need
    //to create a element on the website and copy from there.
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = message;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

      this._snackBar.open("Copied: \""+message+"\" to Clipboard", "Ok", {
        duration: 2000,
      });
  }

  pdfDownload(){
    var pdfMake = new PdfMake(this.messages)
    pdfMake.download();
  }

  imageDialog():void{
    this.dialogRef = this.dialog.open(DialogImageComponent);
    this.dialogRef.afterClosed().subscribe(paramsDialog => {
      if (!paramsDialog) {
        return;
      }


      this.socketService.sendMedia({
        from: this.user,
        content: paramsDialog.link
      });

    });
  }

  drawDialog(){
    this.dialogRef = this.dialog.open(DialogCanvasComponent);
    this.dialogRef.afterClosed().subscribe(paramsDialog => {
        console.dir(paramsDialog)
    });
  }

}
