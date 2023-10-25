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

import { AccountAttributeMetadataFormService, AccountAttributeMetadataFormGroup } from './account-attribute-metadata-form.service';
import { IAccountAttributeMetadata } from '../account-attribute-metadata.model';
import { AccountAttributeMetadataService } from '../service/account-attribute-metadata.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IGdiMasterDataIndex } from 'app/entities/gdi/gdi-master-data-index/gdi-master-data-index.model';
import { GdiMasterDataIndexService } from 'app/entities/gdi/gdi-master-data-index/service/gdi-master-data-index.service';
import { MandatoryFieldFlagTypes } from 'app/entities/enumerations/mandatory-field-flag-types.model';

@Component({
  selector: 'jhi-account-attribute-metadata-update',
  templateUrl: './account-attribute-metadata-update.component.html',
})
export class AccountAttributeMetadataUpdateComponent implements OnInit {
  isSaving = false;
  accountAttributeMetadata: IAccountAttributeMetadata | null = null;
  mandatoryFieldFlagTypesValues = Object.keys(MandatoryFieldFlagTypes);

  gdiMasterDataIndicesSharedCollection: IGdiMasterDataIndex[] = [];

  editForm: AccountAttributeMetadataFormGroup = this.accountAttributeMetadataFormService.createAccountAttributeMetadataFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected accountAttributeMetadataService: AccountAttributeMetadataService,
    protected accountAttributeMetadataFormService: AccountAttributeMetadataFormService,
    protected gdiMasterDataIndexService: GdiMasterDataIndexService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareGdiMasterDataIndex = (o1: IGdiMasterDataIndex | null, o2: IGdiMasterDataIndex | null): boolean =>
    this.gdiMasterDataIndexService.compareGdiMasterDataIndex(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ accountAttributeMetadata }) => {
      this.accountAttributeMetadata = accountAttributeMetadata;
      if (accountAttributeMetadata) {
        this.updateForm(accountAttributeMetadata);
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
    const accountAttributeMetadata = this.accountAttributeMetadataFormService.getAccountAttributeMetadata(this.editForm);
    if (accountAttributeMetadata.id !== null) {
      this.subscribeToSaveResponse(this.accountAttributeMetadataService.update(accountAttributeMetadata));
    } else {
      this.subscribeToSaveResponse(this.accountAttributeMetadataService.create(accountAttributeMetadata));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAccountAttributeMetadata>>): void {
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

  protected updateForm(accountAttributeMetadata: IAccountAttributeMetadata): void {
    this.accountAttributeMetadata = accountAttributeMetadata;
    this.accountAttributeMetadataFormService.resetForm(this.editForm, accountAttributeMetadata);

    this.gdiMasterDataIndicesSharedCollection =
      this.gdiMasterDataIndexService.addGdiMasterDataIndexToCollectionIfMissing<IGdiMasterDataIndex>(
        this.gdiMasterDataIndicesSharedCollection,
        accountAttributeMetadata.standardInputTemplate
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
            this.accountAttributeMetadata?.standardInputTemplate
          )
        )
      )
      .subscribe((gdiMasterDataIndices: IGdiMasterDataIndex[]) => (this.gdiMasterDataIndicesSharedCollection = gdiMasterDataIndices));
  }
}
