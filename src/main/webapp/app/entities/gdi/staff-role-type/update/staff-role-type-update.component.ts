import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { StaffRoleTypeFormService, StaffRoleTypeFormGroup } from './staff-role-type-form.service';
import { IStaffRoleType } from '../staff-role-type.model';
import { StaffRoleTypeService } from '../service/staff-role-type.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-staff-role-type-update',
  templateUrl: './staff-role-type-update.component.html',
})
export class StaffRoleTypeUpdateComponent implements OnInit {
  isSaving = false;
  staffRoleType: IStaffRoleType | null = null;

  editForm: StaffRoleTypeFormGroup = this.staffRoleTypeFormService.createStaffRoleTypeFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected staffRoleTypeService: StaffRoleTypeService,
    protected staffRoleTypeFormService: StaffRoleTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ staffRoleType }) => {
      this.staffRoleType = staffRoleType;
      if (staffRoleType) {
        this.updateForm(staffRoleType);
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
    const staffRoleType = this.staffRoleTypeFormService.getStaffRoleType(this.editForm);
    if (staffRoleType.id !== null) {
      this.subscribeToSaveResponse(this.staffRoleTypeService.update(staffRoleType));
    } else {
      this.subscribeToSaveResponse(this.staffRoleTypeService.create(staffRoleType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStaffRoleType>>): void {
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

  protected updateForm(staffRoleType: IStaffRoleType): void {
    this.staffRoleType = staffRoleType;
    this.staffRoleTypeFormService.resetForm(this.editForm, staffRoleType);
  }
}
