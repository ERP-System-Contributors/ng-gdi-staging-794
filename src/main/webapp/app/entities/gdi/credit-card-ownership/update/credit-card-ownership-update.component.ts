import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CreditCardOwnershipFormService, CreditCardOwnershipFormGroup } from './credit-card-ownership-form.service';
import { ICreditCardOwnership } from '../credit-card-ownership.model';
import { CreditCardOwnershipService } from '../service/credit-card-ownership.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { CreditCardOwnershipTypes } from 'app/entities/enumerations/credit-card-ownership-types.model';

@Component({
  selector: 'jhi-credit-card-ownership-update',
  templateUrl: './credit-card-ownership-update.component.html',
})
export class CreditCardOwnershipUpdateComponent implements OnInit {
  isSaving = false;
  creditCardOwnership: ICreditCardOwnership | null = null;
  creditCardOwnershipTypesValues = Object.keys(CreditCardOwnershipTypes);

  editForm: CreditCardOwnershipFormGroup = this.creditCardOwnershipFormService.createCreditCardOwnershipFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected creditCardOwnershipService: CreditCardOwnershipService,
    protected creditCardOwnershipFormService: CreditCardOwnershipFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ creditCardOwnership }) => {
      this.creditCardOwnership = creditCardOwnership;
      if (creditCardOwnership) {
        this.updateForm(creditCardOwnership);
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
    const creditCardOwnership = this.creditCardOwnershipFormService.getCreditCardOwnership(this.editForm);
    if (creditCardOwnership.id !== null) {
      this.subscribeToSaveResponse(this.creditCardOwnershipService.update(creditCardOwnership));
    } else {
      this.subscribeToSaveResponse(this.creditCardOwnershipService.create(creditCardOwnership));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICreditCardOwnership>>): void {
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

  protected updateForm(creditCardOwnership: ICreditCardOwnership): void {
    this.creditCardOwnership = creditCardOwnership;
    this.creditCardOwnershipFormService.resetForm(this.editForm, creditCardOwnership);
  }
}
