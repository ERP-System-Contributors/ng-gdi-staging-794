import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ContractStatusFormService, ContractStatusFormGroup } from './contract-status-form.service';
import { IContractStatus } from '../contract-status.model';
import { ContractStatusService } from '../service/contract-status.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-contract-status-update',
  templateUrl: './contract-status-update.component.html',
})
export class ContractStatusUpdateComponent implements OnInit {
  isSaving = false;
  contractStatus: IContractStatus | null = null;

  editForm: ContractStatusFormGroup = this.contractStatusFormService.createContractStatusFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected contractStatusService: ContractStatusService,
    protected contractStatusFormService: ContractStatusFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contractStatus }) => {
      this.contractStatus = contractStatus;
      if (contractStatus) {
        this.updateForm(contractStatus);
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
    const contractStatus = this.contractStatusFormService.getContractStatus(this.editForm);
    if (contractStatus.id !== null) {
      this.subscribeToSaveResponse(this.contractStatusService.update(contractStatus));
    } else {
      this.subscribeToSaveResponse(this.contractStatusService.create(contractStatus));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContractStatus>>): void {
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

  protected updateForm(contractStatus: IContractStatus): void {
    this.contractStatus = contractStatus;
    this.contractStatusFormService.resetForm(this.editForm, contractStatus);
  }
}
