///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
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

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { HttpServerRequests } from 'app/admin/metrics/metrics.model';
import { filterNaN } from 'app/core/util/operators';

@Component({
  selector: 'jhi-metrics-request',
  templateUrl: './metrics-request.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricsRequestComponent {
  /**
   * object containing http request related metrics
   */
  @Input() requestMetrics?: HttpServerRequests;

  /**
   * boolean field saying if the metrics are in the process of being updated
   */
  @Input() updating?: boolean;

  filterNaN = (input: number): number => filterNaN(input);
}
