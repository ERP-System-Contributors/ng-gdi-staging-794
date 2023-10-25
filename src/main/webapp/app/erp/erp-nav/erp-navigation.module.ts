import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ErpNavbarComponent } from './navbar/erp-navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ],
  declarations: [ErpNavbarComponent],
  exports: [ErpNavbarComponent]
})
export class ErpNavigationModule {
}
