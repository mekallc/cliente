import { StorageService } from '@core/services/storage.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import * as actions from '@store/actions';
import { AppState } from '@store/app.state';
import { MasterService } from '@core/services/master.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent implements OnInit {
  @Input() user: any;
  registerForm: FormGroup;
  countries$: Observable<any[]>;
  language: number;
  idioma = [
    { name: 'Español (Latinoamerica)', iso: 'es', id: 1 },
    { name: 'Ingles (USA)', iso: 'en', id: 2 },
    { name: 'Portugues (Brasil)', iso: 'po', id: 3 }
  ];
  constructor(
    private fb: FormBuilder,
    private ms: MasterService,
    private store: Store<AppState>,
    private storage: StorageService,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.loadForm();
    this.loadData();
    this.countries$ = this.ms.getMaster('master/countries/');
  }

  onSubmit = async () => {
    if(this.registerForm.invalid) { return; }
    const data = this.registerForm.value;
    await this.storage.setStorageValue('language', data.language);
    delete data.language;
    const load = await this.loadCtrl.create({message: 'Loading...'});
    load.present();
    const value = this.registerForm.value;
    this.ms.patch2Master('user/upd/', value).subscribe(
      (user: any) => {
        console.log('USER EDIT ', user);
        load.dismiss();
        this.store.dispatch(actions.loadUser(user));
      },
      async (err: any) => {
        load.dismiss();
        console.log(err);
        const alert = await this.alertCtrl.create({
          header: 'Error', message: err.error.error, buttons:['OK']});
        await alert.present();
      }
    );
  };


  loadForm = () => {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', [Validators.required, Validators.minLength(4)]],
      last_name: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      language: ['', Validators.required]
    });
  };

  loadData = () => {
    this.store.select('user')
    .pipe(filter(row => !row.loading), map(res => res.user))
    .subscribe((res: any) => {
      this.registerForm.controls.first_name.setValue(res.first_name);
      this.registerForm.controls.last_name.setValue(res.last_name);
      this.registerForm.controls.email.setValue(res.email);
      this.registerForm.controls.phone.setValue(res.phone);
      this.registerForm.controls.country.setValue(res.country);
      this.registerForm.controls.language.setValue(+res.language);
      this.loadCountry(res.language);
    });
  };

  loadCountry = (country: string) => {
    this.ms.getMaster(`master/countries/`);

  };
}
