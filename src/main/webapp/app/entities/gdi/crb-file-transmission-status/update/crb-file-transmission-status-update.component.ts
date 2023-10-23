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

import { CrbFileTransmissionStatusFormService, CrbFileTransmissionStatusFormGroup } from './crb-file-transmission-status-form.service';
import { ICrbFileTransmissionStatus } from '../crb-file-transmission-status.model';
import { CrbFileTransmissionStatusService } from '../service/crb-file-transmission-status.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { SubmittedFileStatusTypes } from 'app/entities/enumerations/submitted-file-status-types.model';

@Component({
  selector: 'jhi-crb-file-transmission-status-update',
  templateUrl: './crb-file-transmission-status-update.component.html',
})
export class CrbFileTransmissionStatusUpdateComponent implements OnInit {
  isSaving = false;
  crbFileTransmissionStatus: ICrbFileTransmissionStatus | null = null;
  submittedFileStatusTypesValues = Object.keys(SubmittedFileStatusTypes);

  editForm: CrbFileTransmissionStatusFormGroup = this.crbFileTransmissionStatusFormService.createCrbFileTransmissionStatusFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected crbFileTransmissionStatusService: CrbFileTransmissionStatusService,
    protected crbFileTransmissionStatusFormService: CrbFileTransmissionStatusFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crbFileTransmissionStatus }) => {
      this.crbFileTransmissionStatus = crbFileTransmissionStatus;
      if (crbFileTransmissionStatus) {
        this.updateForm(crbFileTransmissionStatus);
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
    const crbFileTransmissionStatus = this.crbFileTransmissionStatusFormService.getCrbFileTransmissionStatus(this.editForm);
    if (crbFileTransmissionStatus.id !== null) {
      this.subscribeToSaveResponse(this.crbFileTransmissionStatusService.update(crbFileTransmissionStatus));
    } else {
      this.subscribeToSaveResponse(this.crbFileTransmissionStatusService.create(crbFileTransmissionStatus));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrbFileTransmissionStatus>>): void {
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

  protected updateForm(crbFileTransmissionStatus: ICrbFileTransmissionStatus): void {
    this.crbFileTransmissionStatus = crbFileTransmissionStatus;
    this.crbFileTransmissionStatusFormService.resetForm(this.editForm, crbFileTransmissionStatus);
  }
}
