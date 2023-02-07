import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { HeaderModule } from '@core/widgets/header/header.module';
import { IntroWidgetModule } from '@core/widgets/intro/intro.module';
import { BannersWidgetModule } from '@core/widgets/banners/banners.module';
import { CategoriesWidgetModule } from '@modules/categories/widgets/home/home.module';
import { LastRepairedWidgetModule } from '@core/widgets/last-repaired/last-repaired.module';
import { ServiceModule } from '@core/widgets/service/service.module';
import { StatusOpenModule } from '@core/widgets/status-open/status-open.module';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    HeaderModule,
    CommonModule,
    ServiceModule,
    StatusOpenModule,
    IntroWidgetModule,
    BannersWidgetModule,
    HomePageRoutingModule,
    CategoriesWidgetModule,
    LastRepairedWidgetModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
