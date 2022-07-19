///
/// Erp System - Mark II No 20 (Baruch Series)
/// Copyright © 2021 - 2022 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {AboutComponent} from "./about.component";
import {RouterModule} from "@angular/router";
import {ABOUT_ROUTE} from "./about.route";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [AboutComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([ABOUT_ROUTE])
  ]
})
export class AboutErpSystemModule {}
