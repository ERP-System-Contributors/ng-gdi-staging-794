import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CustomerTypeFormService, CustomerTypeFormGroup } from './customer-type-form.service';
import { ICustomerType } from '../customer-type.model';
import { CustomerTypeService } from '../service/customer-type.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-customer-type-update',
  templateUrl: './customer-type-update.component.html',
})
export class CustomerTypeUpdateComponent implements OnInit {
  isSaving = false;
  customerType: ICustomerType | null = null;

  editForm: CustomerTypeFormGroup = this.customerTypeFormService.createCustomerTypeFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected customerTypeService: CustomerTypeService,
    protected customerTypeFormService: CustomerTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerType }) => {
      this.customerType = customerType;
      if (customerType) {
        this.updateForm(customerType);
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
    const customerType = this.customerTypeFormService.getCustomerType(this.editForm);
    if (customerType.id !== null) {
      this.subscribeToSaveResponse(this.customerTypeService.update(customerType));
    } else {
      this.subscribeToSaveResponse(this.customerTypeService.create(customerType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerType>>): void {
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

  protected updateForm(customerType: ICustomerType): void {
    this.customerType = customerType;
    this.customerTypeFormService.resetForm(this.editForm, customerType);
  }
}
