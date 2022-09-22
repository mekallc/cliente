import { Component, Input, OnInit } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-service-status-list',
  templateUrl: './service-status-list.component.html',
  styleUrls: ['./service-status-list.component.scss'],
})
export class ServiceStatusListComponent implements OnInit {

  @Input() item: any;
  items$: Observable<any|undefined>;
  total: number;

  constructor(
    private nav: NavController,
  ) { }

  ngOnInit() {
    timer(1000).subscribe(() => {
      console.log('STATUS ', this.item);
    });
  }
}
