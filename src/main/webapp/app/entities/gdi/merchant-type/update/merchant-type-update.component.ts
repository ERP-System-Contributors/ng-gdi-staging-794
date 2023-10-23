import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { MerchantTypeFormService, MerchantTypeFormGroup } from './merchant-type-form.service';
import { IMerchantType } from '../merchant-type.model';
import { MerchantTypeService } from '../service/merchant-type.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-merchant-type-update',
  templateUrl: './merchant-type-update.component.html',
})
export class MerchantTypeUpdateComponent implements OnInit {
  isSaving = false;
  merchantType: IMerchantType | null = null;

  editForm: MerchantTypeFormGroup = this.merchantTypeFormService.createMerchantTypeFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected merchantTypeService: MerchantTypeService,
    protected merchantTypeFormService: MerchantTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ merchantType }) => {
      this.merchantType = merchantType;
      if (merchantType) {
        this.updateForm(merchantType);
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
    const merchantType = this.merchantTypeFormService.getMerchantType(this.editForm);
    if (merchantType.id !== null) {
      this.subscribeToSaveResponse(this.merchantTypeService.update(merchantType));
    } else {
      this.subscribeToSaveResponse(this.merchantTypeService.create(merchantType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMerchantType>>): void {
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

  protected updateForm(merchantType: IMerchantType): void {
    this.merchantType = merchantType;
    this.merchantTypeFormService.resetForm(this.editForm, merchantType);
  }
}
