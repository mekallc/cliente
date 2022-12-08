import { catchError } from 'rxjs/operators';
/* eslint-disable no-underscore-dangle */
import { StorageService } from '@core/services/storage.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, timer } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import * as actions from '@store/actions';
import { AppState } from '@store/app.state';
import { MasterService } from '@core/services/master.service';
import { UtilsService } from '@core/services/utils.service';

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
    private uService: UtilsService,
    private storage: StorageService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loadForm();
    this.loadData();
    this.countries$ = this.ms.getMaster('tables/countries');
  }


  async onSubmit(): Promise<void> {
    if(this.registerForm.invalid) { return; }
    const data = this.registerForm.value;
    await this.uService.load({message: 'Procesando...'});
    await this.storage.setStorageValue('language', data.language);
    this.processingData(this.user._id, data);
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
    if (this.user) {
      const res = this.user;
      this.registerForm.controls.first_name.setValue(res.first_name);
      this.registerForm.controls.last_name.setValue(res.last_name);
      this.registerForm.controls.email.setValue(res.email);
      this.registerForm.controls.phone.setValue(res.phone);
      this.registerForm.controls.country.setValue(res.country);
      this.registerForm.controls.language.setValue(+res.language);
    }
  };

  private processingData(id: string, data: any) {
    this.ms.patch2Master(`users/${id}`, data)
    .pipe(
      catchError(async (error: any) => {
        this.uService.loadDimiss();
        await this.uService.alert({
          header: 'Error',
          message: error.message,
          buttons:['OK']
        });
      })
    )
    .subscribe(
      (user: any) => {
        this.uService.loadDimiss();
        this.store.dispatch(actions.loadUser(user));
      },
    );
  }
}
