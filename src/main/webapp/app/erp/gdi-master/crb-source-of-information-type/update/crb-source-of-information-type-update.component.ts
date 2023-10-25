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

import { CrbSourceOfInformationTypeFormService, CrbSourceOfInformationTypeFormGroup } from './crb-source-of-information-type-form.service';
import { ICrbSourceOfInformationType } from '../crb-source-of-information-type.model';
import { CrbSourceOfInformationTypeService } from '../service/crb-source-of-information-type.service';

@Component({
  selector: 'jhi-crb-source-of-information-type-update',
  templateUrl: './crb-source-of-information-type-update.component.html',
})
export class CrbSourceOfInformationTypeUpdateComponent implements OnInit {
  isSaving = false;
  crbSourceOfInformationType: ICrbSourceOfInformationType | null = null;

  editForm: CrbSourceOfInformationTypeFormGroup = this.crbSourceOfInformationTypeFormService.createCrbSourceOfInformationTypeFormGroup();

  constructor(
    protected crbSourceOfInformationTypeService: CrbSourceOfInformationTypeService,
    protected crbSourceOfInformationTypeFormService: CrbSourceOfInformationTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crbSourceOfInformationType }) => {
      this.crbSourceOfInformationType = crbSourceOfInformationType;
      if (crbSourceOfInformationType) {
        this.updateForm(crbSourceOfInformationType);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const crbSourceOfInformationType = this.crbSourceOfInformationTypeFormService.getCrbSourceOfInformationType(this.editForm);
    if (crbSourceOfInformationType.id !== null) {
      this.subscribeToSaveResponse(this.crbSourceOfInformationTypeService.update(crbSourceOfInformationType));
    } else {
      this.subscribeToSaveResponse(this.crbSourceOfInformationTypeService.create(crbSourceOfInformationType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrbSourceOfInformationType>>): void {
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

  protected updateForm(crbSourceOfInformationType: ICrbSourceOfInformationType): void {
    this.crbSourceOfInformationType = crbSourceOfInformationType;
    this.crbSourceOfInformationTypeFormService.resetForm(this.editForm, crbSourceOfInformationType);
  }
}
