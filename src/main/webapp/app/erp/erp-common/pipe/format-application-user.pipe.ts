///
/// Erp System - Mark II No 20 (Baruch Series) Client v 0.0.9-SNAPSHOT
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

import { Pipe, PipeTransform } from '@angular/core';
import { IApplicationUser } from '../application-user/application-user.model';

@Pipe({
  name: 'formatApplicationUser',
})
export class FormatApplicationUserPipe implements PipeTransform {

  transform(value: IApplicationUser): string {

    const accountDetail = `Selected User Id: ${value.id} | Name: ${value.applicationIdentity}`;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return value ? accountDetail :'';
  }
}