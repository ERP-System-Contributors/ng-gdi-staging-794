import { NgModule } from '@angular/core';
import { ErpActivateComponent } from './activate/erp-activate.component';
import { ErpPasswordStrengthBarComponent } from './password/password-strength-bar/erp-password-strength-bar.component';
import { ErpRegisterComponent } from './register/erp-register.component';
import { ErpSettingsComponent } from './settings/erp-settings.component';
import { ErpPasswordComponent } from './password/erp-password.component';
import { ErpPasswordResetFinishComponent } from './password-reset/finish/erp-password-reset-finish.component';
import { ErpPasswordResetInitComponent } from './password-reset/init/erp-password-reset-init.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { erpAccountState } from './erp-account.route';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(erpAccountState)
  ],
  declarations: [
    ErpActivateComponent,
    ErpRegisterComponent,
    ErpPasswordComponent,
    ErpPasswordStrengthBarComponent,
    ErpPasswordResetInitComponent,
    ErpPasswordResetFinishComponent,
    ErpSettingsComponent,
  ],
})
export class ErpAccountModule {

}
