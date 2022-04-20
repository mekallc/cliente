import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MasterService } from '@core/services/master.service';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent implements OnInit {
  @Input() user: any;
  registerForm: FormGroup;
  countries$: Observable<any[]>;
  idioma = [
    { name: 'Ingles (USA)', iso: 'en' },
    { name: 'Portugues (Brasil)', iso: 'po' },
    { name: 'Español (Latinoamerica)', iso: 'es' },
  ];
  constructor(
    private fb: FormBuilder,
    private ms: MasterService,
    private loadCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.loadForm();
    this.countries$ = this.ms.getMaster('master/countries/');
  }

  onSubmit = async () => {
    if(this.registerForm.invalid) { return; }
    const load = await this.loadCtrl.create({message: 'Loading...'});
    load.present();
    const value = this.registerForm.value;
    const data = {
      email: value.email, country: value.country,
      password: value.password, last_name: value.lastname,
      fist_name: value.firstname, phone: `+${value.country + value.phone}`
    };
  };


  loadForm = () => {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', [Validators.required, Validators.minLength(4)]],
      lastname: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', Validators.required],
      country: ['', Validators.required]
    });
  };
}
