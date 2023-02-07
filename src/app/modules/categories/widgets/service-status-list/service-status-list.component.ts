import { Component, Input, OnInit } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { NavController } from '@ionic/angular';
import { UtilsService } from '@core/services/utils.service';
import { WaitingComponent } from '@modules/categories/pages/waiting/waiting.component';

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
    private uService: UtilsService
  ) { }




  ngOnInit() {
    timer(500).subscribe(() => console.log('ITEM ', this.item));
  }

  async openService(res: any): Promise<void> {
    await this.uService.modal({
      mode: 'ios',
      initialBreakpoint: 1,
      breakpoints: [0, .7, .9],
      componentProps: { res },
      component: WaitingComponent
    });
  }
}
