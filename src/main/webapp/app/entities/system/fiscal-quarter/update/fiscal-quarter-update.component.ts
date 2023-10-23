import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { FiscalQuarterFormService, FiscalQuarterFormGroup } from './fiscal-quarter-form.service';
import { IFiscalQuarter } from '../fiscal-quarter.model';
import { FiscalQuarterService } from '../service/fiscal-quarter.service';
import { IFiscalYear } from 'app/entities/system/fiscal-year/fiscal-year.model';
import { FiscalYearService } from 'app/entities/system/fiscal-year/service/fiscal-year.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IUniversallyUniqueMapping } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/gdi/universally-unique-mapping/service/universally-unique-mapping.service';

@Component({
  selector: 'jhi-fiscal-quarter-update',
  templateUrl: './fiscal-quarter-update.component.html',
})
export class FiscalQuarterUpdateComponent implements OnInit {
  isSaving = false;
  fiscalQuarter: IFiscalQuarter | null = null;

  fiscalYearsSharedCollection: IFiscalYear[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];
  universallyUniqueMappingsSharedCollection: IUniversallyUniqueMapping[] = [];

  editForm: FiscalQuarterFormGroup = this.fiscalQuarterFormService.createFiscalQuarterFormGroup();

  constructor(
    protected fiscalQuarterService: FiscalQuarterService,
    protected fiscalQuarterFormService: FiscalQuarterFormService,
    protected fiscalYearService: FiscalYearService,
    protected placeholderService: PlaceholderService,
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareFiscalYear = (o1: IFiscalYear | null, o2: IFiscalYear | null): boolean => this.fiscalYearService.compareFiscalYear(o1, o2);

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  compareUniversallyUniqueMapping = (o1: IUniversallyUniqueMapping | null, o2: IUniversallyUniqueMapping | null): boolean =>
    this.universallyUniqueMappingService.compareUniversallyUniqueMapping(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fiscalQuarter }) => {
      this.fiscalQuarter = fiscalQuarter;
      if (fiscalQuarter) {
        this.updateForm(fiscalQuarter);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fiscalQuarter = this.fiscalQuarterFormService.getFiscalQuarter(this.editForm);
    if (fiscalQuarter.id !== null) {
      this.subscribeToSaveResponse(this.fiscalQuarterService.update(fiscalQuarter));
    } else {
      this.subscribeToSaveResponse(this.fiscalQuarterService.create(fiscalQuarter));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFiscalQuarter>>): void {
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

  protected updateForm(fiscalQuarter: IFiscalQuarter): void {
    this.fiscalQuarter = fiscalQuarter;
    this.fiscalQuarterFormService.resetForm(this.editForm, fiscalQuarter);

    this.fiscalYearsSharedCollection = this.fiscalYearService.addFiscalYearToCollectionIfMissing<IFiscalYear>(
      this.fiscalYearsSharedCollection,
      fiscalQuarter.fiscalYear
    );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(fiscalQuarter.placeholders ?? [])
    );
    this.universallyUniqueMappingsSharedCollection =
      this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
        this.universallyUniqueMappingsSharedCollection,
        ...(fiscalQuarter.universallyUniqueMappings ?? [])
      );
  }

  protected loadRelationshipsOptions(): void {
    this.fiscalYearService
      .query()
      .pipe(map((res: HttpResponse<IFiscalYear[]>) => res.body ?? []))
      .pipe(
        map((fiscalYears: IFiscalYear[]) =>
          this.fiscalYearService.addFiscalYearToCollectionIfMissing<IFiscalYear>(fiscalYears, this.fiscalQuarter?.fiscalYear)
        )
      )
      .subscribe((fiscalYears: IFiscalYear[]) => (this.fiscalYearsSharedCollection = fiscalYears));

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
            placeholders,
            ...(this.fiscalQuarter?.placeholders ?? [])
          )
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
            ...(this.fiscalQuarter?.universallyUniqueMappings ?? [])
          )
        )
      )
      .subscribe(
        (universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          (this.universallyUniqueMappingsSharedCollection = universallyUniqueMappings)
      );
  }
}
