import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';

import { StorageService } from 'src/app/core/services/storage.service';
import { TablesService } from 'src/app/core/services/tables.service';
import { AuthService } from '@modules/users/services/auth.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit, AfterViewInit {

  registerForm: FormGroup;
  avatar = 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y';
  countries: any = [];
  idioma = [
    { name: 'Ingles (USA)', iso: 'en' },
    { name: 'Español (Latinoamerica)', iso: 'es' },
    { name: 'Portugues (Brasil)', iso: 'po' }
  ];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private navCtrl: NavController,
    private storage: StorageService,
    private alertCtrl: AlertController,
    private loadCtrl: LoadingController,
    private tablesService: TablesService,
  ) { }

  async ngOnInit() {
    this.loadForm();
    // const access = await this.auth.getRootToken();
    // this.countries = await this.tablesService.getCountries(access);
  }

  ngAfterViewInit() {
    // timer(300).subscribe(() => this.avatar = 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y');
  }
  onSubmit = async () => {
    const load = await this.loadCtrl.create({message: 'Loading...'});
    load.present();
    const value = this.registerForm.value;
    const data = {
      email: value.email, country: `${value.country}`,
      password: value.password, last_name: value.lastname,
      fist_name: value.firstname, phone: value.phone
    };
    // const data = {
    //   fist_name: 'Gabriel',
    //   last_name: 'Costas',
    //   phone: '5547999998888',
    //   email: 'result1234567@gmail.com',
    //   country:'182',
    //   password:'mmg123'
    // };
    // this.auth.signUp(data).then(async (res) => {
    //   console.log(res);
    //   load.dismiss();
    //   if (res.error ) {
    //     const error = JSON.parse(res.error);
    //     const alert = await this.alertCtrl.create({ mode: 'ios', header: 'Error', message: error.error, buttons: ['OK'] });
    //     return await alert.present();
    //   } else {
    //     await this.storage.removeStorage('rootToken');
    //     await this.storage.setStorage('language', value.language);
    //     this.navCtrl.navigateBack('/user/signIn');
    //   }
    // }).catch(async (err) => {
    //   const error = err;
    // });
  };

  loadForm = () => {
    this.registerForm = this.fb.group({
      language: ['en'],
      picture: [this.avatar],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      lastname: ['', [Validators.required, Validators.minLength(4)]],
      firstname: ['', [Validators.required, Validators.minLength(4)]],
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
