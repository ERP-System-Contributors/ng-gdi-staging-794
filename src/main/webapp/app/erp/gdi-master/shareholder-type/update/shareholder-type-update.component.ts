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
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ShareholderTypeFormService, ShareholderTypeFormGroup } from './shareholder-type-form.service';
import { IShareholderType } from '../shareholder-type.model';
import { ShareholderTypeService } from '../service/shareholder-type.service';
import { ShareHolderTypes } from 'app/entities/enumerations/share-holder-types.model';

@Component({
  selector: 'jhi-shareholder-type-update',
  templateUrl: './shareholder-type-update.component.html',
})
export class ShareholderTypeUpdateComponent implements OnInit {
  isSaving = false;
  shareholderType: IShareholderType | null = null;
  shareHolderTypesValues = Object.keys(ShareHolderTypes);

  editForm: ShareholderTypeFormGroup = this.shareholderTypeFormService.createShareholderTypeFormGroup();

  constructor(
    protected shareholderTypeService: ShareholderTypeService,
    protected shareholderTypeFormService: ShareholderTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shareholderType }) => {
      this.shareholderType = shareholderType;
      if (shareholderType) {
        this.updateForm(shareholderType);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const shareholderType = this.shareholderTypeFormService.getShareholderType(this.editForm);
    if (shareholderType.id !== null) {
      this.subscribeToSaveResponse(this.shareholderTypeService.update(shareholderType));
    } else {
      this.subscribeToSaveResponse(this.shareholderTypeService.create(shareholderType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShareholderType>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(shareholderType: IShareholderType): void {
    this.shareholderType = shareholderType;
    this.shareholderTypeFormService.resetForm(this.editForm, shareholderType);
  }
}
