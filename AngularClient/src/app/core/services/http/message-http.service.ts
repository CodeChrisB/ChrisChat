import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {ChatModel} from "../../models/chat";
import {MessageModel} from "../../models/message";

@Injectable({
  providedIn: 'root'
})
export class MessageHttpService extends HttpService {
  getChats(): Promise<ChatModel[]> {
    return this.get("chats.json");
  }

  createChat(sourceId: number, targetId: number): Promise<ChatModel> {
    return this.get("createChat");
  }

  saveMessage(chatId: number, message: string): Promise<MessageModel> {
    return this.get("saveMessage");
  }
}
