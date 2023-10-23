import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AcademicQualificationFormService, AcademicQualificationFormGroup } from './academic-qualification-form.service';
import { IAcademicQualification } from '../academic-qualification.model';
import { AcademicQualificationService } from '../service/academic-qualification.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-academic-qualification-update',
  templateUrl: './academic-qualification-update.component.html',
})
export class AcademicQualificationUpdateComponent implements OnInit {
  isSaving = false;
  academicQualification: IAcademicQualification | null = null;

  editForm: AcademicQualificationFormGroup = this.academicQualificationFormService.createAcademicQualificationFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected academicQualificationService: AcademicQualificationService,
    protected academicQualificationFormService: AcademicQualificationFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ academicQualification }) => {
      this.academicQualification = academicQualification;
      if (academicQualification) {
        this.updateForm(academicQualification);
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
    const academicQualification = this.academicQualificationFormService.getAcademicQualification(this.editForm);
    if (academicQualification.id !== null) {
      this.subscribeToSaveResponse(this.academicQualificationService.update(academicQualification));
    } else {
      this.subscribeToSaveResponse(this.academicQualificationService.create(academicQualification));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAcademicQualification>>): void {
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

  protected updateForm(academicQualification: IAcademicQualification): void {
    this.academicQualification = academicQualification;
    this.academicQualificationFormService.resetForm(this.editForm, academicQualification);
  }
}
