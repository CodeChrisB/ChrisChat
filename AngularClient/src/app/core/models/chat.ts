import {MessageModel} from "./message";

export class ChatModel {
  "id": number;
  "targetUserId": number;
  "username": string;
  "cover": string;
  "lastMessage": string;
  "lastMessageLength": string | number;
  "chat": Array<MessageModel>
}
