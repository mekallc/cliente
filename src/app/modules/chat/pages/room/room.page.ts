import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '@core/services/chat.service';
import { StorageService } from '@core/services/storage.service';
import { UtilsService } from '@core/services/utils.service';
import { FireStorageService } from '@modules/chat/services/fire-storage.service';

@Component({
  selector: 'app-room-hat',
  templateUrl: 'room.page.html',
  styleUrls: ['room.page.scss'],
})
export class RoomChatPage implements OnInit {
  uid: string;
  message: string;
  public chat$ = this.chatService.chatBehavior$;
  constructor(
    private fs: FireStorageService,
    private uService: UtilsService,
    private storage: StorageService,
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({uid}) =>
      this.getData(uid));
    this.chat$.subscribe(res => console.log(res));
  }

  async onSubmit(): Promise<void> {
    if(this.message) {
      const oUser = await this.user();
      const payload = {
        message: this.message,
        user: {
          // eslint-disable-next-line no-underscore-dangle
          id: oUser._id,
          first_name: oUser.first_name,
          last_name: oUser.last_name
        },
        room: this.uid,
        date: new Date()
      };
      this.chatService.sendMessage(payload);
      this.message = '';
    }
  }

  onClose = () =>
    this.uService.navigate('pages/home');

  private getData(uid: string) {
    this.chatService.joinRoom(uid);
    this.uid = uid;
  }

  private async user() {
    return await this.storage.getStorage('oUser');
  }

}
