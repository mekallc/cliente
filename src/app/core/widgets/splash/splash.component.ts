import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AnimationOptions } from 'ngx-lottie';
import { timer } from 'rxjs';
import { StatusBar, Style } from '@capacitor/status-bar';


@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {

  options: AnimationOptions = {
    path: './assets/lotties/mecanics.json',
    loop: true
  };

  constructor(
    private nav: NavController
  ) { }

  ionViewDidEnter() {}

  ngOnInit() {
    timer(3000).subscribe(async () => {
      this.nav.navigateRoot('/pages/home');
      await StatusBar.show();
      await StatusBar.setStyle({ style: Style.Light });
    });

  }

}
