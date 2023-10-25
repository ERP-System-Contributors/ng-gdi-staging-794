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

import {
  PerformanceOfForeignSubsidiariesFormService,
  PerformanceOfForeignSubsidiariesFormGroup,
} from './performance-of-foreign-subsidiaries-form.service';
import { IPerformanceOfForeignSubsidiaries } from '../performance-of-foreign-subsidiaries.model';
import { PerformanceOfForeignSubsidiariesService } from '../service/performance-of-foreign-subsidiaries.service';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { InstitutionCodeService } from 'app/entities/gdi/institution-code/service/institution-code.service';
import { IIsoCountryCode } from 'app/entities/gdi/iso-country-code/iso-country-code.model';
import { IsoCountryCodeService } from 'app/entities/gdi/iso-country-code/service/iso-country-code.service';

@Component({
  selector: 'jhi-performance-of-foreign-subsidiaries-update',
  templateUrl: './performance-of-foreign-subsidiaries-update.component.html',
})
export class PerformanceOfForeignSubsidiariesUpdateComponent implements OnInit {
  isSaving = false;
  performanceOfForeignSubsidiaries: IPerformanceOfForeignSubsidiaries | null = null;

  institutionCodesSharedCollection: IInstitutionCode[] = [];
  isoCountryCodesSharedCollection: IIsoCountryCode[] = [];

  editForm: PerformanceOfForeignSubsidiariesFormGroup =
    this.performanceOfForeignSubsidiariesFormService.createPerformanceOfForeignSubsidiariesFormGroup();

  constructor(
    protected performanceOfForeignSubsidiariesService: PerformanceOfForeignSubsidiariesService,
    protected performanceOfForeignSubsidiariesFormService: PerformanceOfForeignSubsidiariesFormService,
    protected institutionCodeService: InstitutionCodeService,
    protected isoCountryCodeService: IsoCountryCodeService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareInstitutionCode = (o1: IInstitutionCode | null, o2: IInstitutionCode | null): boolean =>
    this.institutionCodeService.compareInstitutionCode(o1, o2);

  compareIsoCountryCode = (o1: IIsoCountryCode | null, o2: IIsoCountryCode | null): boolean =>
    this.isoCountryCodeService.compareIsoCountryCode(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ performanceOfForeignSubsidiaries }) => {
      this.performanceOfForeignSubsidiaries = performanceOfForeignSubsidiaries;
      if (performanceOfForeignSubsidiaries) {
        this.updateForm(performanceOfForeignSubsidiaries);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const performanceOfForeignSubsidiaries = this.performanceOfForeignSubsidiariesFormService.getPerformanceOfForeignSubsidiaries(
      this.editForm
    );
    if (performanceOfForeignSubsidiaries.id !== null) {
      this.subscribeToSaveResponse(this.performanceOfForeignSubsidiariesService.update(performanceOfForeignSubsidiaries));
    } else {
      this.subscribeToSaveResponse(this.performanceOfForeignSubsidiariesService.create(performanceOfForeignSubsidiaries));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPerformanceOfForeignSubsidiaries>>): void {
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

  protected updateForm(performanceOfForeignSubsidiaries: IPerformanceOfForeignSubsidiaries): void {
    this.performanceOfForeignSubsidiaries = performanceOfForeignSubsidiaries;
    this.performanceOfForeignSubsidiariesFormService.resetForm(this.editForm, performanceOfForeignSubsidiaries);

    this.institutionCodesSharedCollection = this.institutionCodeService.addInstitutionCodeToCollectionIfMissing<IInstitutionCode>(
      this.institutionCodesSharedCollection,
      performanceOfForeignSubsidiaries.bankCode
    );
    this.isoCountryCodesSharedCollection = this.isoCountryCodeService.addIsoCountryCodeToCollectionIfMissing<IIsoCountryCode>(
      this.isoCountryCodesSharedCollection,
      performanceOfForeignSubsidiaries.subsidiaryCountryCode
    );
  }

  protected loadRelationshipsOptions(): void {
    this.institutionCodeService
      .query()
      .pipe(map((res: HttpResponse<IInstitutionCode[]>) => res.body ?? []))
      .pipe(
        map((institutionCodes: IInstitutionCode[]) =>
          this.institutionCodeService.addInstitutionCodeToCollectionIfMissing<IInstitutionCode>(
            institutionCodes,
            this.performanceOfForeignSubsidiaries?.bankCode
          )
        )
      )
      .subscribe((institutionCodes: IInstitutionCode[]) => (this.institutionCodesSharedCollection = institutionCodes));

    this.isoCountryCodeService
      .query()
      .pipe(map((res: HttpResponse<IIsoCountryCode[]>) => res.body ?? []))
      .pipe(
        map((isoCountryCodes: IIsoCountryCode[]) =>
          this.isoCountryCodeService.addIsoCountryCodeToCollectionIfMissing<IIsoCountryCode>(
            isoCountryCodes,
            this.performanceOfForeignSubsidiaries?.subsidiaryCountryCode
          )
        )
      )
      .subscribe((isoCountryCodes: IIsoCountryCode[]) => (this.isoCountryCodesSharedCollection = isoCountryCodes));
  }
}
