import { AlertController, LoadingController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  @Input() user: any;
  forgotForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.loadForm();
  }

  onSubmit = () => console.log('object');

  loadForm = () => {
    this.forgotForm = this.fb.group({
      pass: ['', [Validators.required, Validators.minLength(4)]],
      repass: ['', [Validators.required, Validators.minLength(4)]],
    });
  };
}
