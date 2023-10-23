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

import { BouncedChequeCategoriesFormService, BouncedChequeCategoriesFormGroup } from './bounced-cheque-categories-form.service';
import { IBouncedChequeCategories } from '../bounced-cheque-categories.model';
import { BouncedChequeCategoriesService } from '../service/bounced-cheque-categories.service';

@Component({
  selector: 'jhi-bounced-cheque-categories-update',
  templateUrl: './bounced-cheque-categories-update.component.html',
})
export class BouncedChequeCategoriesUpdateComponent implements OnInit {
  isSaving = false;
  bouncedChequeCategories: IBouncedChequeCategories | null = null;

  editForm: BouncedChequeCategoriesFormGroup = this.bouncedChequeCategoriesFormService.createBouncedChequeCategoriesFormGroup();

  constructor(
    protected bouncedChequeCategoriesService: BouncedChequeCategoriesService,
    protected bouncedChequeCategoriesFormService: BouncedChequeCategoriesFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bouncedChequeCategories }) => {
      this.bouncedChequeCategories = bouncedChequeCategories;
      if (bouncedChequeCategories) {
        this.updateForm(bouncedChequeCategories);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const bouncedChequeCategories = this.bouncedChequeCategoriesFormService.getBouncedChequeCategories(this.editForm);
    if (bouncedChequeCategories.id !== null) {
      this.subscribeToSaveResponse(this.bouncedChequeCategoriesService.update(bouncedChequeCategories));
    } else {
      this.subscribeToSaveResponse(this.bouncedChequeCategoriesService.create(bouncedChequeCategories));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBouncedChequeCategories>>): void {
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

  protected updateForm(bouncedChequeCategories: IBouncedChequeCategories): void {
    this.bouncedChequeCategories = bouncedChequeCategories;
    this.bouncedChequeCategoriesFormService.resetForm(this.editForm, bouncedChequeCategories);
  }
}
