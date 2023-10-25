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

import { AcquiringIssuingFlagFormService, AcquiringIssuingFlagFormGroup } from './acquiring-issuing-flag-form.service';
import { IAcquiringIssuingFlag } from '../acquiring-issuing-flag.model';
import { AcquiringIssuingFlagService } from '../service/acquiring-issuing-flag.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-acquiring-issuing-flag-update',
  templateUrl: './acquiring-issuing-flag-update.component.html',
})
export class AcquiringIssuingFlagUpdateComponent implements OnInit {
  isSaving = false;
  acquiringIssuingFlag: IAcquiringIssuingFlag | null = null;

  editForm: AcquiringIssuingFlagFormGroup = this.acquiringIssuingFlagFormService.createAcquiringIssuingFlagFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected acquiringIssuingFlagService: AcquiringIssuingFlagService,
    protected acquiringIssuingFlagFormService: AcquiringIssuingFlagFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ acquiringIssuingFlag }) => {
      this.acquiringIssuingFlag = acquiringIssuingFlag;
      if (acquiringIssuingFlag) {
        this.updateForm(acquiringIssuingFlag);
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
    const acquiringIssuingFlag = this.acquiringIssuingFlagFormService.getAcquiringIssuingFlag(this.editForm);
    if (acquiringIssuingFlag.id !== null) {
      this.subscribeToSaveResponse(this.acquiringIssuingFlagService.update(acquiringIssuingFlag));
    } else {
      this.subscribeToSaveResponse(this.acquiringIssuingFlagService.create(acquiringIssuingFlag));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAcquiringIssuingFlag>>): void {
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

  protected updateForm(acquiringIssuingFlag: IAcquiringIssuingFlag): void {
    this.acquiringIssuingFlag = acquiringIssuingFlag;
    this.acquiringIssuingFlagFormService.resetForm(this.editForm, acquiringIssuingFlag);
  }
}
