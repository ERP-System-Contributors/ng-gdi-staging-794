import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ShareHoldingFlagFormService, ShareHoldingFlagFormGroup } from './share-holding-flag-form.service';
import { IShareHoldingFlag } from '../share-holding-flag.model';
import { ShareHoldingFlagService } from '../service/share-holding-flag.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { ShareholdingFlagTypes } from 'app/entities/enumerations/shareholding-flag-types.model';

@Component({
  selector: 'jhi-share-holding-flag-update',
  templateUrl: './share-holding-flag-update.component.html',
})
export class ShareHoldingFlagUpdateComponent implements OnInit {
  isSaving = false;
  shareHoldingFlag: IShareHoldingFlag | null = null;
  shareholdingFlagTypesValues = Object.keys(ShareholdingFlagTypes);

  editForm: ShareHoldingFlagFormGroup = this.shareHoldingFlagFormService.createShareHoldingFlagFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected shareHoldingFlagService: ShareHoldingFlagService,
    protected shareHoldingFlagFormService: ShareHoldingFlagFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shareHoldingFlag }) => {
      this.shareHoldingFlag = shareHoldingFlag;
      if (shareHoldingFlag) {
        this.updateForm(shareHoldingFlag);
      }
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
    const shareHoldingFlag = this.shareHoldingFlagFormService.getShareHoldingFlag(this.editForm);
    if (shareHoldingFlag.id !== null) {
      this.subscribeToSaveResponse(this.shareHoldingFlagService.update(shareHoldingFlag));
    } else {
      this.subscribeToSaveResponse(this.shareHoldingFlagService.create(shareHoldingFlag));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShareHoldingFlag>>): void {
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

  protected updateForm(shareHoldingFlag: IShareHoldingFlag): void {
    this.shareHoldingFlag = shareHoldingFlag;
    this.shareHoldingFlagFormService.resetForm(this.editForm, shareHoldingFlag);
  }
}
