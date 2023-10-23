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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFxTransactionType } from '../fx-transaction-type.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-fx-transaction-type-detail',
  templateUrl: './fx-transaction-type-detail.component.html',
})
export class FxTransactionTypeDetailComponent implements OnInit {
  fxTransactionType: IFxTransactionType | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fxTransactionType }) => {
      this.fxTransactionType = fxTransactionType;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
