import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HOME_PAGE_ROUTE } from './home/home-page.route';
import { HomePageComponent } from './home/home-page.component';
import { ErpMainComponent } from './main/erp-main.component';
import { ErpFooterComponent } from './footer/erp-footer.component';
import { ErpPageRibbonComponent } from './profiles/erp-page-ribbon.component';
import { ERPErrorComponent } from './error/erp-error.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([HOME_PAGE_ROUTE]),
  ],
  declarations: [
    HomePageComponent,
    ErpMainComponent,
    ErpFooterComponent,
    ErpPageRibbonComponent,
    ERPErrorComponent,
  ],
  exports: [
    HomePageComponent,
    ErpMainComponent,
    ErpFooterComponent,
    ErpPageRibbonComponent,
    ERPErrorComponent,
  ]
})
export class HomePageModule {
}
