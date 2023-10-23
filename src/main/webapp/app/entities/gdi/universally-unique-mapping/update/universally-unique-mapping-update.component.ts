import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { UniversallyUniqueMappingFormService, UniversallyUniqueMappingFormGroup } from './universally-unique-mapping-form.service';
import { IUniversallyUniqueMapping } from '../universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from '../service/universally-unique-mapping.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

@Component({
  selector: 'jhi-universally-unique-mapping-update',
  templateUrl: './universally-unique-mapping-update.component.html',
})
export class UniversallyUniqueMappingUpdateComponent implements OnInit {
  isSaving = false;
  universallyUniqueMapping: IUniversallyUniqueMapping | null = null;

  universallyUniqueMappingsSharedCollection: IUniversallyUniqueMapping[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: UniversallyUniqueMappingFormGroup = this.universallyUniqueMappingFormService.createUniversallyUniqueMappingFormGroup();

  constructor(
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
    protected universallyUniqueMappingFormService: UniversallyUniqueMappingFormService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUniversallyUniqueMapping = (o1: IUniversallyUniqueMapping | null, o2: IUniversallyUniqueMapping | null): boolean =>
    this.universallyUniqueMappingService.compareUniversallyUniqueMapping(o1, o2);

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ universallyUniqueMapping }) => {
      this.universallyUniqueMapping = universallyUniqueMapping;
      if (universallyUniqueMapping) {
        this.updateForm(universallyUniqueMapping);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const universallyUniqueMapping = this.universallyUniqueMappingFormService.getUniversallyUniqueMapping(this.editForm);
    if (universallyUniqueMapping.id !== null) {
      this.subscribeToSaveResponse(this.universallyUniqueMappingService.update(universallyUniqueMapping));
    } else {
      this.subscribeToSaveResponse(this.universallyUniqueMappingService.create(universallyUniqueMapping));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUniversallyUniqueMapping>>): void {
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

  protected updateForm(universallyUniqueMapping: IUniversallyUniqueMapping): void {
    this.universallyUniqueMapping = universallyUniqueMapping;
    this.universallyUniqueMappingFormService.resetForm(this.editForm, universallyUniqueMapping);

    this.universallyUniqueMappingsSharedCollection =
      this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
        this.universallyUniqueMappingsSharedCollection,
        universallyUniqueMapping.parentMapping
      );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(universallyUniqueMapping.placeholders ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.universallyUniqueMappingService
      .query()
      .pipe(map((res: HttpResponse<IUniversallyUniqueMapping[]>) => res.body ?? []))
      .pipe(
        map((universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
            universallyUniqueMappings,
            this.universallyUniqueMapping?.parentMapping
          )
        )
      )
      .subscribe(
        (universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          (this.universallyUniqueMappingsSharedCollection = universallyUniqueMappings)
      );

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
            placeholders,
            ...(this.universallyUniqueMapping?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
