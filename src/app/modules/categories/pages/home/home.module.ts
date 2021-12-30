import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { HeaderModule } from '@core/widgets/header/header.module';
import { IntroWidgetModule } from '@core/widgets/intro/intro.module';
import { BannersWidgetModule } from '@core/widgets/banners/banners.module';
import { CategoriesWidgetModule } from 'src/app/modules/categories/widgets/home/home.module';
import { LastRepairedWidgetModule } from '@core/widgets/last-repaired/last-repaired.module';
import { ServiceStatusListModule } from '@modules/categories/widgets/service-status-list/service-status-list.module';


@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    HeaderModule,
    CommonModule,
    IntroWidgetModule,
    BannersWidgetModule,
    HomePageRoutingModule,
    CategoriesWidgetModule,
    ServiceStatusListModule,
    LastRepairedWidgetModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
