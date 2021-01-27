import {Component, Input} from '@angular/core';
import {environment} from "../../../environments/environment";
import {MessageModel} from "../../core/models/message";

@Component({
  selector: 'app-message-bubble',
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.scss']
})
export class MessageBubbleComponent {
  @Input() message: MessageModel;
  @Input() cover: string;
  environment = environment;
}
