import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ErpSystemRoutingModule } from './erp-system-routing.module';
import { ErpNavigationModule } from './erp-nav/erp-navigation.module';
import { HomePageModule } from './home-page/home-page.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HomePageModule,
    ErpSystemRoutingModule,
    ErpNavigationModule,
  ],
  exports: [
    HomePageModule,
    ErpSystemRoutingModule,
    ErpNavigationModule,
  ]
})
export class ErpSystemModule {
}
