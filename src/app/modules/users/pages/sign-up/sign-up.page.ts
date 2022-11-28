import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Camera, CameraResultType } from '@capacitor/camera';

import { MasterService } from '@core/services/master.service';
import { AuthService } from '@modules/users/services/auth.service';
import { StorageService } from '@core/services/storage.service';
import { UtilsService } from '@core/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit, AfterViewInit {

  registerForm: FormGroup;
  avatar: any;
  countries$: Observable<any[]>;
  language: number;
  idioma = [
    { name: 'Español (Latinoamerica)', id: 1 },
    { name: 'Ingles (USA)', id: 2 },
    { name: 'Portugues (Brasil)', id: 3 }
  ];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private ms: MasterService,
    private uService: UtilsService,
    private storage: StorageService,
  ) { }

  ngOnInit() {
    this.loadForm();
    this.countries$ = this.ms.getMaster('tables/countries');
  }

  ngAfterViewInit() { }

  onSubmit = async () => {
    if(this.registerForm.invalid) { return; }
    const data = this.registerForm.value;
    await this.getDataForm(data);
    await this.uService.load({ message: 'Loading' });
    console.log('VALUE ', this.registerForm.value);
    this.auth.signUp(this.registerForm.value).subscribe(
      async () => {
        this.uService.loadDimiss();
        await this.setToast();
      },
      async ({ error }) => {
        console.log('ERROR ', error.response.errorMessage);
        this.uService.loadDimiss();
        await this.uService.alert(
          {
            mode: 'ios',
            header: 'Error',
            message: error.response.errorMessage,
            buttons: ['OK']
          }
        );
    });
  };

  loadForm = () => {
    this.registerForm = this.fb.group({
      picture: [''],
      phone: ['41998819501', Validators.required],
      country: ['6309309045569700077d42ae', Validators.required],
      password: ['admin', Validators.required],
      language: ['', Validators.required],
      email: ['web1@condor.com.br', [Validators.required, Validators.email]],
      last_name: ['Velasques', [Validators.required, Validators.minLength(4)]],
      first_name: ['Alejandro', [Validators.required, Validators.minLength(4)]],
    });
  };

  onBack = () => this.uService.navigate('/user/signIn');

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 80, allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });
    this.avatar =  image.dataUrl;
  };

  private getDataForm = async (data: any): Promise<void> => {
    this.constructImage();
    await this.storage.setStorageValue('language', data.language);
  };

  private constructImage = () => {
    if (this.avatar) {
      this.registerForm.controls.picture.setValue(this.avatar);
    } else {
      this.registerForm.controls.picture.setValue('');
    }
  };

  private setToast = async (): Promise<void> => {
    await this.uService.toast({
      message: 'Account created, now access with your login and password',
      position: 'top', duration: 1000
    });
    this.uService.navigate('/user/signIn');
  };
}
