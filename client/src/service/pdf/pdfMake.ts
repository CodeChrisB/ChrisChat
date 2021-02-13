import { Message } from "../../../src/app/chat/shared/model/message";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Action } from "src/app/chat/shared/model/action";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
let dd={}

export class PdfMake{
  messages: Message[] = [];

  constructor(messages:Message[]){
    this.messages = messages
    this.initData()
  }

  initData(){

   var  messages :string[] = [];

   this.messages.forEach(message=>{

    if(message.content!=undefined && message.action != Action.RENAME){
      console.dir(message)
      messages.push("["+message.time+" "+message.from.name+"] "+message.content) //normal chat
    }else{
      alert("stop")
      var action = message.action
      var text="";
      var name=""
      switch(action){
        case Action.JOINED:
          text=message.from.name +" joined the Chat!"
          name=message.from.name
        break;
        case Action.MEDIA:
          text = message.from.name+" sent a Media content wit following URL : " +message.content
          name=message.from.name
        break;
        case Action.RENAME:
          text = message.content.previousUsername+" changed their name to "+message.content.username
          name = message.content.previousUsername
        break;
      }
      messages.push("["+message.time+" "+name+"] "+text) //any action --> joining ,sending media, renaming
    }
   })

   //the content pretty small actually
    dd ={
      content:[
          messages
      ]
    }
  }

  create(){
    return pdfMake.createPdf(dd);
  }

  download(){
    pdfMake.createPdf(dd).download("Chat.pdf");
  }
}
