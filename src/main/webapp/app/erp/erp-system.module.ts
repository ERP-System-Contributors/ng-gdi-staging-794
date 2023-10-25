import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ErpSystemRoutingModule } from './erp-system-routing.module';
import { ErpNavigationModule } from './erp-nav/erp-navigation.module';
import { HomePageModule } from './home-page/home-page.module';
import { GdiMasterRoutingModule } from './gdi-master/gdi-master-routing.module';
import { GdiDataRoutingModule } from './gdi-data/gdi-data-routing.module';
import { ErpCommonPageRoutingModule } from './erp-common-page/erp-common-page-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HomePageModule,
    ErpSystemRoutingModule,
    ErpNavigationModule,
    GdiMasterRoutingModule,
    GdiDataRoutingModule,
    ErpCommonPageRoutingModule,
  ],
  exports: [
    HomePageModule,
    ErpSystemRoutingModule,
    ErpNavigationModule,
  ]
})
export class ErpSystemModule {
}
