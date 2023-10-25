import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ABOUT_ROUTE } from './about/about.route';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([ABOUT_ROUTE])],
  declarations: [AboutComponent],
})
export class AboutPageModule {
}
