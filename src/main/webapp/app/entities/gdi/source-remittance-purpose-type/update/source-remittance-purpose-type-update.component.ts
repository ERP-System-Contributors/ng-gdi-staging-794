import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import {
  SourceRemittancePurposeTypeFormService,
  SourceRemittancePurposeTypeFormGroup,
} from './source-remittance-purpose-type-form.service';
import { ISourceRemittancePurposeType } from '../source-remittance-purpose-type.model';
import { SourceRemittancePurposeTypeService } from '../service/source-remittance-purpose-type.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { SourceOrPurposeOfRemittancFlag } from 'app/entities/enumerations/source-or-purpose-of-remittanc-flag.model';

@Component({
  selector: 'jhi-source-remittance-purpose-type-update',
  templateUrl: './source-remittance-purpose-type-update.component.html',
})
export class SourceRemittancePurposeTypeUpdateComponent implements OnInit {
  isSaving = false;
  sourceRemittancePurposeType: ISourceRemittancePurposeType | null = null;
  sourceOrPurposeOfRemittancFlagValues = Object.keys(SourceOrPurposeOfRemittancFlag);

  editForm: SourceRemittancePurposeTypeFormGroup = this.sourceRemittancePurposeTypeFormService.createSourceRemittancePurposeTypeFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected sourceRemittancePurposeTypeService: SourceRemittancePurposeTypeService,
    protected sourceRemittancePurposeTypeFormService: SourceRemittancePurposeTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sourceRemittancePurposeType }) => {
      this.sourceRemittancePurposeType = sourceRemittancePurposeType;
      if (sourceRemittancePurposeType) {
        this.updateForm(sourceRemittancePurposeType);
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
    const sourceRemittancePurposeType = this.sourceRemittancePurposeTypeFormService.getSourceRemittancePurposeType(this.editForm);
    if (sourceRemittancePurposeType.id !== null) {
      this.subscribeToSaveResponse(this.sourceRemittancePurposeTypeService.update(sourceRemittancePurposeType));
    } else {
      this.subscribeToSaveResponse(this.sourceRemittancePurposeTypeService.create(sourceRemittancePurposeType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISourceRemittancePurposeType>>): void {
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

  protected updateForm(sourceRemittancePurposeType: ISourceRemittancePurposeType): void {
    this.sourceRemittancePurposeType = sourceRemittancePurposeType;
    this.sourceRemittancePurposeTypeFormService.resetForm(this.editForm, sourceRemittancePurposeType);
  }
}
