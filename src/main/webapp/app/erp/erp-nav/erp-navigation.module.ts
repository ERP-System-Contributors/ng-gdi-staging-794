import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ErpNavbarComponent } from './navbar/erp-navbar.component';
import { RouterModule } from '@angular/router';
import { GdiDataComponent } from './gdi-data/gdi-data.component';
import { GdiMasterComponent } from './gdi-master/gdi-master.component';
import { GdiCommonsComponent } from './gdi-commons/gdi-commons.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ],
  declarations: [
    ErpNavbarComponent,
    GdiDataComponent,
    GdiMasterComponent,
    GdiCommonsComponent
  ],
  exports: [ErpNavbarComponent]
})
export class ErpNavigationModule {
}
