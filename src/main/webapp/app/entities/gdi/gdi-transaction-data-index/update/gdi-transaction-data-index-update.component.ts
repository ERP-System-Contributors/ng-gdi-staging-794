import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { GdiTransactionDataIndexFormService, GdiTransactionDataIndexFormGroup } from './gdi-transaction-data-index-form.service';
import { IGdiTransactionDataIndex } from '../gdi-transaction-data-index.model';
import { GdiTransactionDataIndexService } from '../service/gdi-transaction-data-index.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IGdiMasterDataIndex } from 'app/entities/gdi/gdi-master-data-index/gdi-master-data-index.model';
import { GdiMasterDataIndexService } from 'app/entities/gdi/gdi-master-data-index/service/gdi-master-data-index.service';
import { UpdateFrequencyTypes } from 'app/entities/enumerations/update-frequency-types.model';
import { DatasetBehaviorTypes } from 'app/entities/enumerations/dataset-behavior-types.model';

@Component({
  selector: 'jhi-gdi-transaction-data-index-update',
  templateUrl: './gdi-transaction-data-index-update.component.html',
})
export class GdiTransactionDataIndexUpdateComponent implements OnInit {
  isSaving = false;
  gdiTransactionDataIndex: IGdiTransactionDataIndex | null = null;
  updateFrequencyTypesValues = Object.keys(UpdateFrequencyTypes);
  datasetBehaviorTypesValues = Object.keys(DatasetBehaviorTypes);

  gdiMasterDataIndicesSharedCollection: IGdiMasterDataIndex[] = [];

  editForm: GdiTransactionDataIndexFormGroup = this.gdiTransactionDataIndexFormService.createGdiTransactionDataIndexFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected gdiTransactionDataIndexService: GdiTransactionDataIndexService,
    protected gdiTransactionDataIndexFormService: GdiTransactionDataIndexFormService,
    protected gdiMasterDataIndexService: GdiMasterDataIndexService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareGdiMasterDataIndex = (o1: IGdiMasterDataIndex | null, o2: IGdiMasterDataIndex | null): boolean =>
    this.gdiMasterDataIndexService.compareGdiMasterDataIndex(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gdiTransactionDataIndex }) => {
      this.gdiTransactionDataIndex = gdiTransactionDataIndex;
      if (gdiTransactionDataIndex) {
        this.updateForm(gdiTransactionDataIndex);
      }

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('ngGdiStaging794App.error', { message: err.message })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const gdiTransactionDataIndex = this.gdiTransactionDataIndexFormService.getGdiTransactionDataIndex(this.editForm);
    if (gdiTransactionDataIndex.id !== null) {
      this.subscribeToSaveResponse(this.gdiTransactionDataIndexService.update(gdiTransactionDataIndex));
    } else {
      this.subscribeToSaveResponse(this.gdiTransactionDataIndexService.create(gdiTransactionDataIndex));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGdiTransactionDataIndex>>): void {
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

  protected updateForm(gdiTransactionDataIndex: IGdiTransactionDataIndex): void {
    this.gdiTransactionDataIndex = gdiTransactionDataIndex;
    this.gdiTransactionDataIndexFormService.resetForm(this.editForm, gdiTransactionDataIndex);

    this.gdiMasterDataIndicesSharedCollection =
      this.gdiMasterDataIndexService.addGdiMasterDataIndexToCollectionIfMissing<IGdiMasterDataIndex>(
        this.gdiMasterDataIndicesSharedCollection,
        ...(gdiTransactionDataIndex.masterDataItems ?? [])
      );
  }

  protected loadRelationshipsOptions(): void {
    this.gdiMasterDataIndexService
      .query()
      .pipe(map((res: HttpResponse<IGdiMasterDataIndex[]>) => res.body ?? []))
      .pipe(
        map((gdiMasterDataIndices: IGdiMasterDataIndex[]) =>
          this.gdiMasterDataIndexService.addGdiMasterDataIndexToCollectionIfMissing<IGdiMasterDataIndex>(
            gdiMasterDataIndices,
            ...(this.gdiTransactionDataIndex?.masterDataItems ?? [])
          )
        )
      )
      .subscribe((gdiMasterDataIndices: IGdiMasterDataIndex[]) => (this.gdiMasterDataIndicesSharedCollection = gdiMasterDataIndices));
  }
}
