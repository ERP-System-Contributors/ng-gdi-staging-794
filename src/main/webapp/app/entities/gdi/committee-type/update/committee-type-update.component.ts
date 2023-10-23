import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CommitteeTypeFormService, CommitteeTypeFormGroup } from './committee-type-form.service';
import { ICommitteeType } from '../committee-type.model';
import { CommitteeTypeService } from '../service/committee-type.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-committee-type-update',
  templateUrl: './committee-type-update.component.html',
})
export class CommitteeTypeUpdateComponent implements OnInit {
  isSaving = false;
  committeeType: ICommitteeType | null = null;

  editForm: CommitteeTypeFormGroup = this.committeeTypeFormService.createCommitteeTypeFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected committeeTypeService: CommitteeTypeService,
    protected committeeTypeFormService: CommitteeTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ committeeType }) => {
      this.committeeType = committeeType;
      if (committeeType) {
        this.updateForm(committeeType);
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
    const committeeType = this.committeeTypeFormService.getCommitteeType(this.editForm);
    if (committeeType.id !== null) {
      this.subscribeToSaveResponse(this.committeeTypeService.update(committeeType));
    } else {
      this.subscribeToSaveResponse(this.committeeTypeService.create(committeeType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommitteeType>>): void {
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

  protected updateForm(committeeType: ICommitteeType): void {
    this.committeeType = committeeType;
    this.committeeTypeFormService.resetForm(this.editForm, committeeType);
  }
}
