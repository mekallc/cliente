import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { StorageService } from '@core/services/storage.service';
import { AuthService } from '@modules/users/services/auth.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
})
export class CodeUserComponent implements OnInit {

  formControl: FormGroup;

  constructor(
    private router: Router,
    private db: AuthService,
    private fb: FormBuilder,
    private storage: StorageService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.load();
  }

  load = () => {
    this.formControl = this.fb.group({
      password: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    });
  };

  onSubmit = async () => {
    if (this.formControl.invalid) { return; }
    const load = await this.loadingCtrl.create({message: 'Loading...'});
    await load.present();
    this.db.codeValidate(this.formControl.value).subscribe(
      async (res: any) => {
        this.formControl.reset();
        await load.dismiss();
        await this.storage.removeStorage('oChange');
        const alert = await this.alertCtrl.create({
          header: 'INFO',
          message: 'Your password was changed successfully',
          buttons: ['Ok']
        });
        await alert.present();
        return this.router.navigate(['/user', 'signIn']);
      },
      async (error) => {
        await load.dismiss();
        this.formControl.reset();
        const alert = await this.alertCtrl.create({
          header: 'ERROR',
          message: 'Something wrong happened, please try again',
          buttons: ['Ok']
        });
        await alert.present();
      }
    );
  };
}
