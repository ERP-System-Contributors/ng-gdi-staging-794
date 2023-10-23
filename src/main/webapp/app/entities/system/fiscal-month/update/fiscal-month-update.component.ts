import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { FiscalMonthFormService, FiscalMonthFormGroup } from './fiscal-month-form.service';
import { IFiscalMonth } from '../fiscal-month.model';
import { FiscalMonthService } from '../service/fiscal-month.service';
import { IFiscalYear } from 'app/entities/system/fiscal-year/fiscal-year.model';
import { FiscalYearService } from 'app/entities/system/fiscal-year/service/fiscal-year.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IUniversallyUniqueMapping } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/gdi/universally-unique-mapping/service/universally-unique-mapping.service';
import { IFiscalQuarter } from 'app/entities/system/fiscal-quarter/fiscal-quarter.model';
import { FiscalQuarterService } from 'app/entities/system/fiscal-quarter/service/fiscal-quarter.service';

@Component({
  selector: 'jhi-fiscal-month-update',
  templateUrl: './fiscal-month-update.component.html',
})
export class FiscalMonthUpdateComponent implements OnInit {
  isSaving = false;
  fiscalMonth: IFiscalMonth | null = null;

  fiscalYearsSharedCollection: IFiscalYear[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];
  universallyUniqueMappingsSharedCollection: IUniversallyUniqueMapping[] = [];
  fiscalQuartersSharedCollection: IFiscalQuarter[] = [];

  editForm: FiscalMonthFormGroup = this.fiscalMonthFormService.createFiscalMonthFormGroup();

  constructor(
    protected fiscalMonthService: FiscalMonthService,
    protected fiscalMonthFormService: FiscalMonthFormService,
    protected fiscalYearService: FiscalYearService,
    protected placeholderService: PlaceholderService,
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
    protected fiscalQuarterService: FiscalQuarterService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareFiscalYear = (o1: IFiscalYear | null, o2: IFiscalYear | null): boolean => this.fiscalYearService.compareFiscalYear(o1, o2);

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  compareUniversallyUniqueMapping = (o1: IUniversallyUniqueMapping | null, o2: IUniversallyUniqueMapping | null): boolean =>
    this.universallyUniqueMappingService.compareUniversallyUniqueMapping(o1, o2);

  compareFiscalQuarter = (o1: IFiscalQuarter | null, o2: IFiscalQuarter | null): boolean =>
    this.fiscalQuarterService.compareFiscalQuarter(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fiscalMonth }) => {
      this.fiscalMonth = fiscalMonth;
      if (fiscalMonth) {
        this.updateForm(fiscalMonth);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fiscalMonth = this.fiscalMonthFormService.getFiscalMonth(this.editForm);
    if (fiscalMonth.id !== null) {
      this.subscribeToSaveResponse(this.fiscalMonthService.update(fiscalMonth));
    } else {
      this.subscribeToSaveResponse(this.fiscalMonthService.create(fiscalMonth));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFiscalMonth>>): void {
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

  protected updateForm(fiscalMonth: IFiscalMonth): void {
    this.fiscalMonth = fiscalMonth;
    this.fiscalMonthFormService.resetForm(this.editForm, fiscalMonth);

    this.fiscalYearsSharedCollection = this.fiscalYearService.addFiscalYearToCollectionIfMissing<IFiscalYear>(
      this.fiscalYearsSharedCollection,
      fiscalMonth.fiscalYear
    );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(fiscalMonth.placeholders ?? [])
    );
    this.universallyUniqueMappingsSharedCollection =
      this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
        this.universallyUniqueMappingsSharedCollection,
        ...(fiscalMonth.universallyUniqueMappings ?? [])
      );
    this.fiscalQuartersSharedCollection = this.fiscalQuarterService.addFiscalQuarterToCollectionIfMissing<IFiscalQuarter>(
      this.fiscalQuartersSharedCollection,
      fiscalMonth.fiscalQuarter
    );
  }

  protected loadRelationshipsOptions(): void {
    this.fiscalYearService
      .query()
      .pipe(map((res: HttpResponse<IFiscalYear[]>) => res.body ?? []))
      .pipe(
        map((fiscalYears: IFiscalYear[]) =>
          this.fiscalYearService.addFiscalYearToCollectionIfMissing<IFiscalYear>(fiscalYears, this.fiscalMonth?.fiscalYear)
        )
      )
      .subscribe((fiscalYears: IFiscalYear[]) => (this.fiscalYearsSharedCollection = fiscalYears));

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(placeholders, ...(this.fiscalMonth?.placeholders ?? []))
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));

    this.universallyUniqueMappingService
      .query()
      .pipe(map((res: HttpResponse<IUniversallyUniqueMapping[]>) => res.body ?? []))
      .pipe(
        map((universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
            universallyUniqueMappings,
            ...(this.fiscalMonth?.universallyUniqueMappings ?? [])
          )
        )
      )
      .subscribe(
        (universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          (this.universallyUniqueMappingsSharedCollection = universallyUniqueMappings)
      );

    this.fiscalQuarterService
      .query()
      .pipe(map((res: HttpResponse<IFiscalQuarter[]>) => res.body ?? []))
      .pipe(
        map((fiscalQuarters: IFiscalQuarter[]) =>
          this.fiscalQuarterService.addFiscalQuarterToCollectionIfMissing<IFiscalQuarter>(fiscalQuarters, this.fiscalMonth?.fiscalQuarter)
        )
      )
      .subscribe((fiscalQuarters: IFiscalQuarter[]) => (this.fiscalQuartersSharedCollection = fiscalQuarters));
  }
}
