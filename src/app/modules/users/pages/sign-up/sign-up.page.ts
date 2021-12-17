import { MasterService } from './../../../../core/services/master.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';

import { StorageService } from 'src/app/core/services/storage.service';
import { TablesService } from 'src/app/core/services/tables.service';
import { AuthService } from '@modules/users/services/auth.service';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit, AfterViewInit {

  registerForm: FormGroup;
  avatar: any;
  countries$: Observable<any[]>;
  idioma = [
    { name: 'Ingles (USA)', iso: 'en' },
    { name: 'Español (Latinoamerica)', iso: 'es' },
    { name: 'Portugues (Brasil)', iso: 'po' }
  ];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private ms: MasterService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadCtrl: LoadingController,
  ) { }

  async ngOnInit() {
    this.loadForm();
    this.countries$ = this.ms.getMaster('master/countries/');
  }

  ngAfterViewInit() { }

  onSubmit = async () => {
    this.registerForm.controls.picture.setValue(this.avatar);
    console.log(this.registerForm.value);
    const load = await this.loadCtrl.create({message: 'Loading...'});
    await load.present();
    this.auth.signUp(this.registerForm.value).subscribe(
      async (res) => {
        console.log(res);
        await load.dismiss();
        this.navCtrl.navigateBack('/user/signIn');
      },
      async (err: any) => {
        await load.dismiss();
        console.log(err);
        const alert = await this.alertCtrl.create({ mode: 'ios', header: 'Error', message: err.error, buttons: ['OK'] });
        return await alert.present();
    });
  };

  loadForm = () => {
    this.registerForm = this.fb.group({
      picture: [''],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      last_name: ['', [Validators.required, Validators.minLength(4)]],
      fist_name: ['', [Validators.required, Validators.minLength(4)]],
    });
  };

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 80, allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });
    this.avatar =  image.dataUrl;
  };
}
