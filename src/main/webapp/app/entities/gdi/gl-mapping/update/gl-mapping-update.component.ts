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
