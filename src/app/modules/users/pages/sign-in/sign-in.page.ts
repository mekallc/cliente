import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSlides, NavController, LoadingController, AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import * as actions from '@store/actions';
import { AuthService } from '@modules/users/services/auth.service';
import { PushService } from '@core/services/push.service';
import { StorageService } from '@core/services/storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit, AfterViewInit {

  @ViewChild('slides') slides: IonSlides;
  options = { initialSlide: 0, };

  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private db: AuthService,
    private nav: NavController,
    private store: Store<AppState>,
    private storage: StorageService,
    private pushService: PushService,
    private alertCtrl: AlertController,
    private loadCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.loadForm();
    this.pushService.initPush();
  }

  ngAfterViewInit() {
    this.slides.lockSwipes(true);
  };

  onSubmit = async () => {
    if (this.loginForm.invalid) { return; }
    const load = await this.loadCtrl.create({message: 'Loading...'});
    await load.present();
    this.db.signIn(this.loginForm.value).subscribe(
    async (res: any) => {
      await this.storage.setStorage('userClient', res);
      this.store.dispatch(actions.expertLoad());

      await load.dismiss();
      return this.nav.navigateRoot('/pages/home');
    }, async (err: any) => {
      await load.dismiss();
      await this.db.alertErr(err.error.detail);
    });
  };

  onSubmitForgotPassword = async () => {
    const form = this.forgotPasswordForm;
    if (form.invalid) { return; }
    const load = await this.loadCtrl.create({message: 'Loading...'});
    await load.present();
    this.db.forgotSenha(form.value).subscribe(
      async (res) => {
        await load.dismiss();
        await this.storage.setStorage('oChange', res);
        const alert = await this.alertCtrl.create({
          header: 'INFO',
          message: 'A code was sent to your email',
          buttons: ['Ok']
        });
        await alert.present();
      }
    );
  };

  loadForm = () => {
    this.loginForm = this.fb.group({
      email: ['cliente01@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(4)]],
    });
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  };

  goToSlides = (slide: number) => {
    this.slides.lockSwipes(false);
    this.slides.slideTo(slide);
    this.slides.lockSwipes(true);
  };

  onRegister = () => this.nav.navigateForward('/user/signUp');
}
