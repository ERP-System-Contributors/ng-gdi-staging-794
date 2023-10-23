import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import {
  CustomerComplaintStatusTypeFormService,
  CustomerComplaintStatusTypeFormGroup,
} from './customer-complaint-status-type-form.service';
import { ICustomerComplaintStatusType } from '../customer-complaint-status-type.model';
import { CustomerComplaintStatusTypeService } from '../service/customer-complaint-status-type.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-customer-complaint-status-type-update',
  templateUrl: './customer-complaint-status-type-update.component.html',
})
export class CustomerComplaintStatusTypeUpdateComponent implements OnInit {
  isSaving = false;
  customerComplaintStatusType: ICustomerComplaintStatusType | null = null;

  editForm: CustomerComplaintStatusTypeFormGroup = this.customerComplaintStatusTypeFormService.createCustomerComplaintStatusTypeFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected customerComplaintStatusTypeService: CustomerComplaintStatusTypeService,
    protected customerComplaintStatusTypeFormService: CustomerComplaintStatusTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerComplaintStatusType }) => {
      this.customerComplaintStatusType = customerComplaintStatusType;
      if (customerComplaintStatusType) {
        this.updateForm(customerComplaintStatusType);
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
    const customerComplaintStatusType = this.customerComplaintStatusTypeFormService.getCustomerComplaintStatusType(this.editForm);
    if (customerComplaintStatusType.id !== null) {
      this.subscribeToSaveResponse(this.customerComplaintStatusTypeService.update(customerComplaintStatusType));
    } else {
      this.subscribeToSaveResponse(this.customerComplaintStatusTypeService.create(customerComplaintStatusType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerComplaintStatusType>>): void {
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

  protected updateForm(customerComplaintStatusType: ICustomerComplaintStatusType): void {
    this.customerComplaintStatusType = customerComplaintStatusType;
    this.customerComplaintStatusTypeFormService.resetForm(this.editForm, customerComplaintStatusType);
  }
}
