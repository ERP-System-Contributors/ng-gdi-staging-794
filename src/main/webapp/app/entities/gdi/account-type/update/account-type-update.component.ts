import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AccountTypeFormService, AccountTypeFormGroup } from './account-type-form.service';
import { IAccountType } from '../account-type.model';
import { AccountTypeService } from '../service/account-type.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-account-type-update',
  templateUrl: './account-type-update.component.html',
})
export class AccountTypeUpdateComponent implements OnInit {
  isSaving = false;
  accountType: IAccountType | null = null;

  editForm: AccountTypeFormGroup = this.accountTypeFormService.createAccountTypeFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected accountTypeService: AccountTypeService,
    protected accountTypeFormService: AccountTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ accountType }) => {
      this.accountType = accountType;
      if (accountType) {
        this.updateForm(accountType);
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
    const accountType = this.accountTypeFormService.getAccountType(this.editForm);
    if (accountType.id !== null) {
      this.subscribeToSaveResponse(this.accountTypeService.update(accountType));
    } else {
      this.subscribeToSaveResponse(this.accountTypeService.create(accountType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAccountType>>): void {
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

  protected updateForm(accountType: IAccountType): void {
    this.accountType = accountType;
    this.accountTypeFormService.resetForm(this.editForm, accountType);
  }
}
