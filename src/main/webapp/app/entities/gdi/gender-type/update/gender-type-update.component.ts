import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { GenderTypeFormService, GenderTypeFormGroup } from './gender-type-form.service';
import { IGenderType } from '../gender-type.model';
import { GenderTypeService } from '../service/gender-type.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { genderTypes } from 'app/entities/enumerations/gender-types.model';

@Component({
  selector: 'jhi-gender-type-update',
  templateUrl: './gender-type-update.component.html',
})
export class GenderTypeUpdateComponent implements OnInit {
  isSaving = false;
  genderType: IGenderType | null = null;
  genderTypesValues = Object.keys(genderTypes);

  editForm: GenderTypeFormGroup = this.genderTypeFormService.createGenderTypeFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected genderTypeService: GenderTypeService,
    protected genderTypeFormService: GenderTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ genderType }) => {
      this.genderType = genderType;
      if (genderType) {
        this.updateForm(genderType);
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
    const genderType = this.genderTypeFormService.getGenderType(this.editForm);
    if (genderType.id !== null) {
      this.subscribeToSaveResponse(this.genderTypeService.update(genderType));
    } else {
      this.subscribeToSaveResponse(this.genderTypeService.create(genderType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGenderType>>): void {
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

  protected updateForm(genderType: IGenderType): void {
    this.genderType = genderType;
    this.genderTypeFormService.resetForm(this.editForm, genderType);
  }
}
