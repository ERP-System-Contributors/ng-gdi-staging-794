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
import { finalize, map } from 'rxjs/operators';

import { CountyCodeFormService, CountyCodeFormGroup } from './county-code-form.service';
import { ICountyCode } from '../county-code.model';
import { CountyCodeService } from '../service/county-code.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

@Component({
  selector: 'jhi-county-code-update',
  templateUrl: './county-code-update.component.html',
})
export class CountyCodeUpdateComponent implements OnInit {
  isSaving = false;
  countyCode: ICountyCode | null = null;

  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: CountyCodeFormGroup = this.countyCodeFormService.createCountyCodeFormGroup();

  constructor(
    protected countyCodeService: CountyCodeService,
    protected countyCodeFormService: CountyCodeFormService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ countyCode }) => {
      this.countyCode = countyCode;
      if (countyCode) {
        this.updateForm(countyCode);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const countyCode = this.countyCodeFormService.getCountyCode(this.editForm);
    if (countyCode.id !== null) {
      this.subscribeToSaveResponse(this.countyCodeService.update(countyCode));
    } else {
      this.subscribeToSaveResponse(this.countyCodeService.create(countyCode));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICountyCode>>): void {
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

  protected updateForm(countyCode: ICountyCode): void {
    this.countyCode = countyCode;
    this.countyCodeFormService.resetForm(this.editForm, countyCode);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(countyCode.placeholders ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(placeholders, ...(this.countyCode?.placeholders ?? []))
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
