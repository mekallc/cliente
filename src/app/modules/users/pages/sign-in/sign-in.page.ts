import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSlides, AlertOptions } from '@ionic/angular';

import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { UtilsService } from '@core/services/utils.service';
import { StorageService } from '@core/services/storage.service';
import { AuthService } from '@modules/users/services/auth.service';

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
    private store: Store<AppState>,
    private uService: UtilsService,
    private storage: StorageService,
  ) { }

  ngOnInit() {
    this.loadForm();
  }

  ngAfterViewInit() {
    this.slides.lockSwipes(true);
  }

  onSubmit = async () => {
    if (this.loginForm.invalid) { return; }
    await this.uService.load({message: 'Loading...'});
    this.db.signIn(this.loginForm.value).subscribe(
    async (res: any) => {
      console.log('oUSER', res);
      this.uService.loadDimiss();
      return this.uService.navigate('/pages/home');
    }, async ({ error }) => {
      console.log(error);
      this.uService.loadDimiss();
      await this.uService.alert({
        mode:'ios',
        header: 'Error',
        message: error.error_description || error.message,
        buttons: ['OK']
      });
    });
  };

  onSubmitForgotPassword = async () => {
    const form = this.forgotPasswordForm;
    if (form.invalid) { return; }
    await this.uService.load({message: 'Loading...'});
    this.db.forgotSenha(form.value).subscribe(
      async (res) => {
        console.log(res);
        this.uService.loadDimiss();
        await this.storage.setStorage('oChange', res);
        const opts: AlertOptions = {
          header: 'INFO',
          message: 'A code was sent to your email',
          buttons: ['Ok']
        };
        await this.uService.alert(opts);
      }
    );
  };

  loadForm = () => {
    this.loginForm = this.fb.group({
      username: ['web@condor.com.br', [Validators.required, Validators.email]],
      password: ['admin', [Validators.required, Validators.minLength(4)]],
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

  onRegister = () => this.uService.navigate('/user/signUp');

}
