import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'erp',
        data: { pageTitle: 'ERP| GDI About' },
        loadChildren: () => import('./about-page/about-page.module').then(m => m.AboutPageModule),
      },
      {
        path: '',
        data: { pageTitle: 'ERP| GDI Home' },
        loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule),
      }
    ]),
  ],
})
export class ErpSystemRoutingModule {}
