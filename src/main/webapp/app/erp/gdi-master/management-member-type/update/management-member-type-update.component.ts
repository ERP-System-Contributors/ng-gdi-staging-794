///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

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
