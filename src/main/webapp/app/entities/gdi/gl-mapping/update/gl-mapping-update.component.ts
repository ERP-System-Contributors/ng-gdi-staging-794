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

import { GlMappingFormService, GlMappingFormGroup } from './gl-mapping-form.service';
import { IGlMapping } from '../gl-mapping.model';
import { GlMappingService } from '../service/gl-mapping.service';

@Component({
  selector: 'jhi-gl-mapping-update',
  templateUrl: './gl-mapping-update.component.html',
})
export class GlMappingUpdateComponent implements OnInit {
  isSaving = false;
  glMapping: IGlMapping | null = null;

  editForm: GlMappingFormGroup = this.glMappingFormService.createGlMappingFormGroup();

  constructor(
    protected glMappingService: GlMappingService,
    protected glMappingFormService: GlMappingFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ glMapping }) => {
      this.glMapping = glMapping;
      if (glMapping) {
        this.updateForm(glMapping);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const glMapping = this.glMappingFormService.getGlMapping(this.editForm);
    if (glMapping.id !== null) {
      this.subscribeToSaveResponse(this.glMappingService.update(glMapping));
    } else {
      this.subscribeToSaveResponse(this.glMappingService.create(glMapping));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGlMapping>>): void {
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

  protected updateForm(glMapping: IGlMapping): void {
    this.glMapping = glMapping;
    this.glMappingFormService.resetForm(this.editForm, glMapping);
  }
}
