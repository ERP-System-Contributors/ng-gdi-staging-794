import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { NatureOfCustomerComplaintsFormService, NatureOfCustomerComplaintsFormGroup } from './nature-of-customer-complaints-form.service';
import { INatureOfCustomerComplaints } from '../nature-of-customer-complaints.model';
import { NatureOfCustomerComplaintsService } from '../service/nature-of-customer-complaints.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-nature-of-customer-complaints-update',
  templateUrl: './nature-of-customer-complaints-update.component.html',
})
export class NatureOfCustomerComplaintsUpdateComponent implements OnInit {
  isSaving = false;
  natureOfCustomerComplaints: INatureOfCustomerComplaints | null = null;

  editForm: NatureOfCustomerComplaintsFormGroup = this.natureOfCustomerComplaintsFormService.createNatureOfCustomerComplaintsFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected natureOfCustomerComplaintsService: NatureOfCustomerComplaintsService,
    protected natureOfCustomerComplaintsFormService: NatureOfCustomerComplaintsFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ natureOfCustomerComplaints }) => {
      this.natureOfCustomerComplaints = natureOfCustomerComplaints;
      if (natureOfCustomerComplaints) {
        this.updateForm(natureOfCustomerComplaints);
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
    const natureOfCustomerComplaints = this.natureOfCustomerComplaintsFormService.getNatureOfCustomerComplaints(this.editForm);
    if (natureOfCustomerComplaints.id !== null) {
      this.subscribeToSaveResponse(this.natureOfCustomerComplaintsService.update(natureOfCustomerComplaints));
    } else {
      this.subscribeToSaveResponse(this.natureOfCustomerComplaintsService.create(natureOfCustomerComplaints));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INatureOfCustomerComplaints>>): void {
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

  protected updateForm(natureOfCustomerComplaints: INatureOfCustomerComplaints): void {
    this.natureOfCustomerComplaints = natureOfCustomerComplaints;
    this.natureOfCustomerComplaintsFormService.resetForm(this.editForm, natureOfCustomerComplaints);
  }
}
