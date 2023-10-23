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

import { AnticipatedMaturityPerioodFormService, AnticipatedMaturityPerioodFormGroup } from './anticipated-maturity-periood-form.service';
import { IAnticipatedMaturityPeriood } from '../anticipated-maturity-periood.model';
import { AnticipatedMaturityPerioodService } from '../service/anticipated-maturity-periood.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-anticipated-maturity-periood-update',
  templateUrl: './anticipated-maturity-periood-update.component.html',
})
export class AnticipatedMaturityPerioodUpdateComponent implements OnInit {
  isSaving = false;
  anticipatedMaturityPeriood: IAnticipatedMaturityPeriood | null = null;

  editForm: AnticipatedMaturityPerioodFormGroup = this.anticipatedMaturityPerioodFormService.createAnticipatedMaturityPerioodFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected anticipatedMaturityPerioodService: AnticipatedMaturityPerioodService,
    protected anticipatedMaturityPerioodFormService: AnticipatedMaturityPerioodFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ anticipatedMaturityPeriood }) => {
      this.anticipatedMaturityPeriood = anticipatedMaturityPeriood;
      if (anticipatedMaturityPeriood) {
        this.updateForm(anticipatedMaturityPeriood);
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
    const anticipatedMaturityPeriood = this.anticipatedMaturityPerioodFormService.getAnticipatedMaturityPeriood(this.editForm);
    if (anticipatedMaturityPeriood.id !== null) {
      this.subscribeToSaveResponse(this.anticipatedMaturityPerioodService.update(anticipatedMaturityPeriood));
    } else {
      this.subscribeToSaveResponse(this.anticipatedMaturityPerioodService.create(anticipatedMaturityPeriood));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAnticipatedMaturityPeriood>>): void {
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

  protected updateForm(anticipatedMaturityPeriood: IAnticipatedMaturityPeriood): void {
    this.anticipatedMaturityPeriood = anticipatedMaturityPeriood;
    this.anticipatedMaturityPerioodFormService.resetForm(this.editForm, anticipatedMaturityPeriood);
  }
}
