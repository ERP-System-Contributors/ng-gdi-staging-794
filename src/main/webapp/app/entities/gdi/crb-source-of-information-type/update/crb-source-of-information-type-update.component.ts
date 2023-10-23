import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CrbSourceOfInformationTypeFormService, CrbSourceOfInformationTypeFormGroup } from './crb-source-of-information-type-form.service';
import { ICrbSourceOfInformationType } from '../crb-source-of-information-type.model';
import { CrbSourceOfInformationTypeService } from '../service/crb-source-of-information-type.service';

@Component({
  selector: 'jhi-crb-source-of-information-type-update',
  templateUrl: './crb-source-of-information-type-update.component.html',
})
export class CrbSourceOfInformationTypeUpdateComponent implements OnInit {
  isSaving = false;
  crbSourceOfInformationType: ICrbSourceOfInformationType | null = null;

  editForm: CrbSourceOfInformationTypeFormGroup = this.crbSourceOfInformationTypeFormService.createCrbSourceOfInformationTypeFormGroup();

  constructor(
    protected crbSourceOfInformationTypeService: CrbSourceOfInformationTypeService,
    protected crbSourceOfInformationTypeFormService: CrbSourceOfInformationTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crbSourceOfInformationType }) => {
      this.crbSourceOfInformationType = crbSourceOfInformationType;
      if (crbSourceOfInformationType) {
        this.updateForm(crbSourceOfInformationType);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const crbSourceOfInformationType = this.crbSourceOfInformationTypeFormService.getCrbSourceOfInformationType(this.editForm);
    if (crbSourceOfInformationType.id !== null) {
      this.subscribeToSaveResponse(this.crbSourceOfInformationTypeService.update(crbSourceOfInformationType));
    } else {
      this.subscribeToSaveResponse(this.crbSourceOfInformationTypeService.create(crbSourceOfInformationType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrbSourceOfInformationType>>): void {
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

  protected updateForm(crbSourceOfInformationType: ICrbSourceOfInformationType): void {
    this.crbSourceOfInformationType = crbSourceOfInformationType;
    this.crbSourceOfInformationTypeFormService.resetForm(this.editForm, crbSourceOfInformationType);
  }
}
