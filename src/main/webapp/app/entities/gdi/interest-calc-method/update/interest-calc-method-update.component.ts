import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { InterestCalcMethodFormService, InterestCalcMethodFormGroup } from './interest-calc-method-form.service';
import { IInterestCalcMethod } from '../interest-calc-method.model';
import { InterestCalcMethodService } from '../service/interest-calc-method.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-interest-calc-method-update',
  templateUrl: './interest-calc-method-update.component.html',
})
export class InterestCalcMethodUpdateComponent implements OnInit {
  isSaving = false;
  interestCalcMethod: IInterestCalcMethod | null = null;

  editForm: InterestCalcMethodFormGroup = this.interestCalcMethodFormService.createInterestCalcMethodFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected interestCalcMethodService: InterestCalcMethodService,
    protected interestCalcMethodFormService: InterestCalcMethodFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ interestCalcMethod }) => {
      this.interestCalcMethod = interestCalcMethod;
      if (interestCalcMethod) {
        this.updateForm(interestCalcMethod);
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
    const interestCalcMethod = this.interestCalcMethodFormService.getInterestCalcMethod(this.editForm);
    if (interestCalcMethod.id !== null) {
      this.subscribeToSaveResponse(this.interestCalcMethodService.update(interestCalcMethod));
    } else {
      this.subscribeToSaveResponse(this.interestCalcMethodService.create(interestCalcMethod));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInterestCalcMethod>>): void {
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

  protected updateForm(interestCalcMethod: IInterestCalcMethod): void {
    this.interestCalcMethod = interestCalcMethod;
    this.interestCalcMethodFormService.resetForm(this.editForm, interestCalcMethod);
  }
}
