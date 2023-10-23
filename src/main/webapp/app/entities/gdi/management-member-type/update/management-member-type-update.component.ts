import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ManagementMemberTypeFormService, ManagementMemberTypeFormGroup } from './management-member-type-form.service';
import { IManagementMemberType } from '../management-member-type.model';
import { ManagementMemberTypeService } from '../service/management-member-type.service';

@Component({
  selector: 'jhi-management-member-type-update',
  templateUrl: './management-member-type-update.component.html',
})
export class ManagementMemberTypeUpdateComponent implements OnInit {
  isSaving = false;
  managementMemberType: IManagementMemberType | null = null;

  editForm: ManagementMemberTypeFormGroup = this.managementMemberTypeFormService.createManagementMemberTypeFormGroup();

  constructor(
    protected managementMemberTypeService: ManagementMemberTypeService,
    protected managementMemberTypeFormService: ManagementMemberTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ managementMemberType }) => {
      this.managementMemberType = managementMemberType;
      if (managementMemberType) {
        this.updateForm(managementMemberType);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const managementMemberType = this.managementMemberTypeFormService.getManagementMemberType(this.editForm);
    if (managementMemberType.id !== null) {
      this.subscribeToSaveResponse(this.managementMemberTypeService.update(managementMemberType));
    } else {
      this.subscribeToSaveResponse(this.managementMemberTypeService.create(managementMemberType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IManagementMemberType>>): void {
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

  protected updateForm(managementMemberType: IManagementMemberType): void {
    this.managementMemberType = managementMemberType;
    this.managementMemberTypeFormService.resetForm(this.editForm, managementMemberType);
  }
}
