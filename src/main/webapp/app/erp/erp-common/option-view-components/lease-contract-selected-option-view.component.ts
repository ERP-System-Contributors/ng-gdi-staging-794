///
/// Erp System - Mark III No 12 (Caleb Series) Client 1.2.2
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
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

import { Component, Input } from '@angular/core';
import { ILeaseContract } from '../../erp-leases/lease-contract/lease-contract.model';

@Component({
  selector: 'jhi-lease-contract-selected-option-view',
  template: `
    <span class="ng-value-label">
      {{item.bookingId }} {{item.leaseTitle}}
    </span>
  `
})
export class LeaseContractSelectedOptionViewComponent {

  @Input() item: ILeaseContract = {};
}