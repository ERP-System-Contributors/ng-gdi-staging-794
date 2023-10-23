import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CrbCustomerTypeFormService, CrbCustomerTypeFormGroup } from './crb-customer-type-form.service';
import { ICrbCustomerType } from '../crb-customer-type.model';
import { CrbCustomerTypeService } from '../service/crb-customer-type.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-crb-customer-type-update',
  templateUrl: './crb-customer-type-update.component.html',
})
export class CrbCustomerTypeUpdateComponent implements OnInit {
  isSaving = false;
  crbCustomerType: ICrbCustomerType | null = null;

  editForm: CrbCustomerTypeFormGroup = this.crbCustomerTypeFormService.createCrbCustomerTypeFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected crbCustomerTypeService: CrbCustomerTypeService,
    protected crbCustomerTypeFormService: CrbCustomerTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crbCustomerType }) => {
      this.crbCustomerType = crbCustomerType;
      if (crbCustomerType) {
        this.updateForm(crbCustomerType);
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
    const crbCustomerType = this.crbCustomerTypeFormService.getCrbCustomerType(this.editForm);
    if (crbCustomerType.id !== null) {
      this.subscribeToSaveResponse(this.crbCustomerTypeService.update(crbCustomerType));
    } else {
      this.subscribeToSaveResponse(this.crbCustomerTypeService.create(crbCustomerType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrbCustomerType>>): void {
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

  protected updateForm(crbCustomerType: ICrbCustomerType): void {
    this.crbCustomerType = crbCustomerType;
    this.crbCustomerTypeFormService.resetForm(this.editForm, crbCustomerType);
  }
}
