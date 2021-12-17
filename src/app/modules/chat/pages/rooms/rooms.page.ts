import { Observable, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { GestureController, NavController } from '@ionic/angular';
import { RecordingData, VoiceRecorder } from 'capacitor-voice-recorder';
import { ConnectService } from '@modules/chat/services/connect.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { async } from '@angular/core/testing';
import { FireStorageService } from '@modules/chat/services/fire-storage.service';

@Component({
  selector: 'app-rooms-chat',
  templateUrl: 'rooms.page.html',
  styleUrls: ['rooms.page.scss'],
})
export class RoomsChatPage implements OnInit, AfterViewInit {

  @ViewChild('mic', { read: ElementRef }) mic: ElementRef;
  @ViewChild('recordBtn', { read: ElementRef }) recordBtn: ElementRef;

  recording = false;
  messageToogle = false;
  storedFileNames = [];
  durationDisplay = '';
  duration: number;
  uid: any;
  message: string;
  toogleMessage = false;
  format = 'dd/MM HH:mm';
  items$: Observable<any[]>;
  photo: any;
  openPopover = false;

  constructor(
    private conn: ConnectService,
    private active: ActivatedRoute,
    private navCtrl: NavController,
    private fs: FireStorageService,
    private gestureCtrl: GestureController,
  ) {}

  ngOnInit() {
    this.active.params.subscribe(({uid}) => this.uid = uid);
    VoiceRecorder.requestAudioRecordingPermission();
    this.initChat();
    this.initAudio();
  }

  ngAfterViewInit() {
    const longpress = this.gestureCtrl.create({
      threshold: 0,
      gestureName: 'long-press',
      el: this.recordBtn.nativeElement,
      onStart: ev => {
        Haptics.impact({ style: ImpactStyle.Light });
        this.startRecording();
        this.calculateDuration();
      },
      onEnd: ev => {
        Haptics.impact({ style: ImpactStyle.Light });
        this.stopRecording();
      },
    }, true);
    longpress.enable();
  }

  initChat() {
    this.items$ = this.conn.getRoomMessages(this.uid);
    this.conn.getRoomById(this.uid).subscribe((res) => {});
    this.conn.getRoomMessages(this.uid).subscribe((res) => {});
  }
  sendMessage() {
    if (this.message.length === 0) { return; }
    this.conn.sendRoomMessage(this.uid, this.message);
    this.message = '';
    this.toogleMessage = false;
  }

  sendMessageKeypress(ev: any) {
    if (ev !== 13) { return; }
    this.sendMessage();
  }

  txtMessage() {
    if (this.message?.length === 0) { this.toogleMessage = false; }
    else { this.toogleMessage = true; }
  }

  logScrolling = (ev: any) => {
    // console.log(ev.detail);
  };

  onClose = () => this.navCtrl.navigateRoot('pages/services');

  // ----> VoiceRecord
  initAudio() {
    this.loadFiles();
  }

  calculateDuration = () => {
    if(!this.recording) {
      this.duration = 0;
      this.durationDisplay = '';
      return;
    }
    this.duration += 1;
    const min = Math.floor(this.duration / 60);
    const sec = (this.duration % 60).toString().padStart(2, '0');
    this.durationDisplay = `${min}:${sec}`;
    timer(1000).subscribe(() => this.calculateDuration());
  };

  startRecording = () => {
    if (this.recording) { return; }
    this.recording = true;
    VoiceRecorder.startRecording();
  };

  stopRecording = () => {
    if (!this.recording) { return; }
    VoiceRecorder.stopRecording().then(async (result: RecordingData) => {
      this.recording = false;
      if (result.value && result.value.recordDataBase64) {
        const recordData = result.value.recordDataBase64;
        console.log(recordData);
        const fileName = new Date().getTime() + '.wav';
        const url = await this.fs.uploadAudio(this.uid, fileName);
        this.conn.sendRoomMessage(this.uid, url, 'ACC', fileName);
        await Filesystem.writeFile({ path: fileName, directory: Directory.Data, data: recordData });
        this.loadFiles();
      }
    });
  };

  playFile = async (fileName: any) => {
    const audioFile = await Filesystem.readFile({ path: fileName, directory: Directory.Data, });
    const base64Sound = audioFile.data;
    const audioRef = new Audio(`data: audio/aac;base64,${base64Sound}`);
    console.log('SOUND ', audioRef);
    audioRef.oncanplaythrough = () => audioRef.play();
    audioRef.load();
  };

  loadFiles = async () => {
    Filesystem.readdir({ path: '', directory: Directory.Data })
      .then((result => this.storedFileNames = result.files));
  };

  // -----> Camera GET
  cameraGet = async () => {
    const image = await Camera.getPhoto({
      width: 600, height: 600,
      quality: 60, allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });
    const url = await this.fs.upload(this.uid, image.dataUrl);
    this.conn.sendRoomMessage(this.uid, url, 'IMG');
  };

  openPop = () => this.openPopover = true;
}
