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

import { EmploymentTermsFormService, EmploymentTermsFormGroup } from './employment-terms-form.service';
import { IEmploymentTerms } from '../employment-terms.model';
import { EmploymentTermsService } from '../service/employment-terms.service';

@Component({
  selector: 'jhi-employment-terms-update',
  templateUrl: './employment-terms-update.component.html',
})
export class EmploymentTermsUpdateComponent implements OnInit {
  isSaving = false;
  employmentTerms: IEmploymentTerms | null = null;

  editForm: EmploymentTermsFormGroup = this.employmentTermsFormService.createEmploymentTermsFormGroup();

  constructor(
    protected employmentTermsService: EmploymentTermsService,
    protected employmentTermsFormService: EmploymentTermsFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employmentTerms }) => {
      this.employmentTerms = employmentTerms;
      if (employmentTerms) {
        this.updateForm(employmentTerms);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const employmentTerms = this.employmentTermsFormService.getEmploymentTerms(this.editForm);
    if (employmentTerms.id !== null) {
      this.subscribeToSaveResponse(this.employmentTermsService.update(employmentTerms));
    } else {
      this.subscribeToSaveResponse(this.employmentTermsService.create(employmentTerms));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmploymentTerms>>): void {
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

  protected updateForm(employmentTerms: IEmploymentTerms): void {
    this.employmentTerms = employmentTerms;
    this.employmentTermsFormService.resetForm(this.editForm, employmentTerms);
  }
}
