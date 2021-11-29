import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-mechanics',
  templateUrl: './mechanics.component.html',
  styleUrls: ['./mechanics.component.scss'],
})
export class MechanicsComponent implements OnInit, AfterViewInit{

  brands$: Observable<any[]>;
  models$: Observable<any[]>;
  vehicles$: Observable<any[]>;

  constructor(
    private db: DbCategoriesService
  ) { }

  ngOnInit() {
    this.vehicles$ = this.db.getVehicles();
  }

  ngAfterViewInit() {

  }

  fiterBrand = (ev: any) => {
    const value = ev.detail.value;
    this.brands$ = this.db.getBrand().pipe(
      map((res) => res.filter((row: any) => row.types_vehicle.find((el: any) => el.id === value)))
    );
      // this.brands$.subscribe((res) => console.log(res));
  };

  filterModel = (ev: any) => {
    this.models$ = this.db.getModel().pipe(
      map((res: any) => res.filter((row: any) => row.brand === ev.detail.value))
    );
  };
}
