import { Component, Input, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-chat-msg',
  templateUrl: 'message.component.html',
  styleUrls: ['message.component.scss'],
})
export class MessageChatComponent implements OnInit {
  @Input() item: any;

  ngOnInit() {}

}
