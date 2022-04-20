import { AlertController, LoadingController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@modules/users/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  @Input() user: any;
  changeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private db: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.loadForm();
  }

  onSubmit = async () => {
    const loading = await this.loadingCtrl.create({ message: 'Processing...'});
    loading.present();
    this.db.changePassword(this.changeForm.value).subscribe(
      async (res: any) => {
        console.log(res);
      }
    );
  };

  loadForm = () => {
    this.changeForm = this.fb.group({
      pass: ['', [Validators.required, Validators.minLength(4)]],
      newpass: ['', [Validators.required, Validators.minLength(4)]],
    });
  };
}
